// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QUEUE_PROVIDER } from '../interfaces/queue-provider.interface';
import { BullMQProvider } from './bullmq.provider';
import { SyncQueueProvider } from './sync-queue.provider';

@Global()
@Module({
  providers: [
    {
      provide: QUEUE_PROVIDER,
      useFactory: (config: ConfigService) => {
        const redisUrl = config.get<string>('REDIS_URL');
        if (redisUrl) {
          return new BullMQProvider(redisUrl);
        }
        return new SyncQueueProvider();
      },
      inject: [ConfigService],
    },
  ],
  exports: [QUEUE_PROVIDER],
})
export class QueueModule {}
