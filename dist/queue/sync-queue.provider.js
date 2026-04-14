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
var SyncQueueProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncQueueProvider = void 0;
const common_1 = require("@nestjs/common");
/**
 * Synchronous queue fallback — executes jobs immediately via event emission.
 * Use when Redis is not available (development, testing).
 */
let SyncQueueProvider = SyncQueueProvider_1 = class SyncQueueProvider {
    logger = new common_1.Logger(SyncQueueProvider_1.name);
    handlers = new Map();
    constructor() {
        this.logger.warn('Using synchronous queue fallback — configure REDIS_URL for BullMQ');
    }
    /** Register a handler for a specific queue+job combination. */
    onJob(queueName, jobName, handler) {
        this.handlers.set(`${queueName}:${jobName}`, handler);
    }
    async addJob(queueName, jobName, data, opts) {
        const handler = this.handlers.get(`${queueName}:${jobName}`);
        if (opts?.delay) {
            setTimeout(() => handler?.(data), opts.delay);
        }
        else {
            handler?.(data);
        }
        this.logger.debug(`Sync job "${jobName}" executed for queue "${queueName}"`);
    }
    async addBulk(queueName, jobs) {
        for (const job of jobs) {
            await this.addJob(queueName, job.name, job.data, job.opts);
        }
    }
};
exports.SyncQueueProvider = SyncQueueProvider;
exports.SyncQueueProvider = SyncQueueProvider = SyncQueueProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SyncQueueProvider);
//# sourceMappingURL=sync-queue.provider.js.map