// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CACHE_PROVIDER } from '../interfaces/cache-provider.interface';
import { RedisCacheProvider } from './redis-cache.provider';
import { MemoryCacheProvider } from './memory-cache.provider';

@Global()
@Module({
  providers: [
    {
      provide: CACHE_PROVIDER,
      useFactory: (config: ConfigService) => {
        const redisUrl = config.get<string>('REDIS_URL');
        if (redisUrl) {
          return new RedisCacheProvider(redisUrl);
        }
        return new MemoryCacheProvider();
      },
      inject: [ConfigService],
    },
  ],
  exports: [CACHE_PROVIDER],
})
export class CacheModule {}
