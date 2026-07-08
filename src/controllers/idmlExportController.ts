import type { Request, Response } from 'express';
import { createJob, updateJob } from '@/utils/jobStore';
import { Worker } from 'worker_threads';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

let resolvedDirname = '';
if (typeof __dirname !== 'undefined') {
  resolvedDirname = __dirname;
} else {
  try {
    const metaUrl = new Function('return import.meta.url')();
    resolvedDirname = path.dirname(fileURLToPath(metaUrl));
  } catch {
    resolvedDirname = process.cwd();
  }
}

/**
 * POST /api/export/idml
 * Expected body: { productIds: string[] }
 * Returns: { jobId: string }
 */
export async function idmlExportHandler(req: Request, res: Response) {
  try {
    const { productIds } = req.body as { productIds: string[] };
    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ error: 'productIds array is required' });
    }

    // Generate a unique job id
    const jobId = crypto.randomUUID();
    createJob(jobId);
    updateJob(jobId, { status: 'processing' });

    // Spawn a worker thread to handle heavy IDML generation
    const worker = new Worker(path.resolve(resolvedDirname, '../workers/idmlExportWorker.js'), {
      workerData: { jobId, productIds },
    });

    worker.on('message', (msg: { jobId: string; status: string; filePath?: string; error?: string }) => {
      if (msg.status === 'ready') {
        updateJob(msg.jobId, { status: 'ready', filePath: msg.filePath });
      } else if (msg.status === 'error') {
        updateJob(msg.jobId, { status: 'error', error: msg.error });
      }
    });

    worker.on('error', (err) => {
      console.error('Worker error:', err);
      updateJob(jobId, { status: 'error', error: err.message });
    });

    return res.status(202).json({ jobId });
  } catch (e) {
    console.error('IDML export handler error:', e);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
