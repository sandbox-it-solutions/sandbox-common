// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { Controller, Get } from '@nestjs/common';
import { register, collectDefaultMetrics, Counter, Histogram } from 'prom-client';

collectDefaultMetrics({ prefix: 'sandbox_' });

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

export const authAttemptsTotal = new Counter({
  name: 'sandbox_auth_attempts_total',
  help: 'Total authentication attempts',
  labelNames: ['method', 'status'],
});

export const wsConnectionsTotal = new Counter({
  name: 'sandbox_ws_connections_total',
  help: 'Total WebSocket connections',
  labelNames: ['namespace'],
});

@Controller('metrics')
export class MetricsController {
  @Get()
  async getMetrics(): Promise<string> {
    return register.metrics();
  }
}
