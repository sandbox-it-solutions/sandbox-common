// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Optional,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import type { ICacheProvider } from '../../interfaces/cache-provider.interface';
import { CACHE_PROVIDER } from '../../interfaces/cache-provider.interface';

@Injectable()
export class ApiKeyThrottleGuard implements CanActivate {
  private readonly logger = new Logger(ApiKeyThrottleGuard.name);
  private readonly maxRequests: number;
  private readonly windowSeconds: number;

  constructor(
    private readonly config: ConfigService,
    @Optional() @Inject(CACHE_PROVIDER) private readonly cache?: ICacheProvider,
  ) {
    this.maxRequests = parseInt(
      this.config.get('API_KEY_RATE_LIMIT', '1000'),
      10,
    );
    this.windowSeconds = parseInt(
      this.config.get('API_KEY_RATE_WINDOW', '60'),
      10,
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'] as string | undefined;

    if (!apiKey || !this.cache) return true;

    const key = `api-rate:${apiKey.substring(0, 12)}`;

    try {
      const count = await this.cache.incr(key);

      if (count === 1) {
        await this.cache.expire(key, this.windowSeconds);
      }

      const remaining = Math.max(0, this.maxRequests - count);
      const response = context.switchToHttp().getResponse<Response>();
      response.setHeader('X-RateLimit-Limit', this.maxRequests);
      response.setHeader('X-RateLimit-Remaining', remaining);
      response.setHeader('X-RateLimit-Reset', this.windowSeconds);

      if (count > this.maxRequests) {
        this.logger.warn(
          `API key rate limit exceeded: ${apiKey.substring(0, 12)}...`,
        );
        throw new HttpException(
          {
            statusCode: HttpStatus.TOO_MANY_REQUESTS,
            message: 'API key rate limit exceeded',
            error: 'TooManyRequestsException',
          },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
    } catch (err: unknown) {
      if (err instanceof HttpException) throw err;
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`Rate limit check failed: ${msg}`);
    }

    return true;
  }
}
