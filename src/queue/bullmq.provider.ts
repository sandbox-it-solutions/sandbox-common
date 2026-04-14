// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import type { IQueueProvider, QueueJobOptions } from '../interfaces/queue-provider.interface';

@Injectable()
export class BullMQProvider implements IQueueProvider {
  private readonly logger = new Logger(BullMQProvider.name);
  private readonly queues = new Map<string, Queue>();

  constructor(private readonly redisUrl: string) {
    this.logger.log('BullMQ queue provider initialized');
  }

  private getQueue(name: string): Queue {
    let queue = this.queues.get(name);
    if (!queue) {
      const url = new URL(this.redisUrl);
      queue = new Queue(name, {
        connection: {
          host: url.hostname,
          port: parseInt(url.port || '6379', 10),
          password: url.password || undefined,
        },
      });
      this.queues.set(name, queue);
    }
    return queue;
  }

  async addJob<T = unknown>(
    queueName: string,
    jobName: string,
    data: T,
    opts?: QueueJobOptions,
  ): Promise<void> {
    const queue = this.getQueue(queueName);
    await queue.add(jobName, data, opts);
    this.logger.debug(`Job "${jobName}" added to queue "${queueName}"`);
  }

  async addBulk<T = unknown>(
    queueName: string,
    jobs: Array<{ name: string; data: T; opts?: QueueJobOptions }>,
  ): Promise<void> {
    const queue = this.getQueue(queueName);
    await queue.addBulk(jobs);
    this.logger.debug(`${jobs.length} jobs added to queue "${queueName}"`);
  }
}
