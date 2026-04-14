/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import type { IQueueProvider, QueueJobOptions } from '../interfaces/queue-provider.interface';
export declare class BullMQProvider implements IQueueProvider {
    private readonly redisUrl;
    private readonly logger;
    private readonly queues;
    constructor(redisUrl: string);
    private getQueue;
    addJob<T = unknown>(queueName: string, jobName: string, data: T, opts?: QueueJobOptions): Promise<void>;
    addBulk<T = unknown>(queueName: string, jobs: Array<{
        name: string;
        data: T;
        opts?: QueueJobOptions;
    }>): Promise<void>;
}
