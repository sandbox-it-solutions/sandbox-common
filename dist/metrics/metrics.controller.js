"use strict";
// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsController = exports.wsConnectionsTotal = exports.authAttemptsTotal = exports.httpRequestTotal = exports.httpRequestDuration = void 0;
const common_1 = require("@nestjs/common");
const prom_client_1 = require("prom-client");
let defaultsCollected = false;
function ensureDefaults() {
    if (!defaultsCollected) {
        (0, prom_client_1.collectDefaultMetrics)({ prefix: 'sandbox_' });
        defaultsCollected = true;
    }
}
function getOrCreate(name, factory) {
    const existing = prom_client_1.register.getSingleMetric(name);
    if (existing)
        return existing;
    return factory();
}
exports.httpRequestDuration = getOrCreate('sandbox_http_request_duration_seconds', () => new prom_client_1.Histogram({
    name: 'sandbox_http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
}));
exports.httpRequestTotal = getOrCreate('sandbox_http_requests_total', () => new prom_client_1.Counter({
    name: 'sandbox_http_requests_total',
    help: 'Total HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
}));
exports.authAttemptsTotal = getOrCreate('sandbox_auth_attempts_total', () => new prom_client_1.Counter({
    name: 'sandbox_auth_attempts_total',
    help: 'Total authentication attempts',
    labelNames: ['method', 'status'],
}));
exports.wsConnectionsTotal = getOrCreate('sandbox_ws_connections_total', () => new prom_client_1.Counter({
    name: 'sandbox_ws_connections_total',
    help: 'Total WebSocket connections',
    labelNames: ['namespace'],
}));
let MetricsController = class MetricsController {
    async getMetrics() {
        ensureDefaults();
        return prom_client_1.register.metrics();
    }
};
exports.MetricsController = MetricsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "getMetrics", null);
exports.MetricsController = MetricsController = __decorate([
    (0, common_1.Controller)('metrics')
], MetricsController);
//# sourceMappingURL=metrics.controller.js.map