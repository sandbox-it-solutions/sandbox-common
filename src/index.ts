// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * @sandbox-it-solutions/common
 * Shared NestJS infrastructure for SandBox microservices.
 *
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

// ── Interfaces & Tokens ──
export * from './interfaces';

// ── Constants ──
export * from './constants';

// ── Decorators ──
export * from './decorators';

// ── Guards ──
export * from './auth';

// ── Filters ──
export * from './filters';

// ── Interceptors ──
export * from './interceptors';

// ── Pipes ──
export * from './pipes';

// ── Validators ──
export * from './validators';

// ── Modules ──
export { CacheModule, MemoryCacheProvider, RedisCacheProvider } from './cache';
export { QueueModule, BullMQProvider, SyncQueueProvider } from './queue';
export { OpenFGAModule, OpenFGAService } from './openfga';
export { MetricsModule, MetricsController, authAttemptsTotal, wsConnectionsTotal } from './metrics';
export { ThrottlerCacheStorage } from './throttler';
