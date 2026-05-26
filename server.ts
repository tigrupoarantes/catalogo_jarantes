/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import path from "path";
import multer from "multer";
import * as xlsx from "xlsx";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Set up Multer for Excel and Images upload
const storage = multer.memoryStorage(); // Keep files in memory temporarily
const upload = multer({ storage });

const extractFileToJSON = (file: Express.Multer.File) => {
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (ext === '.md') {
    const mdString = file.buffer.toString('utf-8');
    const lines = mdString.split('\n').map(l => l.trim()).filter(l => l.startsWith('|') && l.endsWith('|'));
    if (lines.length < 2) return [];
    
    const headers = lines[0].split('|').slice(1, -1).map(h => h.trim());
    const data = [];
    for (let i = 2; i < lines.length; i++) {
      // check if it is a separator line (e.g. |---|---|)
      if (lines[i].replace(/\|/g, '').replace(/-/g, '').replace(/:/g, '').trim() === '') continue;
      
      const rowRaw = lines[i].split('|').slice(1, -1).map(c => c.trim());
      const rowObj: any = {};
      headers.forEach((h, idx) => {
        rowObj[h] = rowRaw[idx] || "";
      });
      data.push(rowObj);
    }
    return data;
  }

  const workbook = xlsx.read(file.buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
};

// EAN uniqueness validation middleware
const validateUniqueEAN = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const files = (req as any).files;
    if (!files || !files.spreadsheet || files.spreadsheet.length === 0) {
      return next(); // Pass to main handler to deal with no spreadsheet
    }
    
    const file = files.spreadsheet[0];
    let rawData: any[] = [];
    try {
      rawData = extractFileToJSON(file);
    } catch(e) {
      console.warn("Could not parse file in validateUniqueEAN", e);
    }
    
    const eanSet = new Set<string>();
    const eanErrors: any[] = [];
    
    for (let i = 0; i < rawData.length; i++) {
        const row: any = rawData[i];
        let ean = String(row.ean || row.EAN || "");
        ean = ean.replace(/^0+/, ''); // strip leading zeros
        if (ean) {
           if (eanSet.has(ean)) {
              eanErrors.push({ row: i + 2, reason: "EAN duplicado encontrado na planilha", ean: ean });
           } else {
              eanSet.add(ean);
           }
        }
    }
    
    // Attach to request so we can report these later, or reject immediately
    (req as any).eanErrors = eanErrors;
    next();
  } catch (err: any) {
    console.error("Error in validateUniqueEAN:", err);
    return res.status(500).json({ status: "error", message: err.message || "Internal Validation Error" });
  }
};

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "public", "uploads", "produtos");
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

// Endpoint POST for single image
app.post(
  "/api/upload-image",
  upload.single("image"),
  async (req: any, res: any) => {
    try {
      if (!req.file) {
        return res.status(400).json({ status: "error", message: "Nenhuma imagem enviada." });
      }

      const file = req.file;
      const ext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const newImageName = `img-${uniqueSuffix}${ext}`;
      const destPath = path.join(uploadDir, newImageName);
      
      await fs.writeFile(destPath, file.buffer);
      const savedImagePath = `/uploads/produtos/${newImageName}`;

      return res.json({ status: "success", imageUrl: savedImagePath });
    } catch (error: any) {
      console.error("Upload image error:", error);
      return res.status(500).json({ status: "error", message: error.message });
    }
  }
);

// Endpoint POST
app.post(
  "/api/upload",
  upload.fields([
    { name: "spreadsheet", maxCount: 1 },
    { name: "images" },
  ]),
  validateUniqueEAN,
  async (req: any, res: any) => {
    try {
      const files = req.files as {
        spreadsheet?: Express.Multer.File[];
        images?: Express.Multer.File[];
      };

      if (!files.spreadsheet || files.spreadsheet.length === 0) {
        return res.status(400).json({ status: "error", message: "Nenhuma planilha enviada." });
      }

      // Convert file (XLSX or MD) to JSON
      const rawData: any[] = extractFileToJSON(files.spreadsheet[0]);
      
      const processedProducts = [];
      const errors = req.eanErrors ? [...req.eanErrors] : [];
      const eanSet = new Set<string>();
      
      const uploadedImages = files.images || [];

      for (let i = 0; i < rawData.length; i++) {
        const row = rawData[i];
        
        // Flexible key mapping to handle various spreadsheet headers
        const codigo = String(row.codigo || row.CÓDIGO || row.code || "");
        let ean = String(row.ean || row.EAN || "");
        ean = ean.replace(/^0+/, ''); // strip leading zeros for uniqueness check
        const nome = String(row.nome || row.DESCRIÇÃO || row.name || "");
        const marca = String(row.marca || row.CATEGORIA || row.brand || "");
        const categoria = String(row.categoria || row['SUB CATEGORIA'] || row.category || "");
        const caixa = String(row.caixa || row.FATOR || row.packSize || "");
        
        if (!codigo || !nome) {
           errors.push({ row: i + 2, reason: "Código ou Nome faltando", data: row });
           continue;
        }

        // Middleware logic extracted for EAN uniqueness
        if (ean) {
           if (eanSet.has(ean)) {
              errors.push({ row: i + 2, reason: "EAN duplicado encontrado na planilha", data: row });
              continue; // Skip processing this duplicate product
           }
           eanSet.add(ean);
        }

        // Image mapping logic
        // Try to match an image to this product's code or ean
        let savedImagePath = null;
        
        // 1. By Code
        let matchedImage = uploadedImages.find(img => img.originalname.includes(codigo));
        
        // 2. By EAN
        if (!matchedImage && ean) {
           matchedImage = uploadedImages.find(img => img.originalname.includes(ean));
        }

        if (matchedImage) {
           const ext = path.extname(matchedImage.originalname);
           const newImageName = `${codigo}${ext}`;
           const destPath = path.join(uploadDir, newImageName);
           
           await fs.writeFile(destPath, matchedImage.buffer);
           savedImagePath = `/uploads/produtos/${newImageName}`;
        }

        processedProducts.push({
           id: codigo,
           code: codigo,
           name: nome,
           brand: marca,
           category: categoria,
           packSize: caixa,
           ean,
           imageUrl: savedImagePath
        });
      }

      return res.json({
         status: "success",
         processedCount: processedProducts.length,
         errorCount: errors.length,
         errors: errors,
         products: processedProducts
      });

    } catch (error: any) {
      console.error("Upload error:", error);
      return res.status(500).json({ status: "error", message: error.message });
    }
  }
);

// Global error handler for API routes
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.path.startsWith('/api/')) {
    console.error("Global API Error:", err);
    res.status(500).json({ status: "error", message: err.message || "Internal Server Error" });
  } else {
    next(err);
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
