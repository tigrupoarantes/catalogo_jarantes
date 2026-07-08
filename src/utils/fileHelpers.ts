import fs from 'fs';
import path from 'path';

/**
 * Create a unique temporary directory inside the project workspace.
 */
export function createTempDir(prefix: string = 'tmp'): string {
  const base = path.join(process.cwd(), prefix);
  const unique = `${prefix}_${Date.now()}_${Math.round(Math.random() * 1e6)}`;
  const dir = path.join(base, unique);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Recursively delete a directory and its contents.
 */
export function removeDir(dirPath: string): void {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

/**
 * Ensure a directory exists (creates if missing).
 */
export function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Generate a safe filename from a product code (alphanumeric only).
 */
export function sanitizeFileName(name: string): string {
  return name.replace(/[^a-z0-9]/gi, '_');
}
