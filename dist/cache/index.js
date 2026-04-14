"use strict";
// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheProvider = exports.MemoryCacheProvider = exports.CacheModule = void 0;
var cache_module_1 = require("./cache.module");
Object.defineProperty(exports, "CacheModule", { enumerable: true, get: function () { return cache_module_1.CacheModule; } });
var memory_cache_provider_1 = require("./memory-cache.provider");
Object.defineProperty(exports, "MemoryCacheProvider", { enumerable: true, get: function () { return memory_cache_provider_1.MemoryCacheProvider; } });
var redis_cache_provider_1 = require("./redis-cache.provider");
Object.defineProperty(exports, "RedisCacheProvider", { enumerable: true, get: function () { return redis_cache_provider_1.RedisCacheProvider; } });
//# sourceMappingURL=index.js.map