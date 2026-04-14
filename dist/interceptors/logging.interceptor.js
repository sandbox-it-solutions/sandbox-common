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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var LoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = exports.httpRequestTotal = exports.httpRequestDuration = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const nestjs_cls_1 = require("nestjs-cls");
const prom_client_1 = require("prom-client");
exports.httpRequestDuration = new prom_client_1.Histogram({
    name: 'sandbox_http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
});
exports.httpRequestTotal = new prom_client_1.Counter({
    name: 'sandbox_http_requests_total',
    help: 'Total HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
});
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    cls;
    logger = new common_1.Logger(LoggingInterceptor_1.name);
    constructor(cls) {
        this.cls = cls;
    }
    intercept(context, next) {
        const request = context
            .switchToHttp()
            .getRequest();
        const response = context.switchToHttp().getResponse();
        const { method, url } = request;
        if (url === '/api/v1/health' ||
            url === '/health' ||
            url === '/api/v1/metrics') {
            return next.handle();
        }
        const correlationId = this.cls?.getId() ||
            request.headers['x-correlation-id'] ||
            'unknown';
        request.correlationId = correlationId;
        response.setHeader('X-Correlation-ID', correlationId);
        const now = Date.now();
        const userId = request.user?.id ?? 'anonymous';
        const route = request.route?.path ||
            url.split('?')[0];
        return next.handle().pipe((0, operators_1.tap)({
            next: () => {
                const statusCode = response.statusCode;
                const duration = Date.now() - now;
                const durationSec = duration / 1000;
                exports.httpRequestDuration
                    .labels(method, route, String(statusCode))
                    .observe(durationSec);
                exports.httpRequestTotal.labels(method, route, String(statusCode)).inc();
                this.logger.debug(`${method} ${url} ${statusCode} ${duration}ms user=${userId} cid=${correlationId}`);
            },
            error: (error) => {
                const duration = Date.now() - now;
                const statusCode = error.status || 500;
                const durationSec = duration / 1000;
                exports.httpRequestDuration
                    .labels(method, route, String(statusCode))
                    .observe(durationSec);
                exports.httpRequestTotal.labels(method, route, String(statusCode)).inc();
                this.logger.error(`${method} ${url} ${statusCode} ${duration}ms user=${userId} cid=${correlationId} error=${error.message}`);
            },
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService])
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map