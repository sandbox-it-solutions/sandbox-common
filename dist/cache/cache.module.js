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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cache_provider_interface_1 = require("../interfaces/cache-provider.interface");
const redis_cache_provider_1 = require("./redis-cache.provider");
const memory_cache_provider_1 = require("./memory-cache.provider");
let CacheModule = class CacheModule {
};
exports.CacheModule = CacheModule;
exports.CacheModule = CacheModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: cache_provider_interface_1.CACHE_PROVIDER,
                useFactory: (config) => {
                    const redisUrl = config.get('REDIS_URL');
                    if (redisUrl) {
                        return new redis_cache_provider_1.RedisCacheProvider(redisUrl);
                    }
                    return new memory_cache_provider_1.MemoryCacheProvider();
                },
                inject: [config_1.ConfigService],
            },
        ],
        exports: [cache_provider_interface_1.CACHE_PROVIDER],
    })
], CacheModule);
//# sourceMappingURL=cache.module.js.map