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
var ApiKeyThrottleGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyThrottleGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cache_provider_interface_1 = require("../../interfaces/cache-provider.interface");
let ApiKeyThrottleGuard = ApiKeyThrottleGuard_1 = class ApiKeyThrottleGuard {
    config;
    cache;
    logger = new common_1.Logger(ApiKeyThrottleGuard_1.name);
    maxRequests;
    windowSeconds;
    constructor(config, cache) {
        this.config = config;
        this.cache = cache;
        this.maxRequests = parseInt(this.config.get('API_KEY_RATE_LIMIT', '1000'), 10);
        this.windowSeconds = parseInt(this.config.get('API_KEY_RATE_WINDOW', '60'), 10);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];
        if (!apiKey || !this.cache)
            return true;
        const key = `api-rate:${apiKey.substring(0, 12)}`;
        try {
            const count = await this.cache.incr(key);
            if (count === 1) {
                await this.cache.expire(key, this.windowSeconds);
            }
            const remaining = Math.max(0, this.maxRequests - count);
            const response = context.switchToHttp().getResponse();
            response.setHeader('X-RateLimit-Limit', this.maxRequests);
            response.setHeader('X-RateLimit-Remaining', remaining);
            response.setHeader('X-RateLimit-Reset', this.windowSeconds);
            if (count > this.maxRequests) {
                this.logger.warn(`API key rate limit exceeded: ${apiKey.substring(0, 12)}...`);
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.TOO_MANY_REQUESTS,
                    message: 'API key rate limit exceeded',
                    error: 'TooManyRequestsException',
                }, common_1.HttpStatus.TOO_MANY_REQUESTS);
            }
        }
        catch (err) {
            if (err instanceof common_1.HttpException)
                throw err;
            const msg = err instanceof Error ? err.message : String(err);
            this.logger.error(`Rate limit check failed: ${msg}`);
        }
        return true;
    }
};
exports.ApiKeyThrottleGuard = ApiKeyThrottleGuard;
exports.ApiKeyThrottleGuard = ApiKeyThrottleGuard = ApiKeyThrottleGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Optional)()),
    __param(1, (0, common_1.Inject)(cache_provider_interface_1.CACHE_PROVIDER)),
    __metadata("design:paramtypes", [config_1.ConfigService, Object])
], ApiKeyThrottleGuard);
//# sourceMappingURL=api-key-throttle.guard.js.map