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
exports.QueueModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const queue_provider_interface_1 = require("../interfaces/queue-provider.interface");
const bullmq_provider_1 = require("./bullmq.provider");
const sync_queue_provider_1 = require("./sync-queue.provider");
let QueueModule = class QueueModule {
};
exports.QueueModule = QueueModule;
exports.QueueModule = QueueModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: queue_provider_interface_1.QUEUE_PROVIDER,
                useFactory: (config) => {
                    const redisUrl = config.get('REDIS_URL');
                    if (redisUrl) {
                        return new bullmq_provider_1.BullMQProvider(redisUrl);
                    }
                    return new sync_queue_provider_1.SyncQueueProvider();
                },
                inject: [config_1.ConfigService],
            },
        ],
        exports: [queue_provider_interface_1.QUEUE_PROVIDER],
    })
], QueueModule);
//# sourceMappingURL=queue.module.js.map