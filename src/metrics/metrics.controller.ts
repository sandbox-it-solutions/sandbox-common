// @ai-generated — GitHub Copilot (Claude Opus 4.6); modified — Claude Opus 4.7 — task: bypass GlobalAuthGuard so Prometheus scrape stays unauthenticated
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { Controller, Get } from '@nestjs/common';
import { register, collectDefaultMetrics, Counter, Histogram } from 'prom-client';
import { Public } from '../decorators/public.decorator';

let defaultsCollected = false;

function ensureDefaults(): void {
  if (!defaultsCollected) {
    collectDefaultMetrics({ prefix: 'sandbox_' });
    defaultsCollected = true;
  }
}

function getOrCreate<T>(name: string, factory: () => T): T {
  const existing = register.getSingleMetric(name);
  if (existing) return existing as unknown as T;
  return factory();
}

export const httpRequestDuration = getOrCreate(
  'sandbox_http_request_duration_seconds',
  () =>
    new Histogram({
      name: 'sandbox_http_request_duration_seconds',
      help: 'HTTP request duration in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
    }),
);

export const httpRequestTotal = getOrCreate(
  'sandbox_http_requests_total',
  () =>
    new Counter({
      name: 'sandbox_http_requests_total',
      help: 'Total HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
    }),
);

export const authAttemptsTotal = getOrCreate(
  'sandbox_auth_attempts_total',
  () =>
    new Counter({
      name: 'sandbox_auth_attempts_total',
      help: 'Total authentication attempts',
      labelNames: ['method', 'status'],
    }),
);

export const wsConnectionsTotal = getOrCreate(
  'sandbox_ws_connections_total',
  () =>
    new Counter({
      name: 'sandbox_ws_connections_total',
      help: 'Total WebSocket connections',
      labelNames: ['namespace'],
    }),
);

@Controller('metrics')
export class MetricsController {
  // Why: APP_GUARD GlobalAuthGuard otherwise rejects Prometheus' unauthenticated
  // scrape — and the docker healthcheck on some services pings this endpoint,
  // causing the container to flap unhealthy.
  @Public()
  @Get()
  async getMetrics(): Promise<string> {
    ensureDefaults();
    return register.metrics();
  }
}
