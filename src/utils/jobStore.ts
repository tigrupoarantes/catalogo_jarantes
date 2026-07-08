type JobStatus = 'pending' | 'processing' | 'ready' | 'error';

interface JobInfo {
  status: JobStatus;
  progress?: number; // 0-100
  filePath?: string; // path to generated zip
  error?: string;
}

const jobStore: Record<string, JobInfo> = {};

export function createJob(jobId: string): void {
  jobStore[jobId] = { status: 'pending' };
}

export function updateJob(jobId: string, updates: Partial<JobInfo>): void {
  if (jobStore[jobId]) {
    jobStore[jobId] = { ...jobStore[jobId], ...updates };
  }
}

export function getJob(jobId: string): JobInfo | undefined {
  return jobStore[jobId];
}

export function deleteJob(jobId: string): void {
  delete jobStore[jobId];
}
