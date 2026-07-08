// src/workers/idmlExportWorker.js
import { parentPort, workerData } from 'worker_threads';
import path from 'path';
import fs from 'fs';

function createTempDir(prefix = 'tmp') {
  const base = path.join(process.cwd(), prefix);
  const unique = `${prefix}_${Date.now()}_${Math.round(Math.random() * 1e6)}`;
  const dir = path.join(base, unique);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function generateIdml(jobId, productIds) {
  try {
    // Create temporary working directory
    const tempDir = createTempDir('idml_work');
    // Path to base template (assumed to be in project root 'templates/base.idml')
    const baseTemplatePath = path.resolve(process.cwd(), 'templates', 'base.idml');
    const outputFileName = `${jobId}.idml`;
    const outputPath = path.resolve(process.cwd(), 'public', 'exports', outputFileName);

    // Ensure output directory exists
    ensureDir(path.dirname(outputPath));

    // Simple placeholder: copy base template to output (real implementation would inject data)
    if (fs.existsSync(baseTemplatePath)) {
      fs.copyFileSync(baseTemplatePath, outputPath);
    } else {
      // If template missing, create a minimal placeholder file
      fs.writeFileSync(outputPath, `IDML placeholder for job ${jobId}\nProducts: ${productIds.join(', ')}`);
    }

    // Cleanup temporary directory
    removeDir(tempDir);

    // Notify parent that the job is ready
    parentPort.postMessage({ jobId, status: 'ready', filePath: `/exports/${outputFileName}` });
  } catch (err) {
    parentPort.postMessage({ jobId: workerData.jobId, status: 'error', error: err.message });
  }
}

if (parentPort && workerData) {
  const { jobId, productIds } = workerData;
  generateIdml(jobId, productIds);
}
