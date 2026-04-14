// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { Injectable, Logger } from '@nestjs/common';
import type { IQueueProvider, QueueJobOptions } from '../interfaces/queue-provider.interface';

/**
 * Synchronous queue fallback — executes jobs immediately via event emission.
 * Use when Redis is not available (development, testing).
 */
@Injectable()
export class SyncQueueProvider implements IQueueProvider {
  private readonly logger = new Logger(SyncQueueProvider.name);
  private readonly handlers = new Map<string, (data: unknown) => void>();

  constructor() {
    this.logger.warn(
      'Using synchronous queue fallback — configure REDIS_URL for BullMQ',
    );
  }

  /** Register a handler for a specific queue+job combination. */
  onJob(queueName: string, jobName: string, handler: (data: unknown) => void): void {
    this.handlers.set(`${queueName}:${jobName}`, handler);
  }

  async addJob<T = unknown>(
    queueName: string,
    jobName: string,
    data: T,
    opts?: QueueJobOptions,
  ): Promise<void> {
    const handler = this.handlers.get(`${queueName}:${jobName}`);
    if (opts?.delay) {
      setTimeout(() => handler?.(data), opts.delay);
    } else {
      handler?.(data);
    }
    this.logger.debug(`Sync job "${jobName}" executed for queue "${queueName}"`);
  }

  async addBulk<T = unknown>(
    queueName: string,
    jobs: Array<{ name: string; data: T; opts?: QueueJobOptions }>,
  ): Promise<void> {
    for (const job of jobs) {
      await this.addJob(queueName, job.name, job.data, job.opts);
    }
  }
}
