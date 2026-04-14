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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrottlerCacheStorage = void 0;
const common_1 = require("@nestjs/common");
const cache_provider_interface_1 = require("../interfaces/cache-provider.interface");
let ThrottlerCacheStorage = class ThrottlerCacheStorage {
    cache;
    keyPrefix = 'throttle:';
    constructor(cache) {
        this.cache = cache;
    }
    async increment(key, ttl, limit, blockDuration, throttlerName) {
        const cacheKey = `${this.keyPrefix}${throttlerName}:${key}`;
        const blockKey = `${this.keyPrefix}${throttlerName}:block:${key}`;
        const blocked = await this.cache.exists(blockKey);
        if (blocked) {
            const blockTtl = await this.cache.ttl(blockKey);
            return {
                totalHits: limit + 1,
                timeToExpire: 0,
                isBlocked: true,
                timeToBlockExpire: Math.max(blockTtl, 0),
            };
        }
        const totalHits = await this.cache.incr(cacheKey);
        if (totalHits === 1) {
            const ttlSeconds = Math.ceil(ttl / 1000);
            await this.cache.expire(cacheKey, ttlSeconds);
        }
        const timeToExpire = await this.cache.ttl(cacheKey);
        if (totalHits > limit && blockDuration > 0) {
            const blockSeconds = Math.ceil(blockDuration / 1000);
            await this.cache.set(blockKey, '1', blockSeconds);
            return {
                totalHits,
                timeToExpire: Math.max(timeToExpire, 0),
                isBlocked: true,
                timeToBlockExpire: blockSeconds,
            };
        }
        return {
            totalHits,
            timeToExpire: Math.max(timeToExpire, 0),
            isBlocked: false,
            timeToBlockExpire: 0,
        };
    }
};
exports.ThrottlerCacheStorage = ThrottlerCacheStorage;
exports.ThrottlerCacheStorage = ThrottlerCacheStorage = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_provider_interface_1.CACHE_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], ThrottlerCacheStorage);
//# sourceMappingURL=throttler-cache.storage.js.map