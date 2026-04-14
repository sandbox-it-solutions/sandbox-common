"use strict";
// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncQueueProvider = exports.BullMQProvider = exports.QueueModule = void 0;
var queue_module_1 = require("./queue.module");
Object.defineProperty(exports, "QueueModule", { enumerable: true, get: function () { return queue_module_1.QueueModule; } });
var bullmq_provider_1 = require("./bullmq.provider");
Object.defineProperty(exports, "BullMQProvider", { enumerable: true, get: function () { return bullmq_provider_1.BullMQProvider; } });
var sync_queue_provider_1 = require("./sync-queue.provider");
Object.defineProperty(exports, "SyncQueueProvider", { enumerable: true, get: function () { return sync_queue_provider_1.SyncQueueProvider; } });
//# sourceMappingURL=index.js.map