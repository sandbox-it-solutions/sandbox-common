/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import { OnModuleDestroy } from '@nestjs/common';
import type { ICacheProvider } from '../interfaces/cache-provider.interface';
export declare class RedisCacheProvider implements ICacheProvider, OnModuleDestroy {
    private readonly logger;
    private readonly client;
    constructor(redisUrl: string);
    onModuleDestroy(): Promise<void>;
    get<T = string>(key: string): Promise<T | null>;
    set(key: string, value: string, ttlSeconds?: number): Promise<void>;
    del(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    incr(key: string): Promise<number>;
    expire(key: string, ttlSeconds: number): Promise<void>;
    ttl(key: string): Promise<number>;
    keys(pattern: string): Promise<string[]>;
    flushAll(): Promise<void>;
}
