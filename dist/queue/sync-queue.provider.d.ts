/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import type { IQueueProvider, QueueJobOptions } from '../interfaces/queue-provider.interface';
/**
 * Synchronous queue fallback — executes jobs immediately via event emission.
 * Use when Redis is not available (development, testing).
 */
export declare class SyncQueueProvider implements IQueueProvider {
    private readonly logger;
    private readonly handlers;
    constructor();
    /** Register a handler for a specific queue+job combination. */
    onJob(queueName: string, jobName: string, handler: (data: unknown) => void): void;
    addJob<T = unknown>(queueName: string, jobName: string, data: T, opts?: QueueJobOptions): Promise<void>;
    addBulk<T = unknown>(queueName: string, jobs: Array<{
        name: string;
        data: T;
        opts?: QueueJobOptions;
    }>): Promise<void>;
}
