// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { Injectable, Inject } from '@nestjs/common';
import { ThrottlerStorage } from '@nestjs/throttler';
import { CACHE_PROVIDER } from '../interfaces/cache-provider.interface';
import type { ICacheProvider } from '../interfaces/cache-provider.interface';

@Injectable()
export class ThrottlerCacheStorage implements ThrottlerStorage {
  private readonly keyPrefix = 'throttle:';

  constructor(@Inject(CACHE_PROVIDER) private readonly cache: ICacheProvider) {}

  async increment(
    key: string,
    ttl: number,
    limit: number,
    blockDuration: number,
    throttlerName: string,
  ): Promise<{
    totalHits: number;
    timeToExpire: number;
    isBlocked: boolean;
    timeToBlockExpire: number;
  }> {
    const cacheKey = `${this.keyPrefix}${throttlerName}:${key}`;
    const blockKey = `${this.keyPrefix}${throttlerName}:block:${key}`;

    const blocked = await this.cache.exists(blockKey);
    if (blocked) {
      const blockTtl = await this.cache.ttl(blockKey);
      return {
        totalHits: limit + 1,
        timeToExpire: 0,
        isBlocked: true,
        timeToBlockExpire: Math.max(blockTtl, 0),
      };
    }

    const totalHits = await this.cache.incr(cacheKey);

    if (totalHits === 1) {
      const ttlSeconds = Math.ceil(ttl / 1000);
      await this.cache.expire(cacheKey, ttlSeconds);
    }

    const timeToExpire = await this.cache.ttl(cacheKey);

    if (totalHits > limit && blockDuration > 0) {
      const blockSeconds = Math.ceil(blockDuration / 1000);
      await this.cache.set(blockKey, '1', blockSeconds);
      return {
        totalHits,
        timeToExpire: Math.max(timeToExpire, 0),
        isBlocked: true,
        timeToBlockExpire: blockSeconds,
      };
    }

    return {
      totalHits,
      timeToExpire: Math.max(timeToExpire, 0),
      isBlocked: false,
      timeToBlockExpire: 0,
    };
  }
}
