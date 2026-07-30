import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { supabaseService, isAllowedImageFile } from "@/services/supabaseService";
import { Product, products as initialProducts, parseProductTechnicalData, serializeProductTechnicalData } from "@/data/products";
import { getDerivativeUrl, resolveProductImageUrl } from "@/utils/imageUtils";
import { logoutAdmin } from "@/lib/adminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Pencil, Trash2, LogOut, RefreshCw, FileSpreadsheet, Images, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface ProductWithId extends Product {
  id: string;
}



const Admin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSheet, setLoadingSheet] = useState(false);
  const [loadingImgs, setLoadingImgs] = useState(false);
  const [replaceAll, setReplaceAll] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductWithId | null>(null);
  const [formData, setFormData] = useState({
    organizacao: "",
    code: "",
    name: "",
    brand: "",
    category: "",
    packSize: "",
    ean: "",
    ncm: "",
    dun: "",
    isNew: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [hasImage, setHasImage] = useState(false); // produto em edição tem imagem no bucket
  const [removingImage, setRemovingImage] = useState(false);
  const [imgPreviewFallback, setImgPreviewFallback] = useState(false); // derivado falhou → tenta original
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await supabaseService.getProducts();
        if (data.length === 0) {
          // If no products in Firebase, offer to sync
          setProducts([]);
        } else {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSync = async () => {
    setLoading(true);
    try {
      await supabaseService.syncInitialData(initialProducts);
      const data = await supabaseService.getProducts();
      setProducts(data);
      toast.success("Dados sincronizados com sucesso!");
    } catch (error) {
      console.error("Sync error:", error);
      toast.error("Erro ao sincronizar dados");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.code.trim() || !formData.name.trim()) {
        toast.error("Preencha ao menos Código e Descrição.");
        return;
      }
      let imageUrl = editingProduct?.imageUrl || null;

      if (imageFile) {
        if (!isAllowedImageFile(imageFile)) {
          toast.error("Formato de imagem não permitido. Use PNG, JPG ou JPEG.");
          return;
        }
        try {
          imageUrl = await supabaseService.uploadProductImage(formData.code || "", imageFile);
        } catch (error) {
          const msg = error instanceof Error ? error.message : "Erro ao fazer upload da imagem para o Supabase Storage";
          toast.error(msg);
          return;
        }
      }

      // Combine technical fields into delimited EAN string
      const combinedEan = serializeProductTechnicalData(formData.ean, formData.ncm, formData.dun, formData.isNew);

      const productDataToSave = {
        organizacao: formData.organizacao || null,
        code: formData.code,
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        packSize: formData.packSize,
        ean: combinedEan,
        isNew: formData.isNew,
        imageUrl
      };

      if (editingProduct) {
        await supabaseService.updateProduct(editingProduct.id, productDataToSave);
        toast.success("Produto atualizado");
      } else {
        await supabaseService.addProduct(productDataToSave as Product);
        toast.success("Produto adicionado");
      }
      const data = await supabaseService.getProducts();
      setProducts(data);
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Erro ao salvar produto");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await supabaseService.deleteProduct(id);
        setProducts(prev => prev.filter((p: ProductWithId) => p.id !== id));
        toast.success("Produto excluído");
      } catch (error) {
        toast.error("Erro ao excluir produto");
      }
    }
  };

  const handleRemoveImage = async () => {
    if (!editingProduct) return;
    if (!window.confirm(`Remover a imagem do produto ${editingProduct.code}? Os 4 arquivos (original + derivados) serão apagados do Storage. Não pode ser desfeito.`)) {
      return;
    }
    setRemovingImage(true);
    try {
      const removed = await supabaseService.deleteProductImage(editingProduct.code);
      await supabaseService.updateProduct(editingProduct.id, { imageUrl: null });
      const data = await supabaseService.getProducts();
      setProducts(data);
      setEditingProduct(prev => (prev ? { ...prev, imageUrl: null } : prev));
      setHasImage(false);
      toast.success(removed > 0 ? `Imagem removida (${removed} arquivo(s)).` : "Nenhum arquivo de imagem encontrado; vínculo limpo.");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "erro desconhecido";
      console.error("Erro ao remover imagem:", error);
      toast.error(`Falha ao remover imagem: ${msg}`);
    } finally {
      setRemovingImage(false);
    }
  };

  const openEdit = (product: ProductWithId) => {
    setEditingProduct(product);
    setHasImage(true);          // otimista; o onError do preview desliga se não houver imagem
    setImgPreviewFallback(false);
    const techData = parseProductTechnicalData(product);
    setFormData({
      organizacao: product.organizacao || "",
      code: product.code,
      name: product.name,
      brand: product.brand,
      category: product.category,
      packSize: product.packSize || "",
      ean: techData.ean,
      ncm: techData.ncm,
      dun: techData.dun,
      isNew: !!product.isNew,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      organizacao: "",
      code: "",
      name: "",
      brand: "",
      category: "",
      packSize: "",
      ean: "",
      ncm: "",
      dun: "",
      isNew: false,
    });
    setImageFile(null);
    setHasImage(false);
    setImgPreviewFallback(false);
  };

  // Produto cadastrado pelo formulário há menos de 7 dias (destaque verde).
  const isRecentlyAdded = (p: ProductWithId) => {
    if (!p.adminCreatedAt) return false;
    const t = new Date(p.adminCreatedAt).getTime();
    return !Number.isNaN(t) && (Date.now() - t) < 7 * 24 * 60 * 60 * 1000;
  };

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(p => {
      const ean = parseProductTechnicalData(p).ean || "";
      return String(p.code).toLowerCase().includes(q)
        || String(p.name).toLowerCase().includes(q)
        || ean.toLowerCase().includes(q);
    });
  }, [products, search]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  useEffect(() => { setPage(1); }, [search]);
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);
  const pageProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const extractCodeFromFilename = (filename: string): string => {
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
    if (nameWithoutExt.includes(" - ")) {
      return nameWithoutExt.split(" - ")[0].trim();
    }
    const match = nameWithoutExt.match(/^([a-zA-Z0-9]+)/);
    return match ? match[1].trim() : nameWithoutExt.trim();
  };

  // Botão 1: envia apenas a planilha (parse no backend + sync no Supabase).
  const handleUploadSpreadsheet = async () => {
    const fileInput = document.querySelector('#spreadsheet') as HTMLInputElement | null;
    if (!fileInput?.files?.length) {
      toast.error("Selecione uma planilha (.xlsx/.xls/.md).");
      return;
    }
    setLoadingSheet(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("spreadsheet", fileInput.files[0]);
      const res = await fetch("/api/upload", { method: "POST", body: uploadFormData });
      if (!res.ok) {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          toast.error(json.message || `Erro no servidor (${res.status})`);
        } catch {
          toast.error(`Erro na comunicação com o servidor (${res.status})`);
        }
        return;
      }
      const json = await res.json();
      if (json.status !== "success") {
        toast.error(json.message || "Erro ao processar a planilha");
        return;
      }
      const parsedProducts: Product[] = json.products;

      // Modo "substituir tudo": confirma antes de remover os produtos ausentes da planilha.
      if (replaceAll) {
        const parsedCodes = new Set(parsedProducts.map(p => String(p.code)));
        const toRemove = products.filter(p => !parsedCodes.has(String(p.code)));
        const ok = window.confirm(
          `Modo "Substituir tudo" ativado.\n\nA planilha tem ${parsedProducts.length} produto(s). ` +
          `Isto vai REMOVER ${toRemove.length} produto(s) que não estão na planilha e NÃO pode ser desfeito.\n\nContinuar?`
        );
        if (!ok) {
          toast.info("Operação cancelada. Nada foi alterado.");
          return;
        }
      }

      toast.info("Sincronizando dados no banco...");
      const result = await supabaseService.syncInitialData(parsedProducts, { deleteMissing: replaceAll });
      const removedMsg = result?.deleted ? ` ${result.deleted} removido(s).` : "";
      toast.success(`Planilha processada! ${parsedProducts.length} produtos importados.${removedMsg}`);
      const data = await supabaseService.getProducts();
      setProducts(data);
      fileInput.value = "";
    } catch (error: unknown) {
      console.error("Spreadsheet upload error:", error);
      const message = error instanceof Error ? error.message : "Erro desconhecido";
      toast.error("Erro ao enviar planilha: " + message);
    } finally {
      setLoadingSheet(false);
    }
  };

  // Botão 2: envia apenas as imagens em massa (casa por código, sobe original + derivados).
  const handleUploadImages = async () => {
    const imagesInput = document.querySelector('#images') as HTMLInputElement | null;
    if (!imagesInput?.files?.length) {
      toast.error("Selecione uma ou mais imagens.");
      return;
    }

    // Restrição de formato: só PNG/JPG/JPEG (os derivados gerados seguem webp/jpg).
    const allFiles = Array.from(imagesInput.files);
    const rejected = allFiles.filter(f => !isAllowedImageFile(f));
    const allowed = allFiles.filter(f => isAllowedImageFile(f));
    if (rejected.length > 0) {
      toast.warning(`${rejected.length} arquivo(s) ignorado(s) — formato não permitido (use PNG, JPG ou JPEG): ${rejected.slice(0, 5).map(f => f.name).join(', ')}${rejected.length > 5 ? '…' : ''}`, { duration: 10000 });
    }
    if (allowed.length === 0) {
      toast.error("Nenhuma imagem em formato válido (PNG, JPG ou JPEG).");
      return;
    }

    setLoadingImgs(true);
    try {
      const matchedCodes = new Set<string>();
      const unmatchedImages: string[] = []; // código não está no catálogo
      const uploadErrors: string[] = [];    // código encontrado, mas o upload falhou
      const finalProducts = [...products];
      toast.info(`Processando ${allowed.length} imagem(ns) e enviando ao Supabase Storage...`);

      // Normaliza o código para o match (remove espaços e zeros à esquerda).
      const norm = (c: string) => String(c ?? "").trim().replace(/^0+/, "").toLowerCase();

      for (let i = 0; i < allowed.length; i++) {
        const file = allowed[i];
        const extractedCode = extractCodeFromFilename(file.name);
        const productIdx = finalProducts.findIndex(
          p => norm(p.code) === norm(extractedCode)
        );
        if (productIdx !== -1) {
          const product = finalProducts[productIdx];
          try {
            const publicUrl = await supabaseService.uploadProductImage(product.code, file);
            finalProducts[productIdx] = { ...product, imageUrl: publicUrl };
            matchedCodes.add(product.code);
          } catch (uploadErr) {
            const msg = uploadErr instanceof Error ? uploadErr.message : "erro desconhecido";
            console.error(`Erro no upload da imagem ${file.name}:`, uploadErr);
            uploadErrors.push(`${file.name}: ${msg}`);
          }
        } else {
          unmatchedImages.push(file.name);
        }
      }

      if (matchedCodes.size > 0) {
        toast.info("Sincronizando dados no banco...");
        await supabaseService.syncInitialData(finalProducts);
      }
      toast.success(`${matchedCodes.size} imagem(ns) vinculada(s).`);
      if (unmatchedImages.length > 0) {
        const amostra = unmatchedImages.slice(0, 8).join(', ');
        const extra = unmatchedImages.length > 8 ? ` … (+${unmatchedImages.length - 8})` : '';
        toast.warning(`${unmatchedImages.length} não vinculada(s) — código não está no catálogo: ${amostra}${extra}`, { duration: 12000 });
        console.warn("Imagens sem produto correspondente:", unmatchedImages);
      }
      if (uploadErrors.length > 0) {
        toast.error(`${uploadErrors.length} falha(s) ao enviar (código existe, mas o upload deu erro): ${uploadErrors.slice(0, 4).join(' | ')}`, { duration: 15000 });
        console.error("Falhas de upload:", uploadErrors);
      }
      const data = await supabaseService.getProducts();
      setProducts(data);
      imagesInput.value = "";
    } catch (error: unknown) {
      console.error("Image upload error:", error);
      const message = error instanceof Error ? error.message : "Erro desconhecido";
      toast.error("Erro ao enviar imagens: " + message);
    } finally {
      setLoadingImgs(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#FAFCFF]">
        <div className="relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-100/50">
          <img src="/loading.gif" alt="Carregando..." className="w-16 h-16 object-contain" />
          <span className="mt-4 text-slate-600 font-extrabold text-xs uppercase tracking-[0.2em] animate-pulse">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFCFF]">
      <header className="bg-primary py-4 px-6 text-white shadow-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Painel Administrativo</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => navigate("/")}>Ver Site</Button>
          <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => { logoutAdmin(); navigate("/login"); }}>
            <LogOut className="h-4 w-4 mr-2" /> Sair
          </Button>
        </div>
      </header>

      <main className="container py-8 space-y-6">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Gerenciar Produtos</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleSync} title="Adiciona produtos do arquivo estático que ainda não estão no Firebase">
                  <RefreshCw className="h-4 w-4 mr-2" /> Sincronizar Novos
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (!open) resetForm();
                }}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" /> Novo Produto
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>{editingProduct ? "Editar Produto" : "Novo Produto"}</DialogTitle>
                      <DialogDescription>
                        Preencha os detalhes do produto abaixo.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-1">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="organizacao" className="text-right">Organização</Label>
                        <div className="col-span-3">
                          <Select value={formData.organizacao} onValueChange={v => setFormData({...formData, organizacao: v})}>
                            <SelectTrigger id="organizacao"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Seca">Seca</SelectItem>
                              <SelectItem value="Purina">Purina</SelectItem>
                              <SelectItem value="Food">Food</SelectItem>
                              <SelectItem value="Bebidas">Bebidas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="brand" className="text-right">Categoria</Label>
                        <Input id="brand" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Sub Categoria</Label>
                        <Input id="category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="code" className="text-right">Código</Label>
                        <Input id="code" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Descrição</Label>
                        <Input id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="packSize" className="text-right">Fator</Label>
                        <Input id="packSize" value={formData.packSize} onChange={e => setFormData({...formData, packSize: e.target.value})} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="ncm" className="text-right">Classificação Fiscal</Label>
                        <Input id="ncm" value={formData.ncm} onChange={e => setFormData({...formData, ncm: e.target.value})} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="ean" className="text-right">EAN</Label>
                        <Input id="ean" value={formData.ean} onChange={e => setFormData({...formData, ean: e.target.value})} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dun" className="text-right">DUN</Label>
                        <Input id="dun" value={formData.dun} onChange={e => setFormData({...formData, dun: e.target.value})} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Lançamento</Label>
                        <RadioGroup
                          className="col-span-3 flex items-center gap-6"
                          value={formData.isNew ? "sim" : "nao"}
                          onValueChange={v => setFormData({...formData, isNew: v === "sim"})}
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="sim" id="lanc-sim" />
                            <Label htmlFor="lanc-sim" className="font-medium cursor-pointer">Sim</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="nao" id="lanc-nao" />
                            <Label htmlFor="lanc-nao" className="font-medium cursor-pointer">Não</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      {editingProduct && hasImage && (
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Imagem atual</Label>
                          <div className="col-span-3 flex items-center gap-3">
                            <img
                              src={
                                imgPreviewFallback
                                  ? resolveProductImageUrl(editingProduct.imageUrl, editingProduct.code)
                                  : getDerivativeUrl(editingProduct.code, "card")
                              }
                              alt={`Imagem do produto ${editingProduct.code}`}
                              className="h-16 w-16 rounded border object-contain bg-white"
                              onError={() => {
                                if (!imgPreviewFallback) setImgPreviewFallback(true);
                                else setHasImage(false);
                              }}
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={handleRemoveImage}
                              disabled={removingImage}
                            >
                              <Trash2 className="h-4 w-4 mr-1.5" />
                              {removingImage ? "Removendo..." : "Remover imagem"}
                            </Button>
                          </div>
                        </div>
                      )}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">Enviar imagem</Label>
                        <div className="col-span-3">
                          <Input
                            id="image"
                            type="file"
                            accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                            onChange={e => {
                              if (e.target.files && e.target.files.length > 0) {
                                setImageFile(e.target.files[0]);
                              }
                            }}
                          />
                          <p className="text-xs text-slate-400 mt-1">Opcional — pode finalizar o cadastro sem imagem.</p>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                      <Button onClick={handleSave}>Salvar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Pesquisar por código, descrição ou EAN..."
                className="pl-9"
              />
            </div>

            <div className="bg-white rounded-lg border shadow-sm text-slate-900">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100 hover:bg-transparent">
                    <TableHead className="text-slate-500 font-bold">Código</TableHead>
                    <TableHead className="text-slate-500 font-bold">Nome</TableHead>
                    <TableHead className="text-slate-500 font-bold">Marca</TableHead>
                    <TableHead className="text-slate-500 font-bold">Categoria</TableHead>
                    <TableHead className="text-slate-500 font-bold">Class. Fiscal</TableHead>
                    <TableHead className="text-slate-500 font-bold">DUN</TableHead>
                    <TableHead className="text-right text-slate-500 font-bold">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageProducts.map((product) => {
                    const techData = parseProductTechnicalData(product);
                    const recent = isRecentlyAdded(product);
                    return (
                      <TableRow key={product.id} className={cn("border-slate-100 hover:bg-slate-50/50", recent && "text-green-600")}>
                        <TableCell className={cn("font-semibold", recent ? "text-green-600" : "text-slate-800")}>
                          <div className="flex items-center gap-2">
                            {product.code}
                            {product.isNew && (
                              <span className="bg-[#426EA8]/10 text-[#426EA8] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                                Novo
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className={recent ? "text-green-600" : "text-slate-700"}>{product.name}</TableCell>
                        <TableCell className={recent ? "text-green-600" : "text-slate-700"}>{product.brand}</TableCell>
                        <TableCell className={recent ? "text-green-600" : "text-slate-700"}>{product.category}</TableCell>
                        <TableCell className={recent ? "text-green-600" : "text-slate-700"}>{techData.ncm || "-"}</TableCell>
                        <TableCell className={recent ? "text-green-600" : "text-slate-700"}>{techData.dun || "-"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100" onClick={() => openEdit(product)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(product.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {filteredProducts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-slate-400">
                        {search ? "Nenhum produto encontrado para a busca." : "Nenhum produto cadastrado."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {filteredProducts.length > 0 && (
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>
                  {filteredProducts.length} produto(s) · página {page} de {totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}>
                    <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>
                    Próxima <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Upload de Catálogo em Lote</h2>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Importar XLSX e Imagens em Lote</h3>
                <p className="text-sm text-[#474747] mb-4">
                  Selecione sua planilha (.xlsx/.md) do catálogo e/ou envie imagens em lote. As imagens são processadas e vinculadas de forma automática, sendo salvas diretamente na nuvem (Supabase Storage) para acesso persistente e seguro.
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-border/50 rounded-xl p-6 bg-card text-card-foreground shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      <div className="relative z-10 flex items-start gap-4 mb-5">
                        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 shadow-inner">
                          <FileSpreadsheet className="h-6 w-6 text-primary" />
                        </div>
                        <div className="pt-1">
                          <h4 className="font-semibold text-base">1. Planilha de Dados</h4>
                          <p className="text-sm text-muted-foreground mt-1">Arquivo (.xlsx, .xls ou .md)</p>
                        </div>
                      </div>
                      <div className="relative z-10 space-y-3">
                        <Label htmlFor="spreadsheet" className="sr-only">Upload de Planilha</Label>
                        <Input id="spreadsheet" type="file" accept=".xlsx,.xls,.md" className="cursor-pointer h-12 file:h-12 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 text-[#474747] bg-white border-input" />
                        <div className="flex items-start gap-2.5 rounded-lg border border-red-100 bg-red-50/60 p-2.5">
                          <Checkbox
                            id="replaceAll"
                            checked={replaceAll}
                            onCheckedChange={(v) => setReplaceAll(v === true)}
                            className="mt-0.5 border-red-400 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                          />
                          <Label htmlFor="replaceAll" className="text-xs leading-snug text-red-700 cursor-pointer select-none">
                            <span className="font-bold">Substituir catálogo inteiro</span> — remove do banco os produtos que <b>não</b> estiverem nesta planilha. Ação destrutiva e irreversível.
                          </Label>
                        </div>
                        <Button type="button" onClick={handleUploadSpreadsheet} disabled={loadingSheet} className="w-full">
                          <FileSpreadsheet className="h-4 w-4 mr-2" />
                          {loadingSheet ? "Enviando planilha..." : "Enviar Planilha"}
                        </Button>
                      </div>
                    </div>

                    <div className="border border-border/50 rounded-xl p-6 bg-card text-card-foreground shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      <div className="relative z-10 flex items-start gap-4 mb-5">
                        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 shadow-inner">
                          <Images className="h-6 w-6 text-primary" />
                        </div>
                        <div className="pt-1">
                          <h4 className="font-semibold text-base">2. Imagens em Lote</h4>
                          <p className="text-sm text-muted-foreground mt-1">Selecione várias imagens para vincular</p>
                        </div>
                      </div>
                      <div className="relative z-10 space-y-3">
                        <Label htmlFor="images" className="sr-only">Upload de Imagens</Label>
                        <Input id="images" type="file" accept=".png,.jpg,.jpeg,image/png,image/jpeg" multiple className="cursor-pointer h-12 file:h-12 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 text-[#474747] bg-white border-input" />
                        <p className="text-xs text-[#474747] leading-tight">
                          Nomeie o arquivo com o <b>código do produto</b> — ex.: <b>418897.png</b>. Também aceita "418897 - Nome.png". Só o código já basta; a vinculação é automática.
                        </p>
                        <Button type="button" onClick={handleUploadImages} disabled={loadingImgs} className="w-full">
                          <Images className="h-4 w-4 mr-2" />
                          {loadingImgs ? "Enviando imagens..." : "Enviar Imagens"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>


        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
