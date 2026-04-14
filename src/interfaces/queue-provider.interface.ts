// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

export interface IQueueProvider {
  addJob<T = unknown>(
    queueName: string,
    jobName: string,
    data: T,
    opts?: QueueJobOptions,
  ): Promise<void>;

  addBulk<T = unknown>(
    queueName: string,
    jobs: Array<{ name: string; data: T; opts?: QueueJobOptions }>,
  ): Promise<void>;
}

export interface QueueJobOptions {
  delay?: number;
  attempts?: number;
  backoff?: { type: 'exponential' | 'fixed'; delay: number };
  priority?: number;
  removeOnComplete?: boolean | number;
  removeOnFail?: boolean | number;
}

export const QUEUE_PROVIDER = Symbol('QUEUE_PROVIDER');
