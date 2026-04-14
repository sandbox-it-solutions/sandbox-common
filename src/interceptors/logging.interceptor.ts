// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  Optional,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';
import { Histogram, Counter } from 'prom-client';

export const httpRequestDuration = new Histogram({
  name: 'sandbox_http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
});

export const httpRequestTotal = new Counter({
  name: 'sandbox_http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor(@Optional() private readonly cls?: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context
      .switchToHttp()
      .getRequest<
        Request & { correlationId?: string; user?: { id: string } }
      >();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, url } = request;

    if (
      url === '/api/v1/health' ||
      url === '/health' ||
      url === '/api/v1/metrics'
    ) {
      return next.handle();
    }

    const correlationId =
      this.cls?.getId() ||
      (request.headers['x-correlation-id'] as string | undefined) ||
      'unknown';

    request.correlationId = correlationId;
    response.setHeader('X-Correlation-ID', correlationId);

    const now = Date.now();
    const userId = request.user?.id ?? 'anonymous';
    const route =
      (request.route as { path?: string } | undefined)?.path ||
      url.split('?')[0];

    return next.handle().pipe(
      tap({
        next: () => {
          const statusCode = response.statusCode;
          const duration = Date.now() - now;
          const durationSec = duration / 1000;

          httpRequestDuration
            .labels(method, route, String(statusCode))
            .observe(durationSec);
          httpRequestTotal.labels(method, route, String(statusCode)).inc();

          this.logger.debug(
            `${method} ${url} ${statusCode} ${duration}ms user=${userId} cid=${correlationId}`,
          );
        },
        error: (error: Error & { status?: number }) => {
          const duration = Date.now() - now;
          const statusCode = error.status || 500;
          const durationSec = duration / 1000;

          httpRequestDuration
            .labels(method, route, String(statusCode))
            .observe(durationSec);
          httpRequestTotal.labels(method, route, String(statusCode)).inc();

          this.logger.error(
            `${method} ${url} ${statusCode} ${duration}ms user=${userId} cid=${correlationId} error=${error.message}`,
          );
        },
      }),
    );
  }
}
