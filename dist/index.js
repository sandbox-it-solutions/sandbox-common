"use strict";
// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * @sandbox-it-solutions/common
 * Shared NestJS infrastructure for SandBox microservices.
 *
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrottlerCacheStorage = exports.wsConnectionsTotal = exports.authAttemptsTotal = exports.MetricsController = exports.MetricsModule = exports.OpenFGAService = exports.OpenFGAModule = exports.SyncQueueProvider = exports.BullMQProvider = exports.QueueModule = exports.RedisCacheProvider = exports.MemoryCacheProvider = exports.CacheModule = void 0;
// ── Interfaces & Tokens ──
__exportStar(require("./interfaces"), exports);
// ── Constants ──
__exportStar(require("./constants"), exports);
// ── Decorators ──
__exportStar(require("./decorators"), exports);
// ── Guards ──
__exportStar(require("./auth"), exports);
// ── Filters ──
__exportStar(require("./filters"), exports);
// ── Interceptors ──
__exportStar(require("./interceptors"), exports);
// ── Pipes ──
__exportStar(require("./pipes"), exports);
// ── Validators ──
__exportStar(require("./validators"), exports);
// ── Modules ──
var cache_1 = require("./cache");
Object.defineProperty(exports, "CacheModule", { enumerable: true, get: function () { return cache_1.CacheModule; } });
Object.defineProperty(exports, "MemoryCacheProvider", { enumerable: true, get: function () { return cache_1.MemoryCacheProvider; } });
Object.defineProperty(exports, "RedisCacheProvider", { enumerable: true, get: function () { return cache_1.RedisCacheProvider; } });
var queue_1 = require("./queue");
Object.defineProperty(exports, "QueueModule", { enumerable: true, get: function () { return queue_1.QueueModule; } });
Object.defineProperty(exports, "BullMQProvider", { enumerable: true, get: function () { return queue_1.BullMQProvider; } });
Object.defineProperty(exports, "SyncQueueProvider", { enumerable: true, get: function () { return queue_1.SyncQueueProvider; } });
var openfga_1 = require("./openfga");
Object.defineProperty(exports, "OpenFGAModule", { enumerable: true, get: function () { return openfga_1.OpenFGAModule; } });
Object.defineProperty(exports, "OpenFGAService", { enumerable: true, get: function () { return openfga_1.OpenFGAService; } });
var metrics_1 = require("./metrics");
Object.defineProperty(exports, "MetricsModule", { enumerable: true, get: function () { return metrics_1.MetricsModule; } });
Object.defineProperty(exports, "MetricsController", { enumerable: true, get: function () { return metrics_1.MetricsController; } });
Object.defineProperty(exports, "authAttemptsTotal", { enumerable: true, get: function () { return metrics_1.authAttemptsTotal; } });
Object.defineProperty(exports, "wsConnectionsTotal", { enumerable: true, get: function () { return metrics_1.wsConnectionsTotal; } });
var throttler_1 = require("./throttler");
Object.defineProperty(exports, "ThrottlerCacheStorage", { enumerable: true, get: function () { return throttler_1.ThrottlerCacheStorage; } });
// ── Utils ──
__exportStar(require("./utils"), exports);
//# sourceMappingURL=index.js.map