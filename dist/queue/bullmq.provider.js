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
var BullMQProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullMQProvider = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("bullmq");
let BullMQProvider = BullMQProvider_1 = class BullMQProvider {
    redisUrl;
    logger = new common_1.Logger(BullMQProvider_1.name);
    queues = new Map();
    constructor(redisUrl) {
        this.redisUrl = redisUrl;
        this.logger.log('BullMQ queue provider initialized');
    }
    getQueue(name) {
        let queue = this.queues.get(name);
        if (!queue) {
            const url = new URL(this.redisUrl);
            queue = new bullmq_1.Queue(name, {
                connection: {
                    host: url.hostname,
                    port: parseInt(url.port || '6379', 10),
                    password: url.password || undefined,
                },
            });
            this.queues.set(name, queue);
        }
        return queue;
    }
    async addJob(queueName, jobName, data, opts) {
        const queue = this.getQueue(queueName);
        await queue.add(jobName, data, opts);
        this.logger.debug(`Job "${jobName}" added to queue "${queueName}"`);
    }
    async addBulk(queueName, jobs) {
        const queue = this.getQueue(queueName);
        await queue.addBulk(jobs);
        this.logger.debug(`${jobs.length} jobs added to queue "${queueName}"`);
    }
};
exports.BullMQProvider = BullMQProvider;
exports.BullMQProvider = BullMQProvider = BullMQProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String])
], BullMQProvider);
//# sourceMappingURL=bullmq.provider.js.map