/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import { ThrottlerStorage } from '@nestjs/throttler';
import type { ICacheProvider } from '../interfaces/cache-provider.interface';
export declare class ThrottlerCacheStorage implements ThrottlerStorage {
    private readonly cache;
    private readonly keyPrefix;
    constructor(cache: ICacheProvider);
    increment(key: string, ttl: number, limit: number, blockDuration: number, throttlerName: string): Promise<{
        totalHits: number;
        timeToExpire: number;
        isBlocked: boolean;
        timeToBlockExpire: number;
    }>;
}
