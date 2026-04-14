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
var OpenFGAService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenFGAService = void 0;
const common_1 = require("@nestjs/common");
const sdk_1 = require("@openfga/sdk");
const role_defaults_1 = require("../constants/role-defaults");
const ACCESS_TO_RELATION = {
    full: 'full_access',
    partial: 'partial_access',
    read: 'read_access',
    none: 'can_view',
};
const CHECK_RELATIONS = [
    { relation: 'full_access', level: 'full' },
    { relation: 'partial_access', level: 'partial' },
    { relation: 'read_access', level: 'read' },
];
let OpenFGAService = OpenFGAService_1 = class OpenFGAService {
    logger = new common_1.Logger(OpenFGAService_1.name);
    client;
    async onModuleInit() {
        const apiUrl = process.env.OPENFGA_API_URL || 'http://openfga:8080';
        const storeId = process.env.OPENFGA_STORE_ID;
        const modelId = process.env.OPENFGA_MODEL_ID;
        if (!storeId || !modelId) {
            this.logger.warn('OPENFGA_STORE_ID or OPENFGA_MODEL_ID not set — OpenFGA disabled');
            return;
        }
        this.client = new sdk_1.OpenFgaClient({
            apiUrl,
            storeId,
            authorizationModelId: modelId,
            credentials: { method: sdk_1.CredentialsMethod.None },
        });
        try {
            const model = await this.client.readAuthorizationModel();
            this.logger.log(`Connected to OpenFGA store=${storeId} model=${model.authorization_model?.id}`);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            this.logger.error(`Failed to connect to OpenFGA: ${message}`);
        }
    }
    get isEnabled() {
        return !!this.client;
    }
    async check(userId, area, minAccess) {
        if (!this.client)
            return false;
        const relation = ACCESS_TO_RELATION[minAccess];
        if (!relation || minAccess === 'none')
            return true;
        try {
            const result = await this.client.check({
                user: `user:${userId}`,
                relation,
                object: `area:${area}`,
            });
            return result.allowed ?? false;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            this.logger.error(`OpenFGA check failed: user=${userId} area=${area}: ${message}`);
            return false;
        }
    }
    async resolveAccess(userId, area) {
        if (!this.client)
            return 'none';
        try {
            for (const { relation, level } of CHECK_RELATIONS) {
                const result = await this.client.check({
                    user: `user:${userId}`,
                    relation,
                    object: `area:${area}`,
                });
                if (result.allowed)
                    return level;
            }
            return 'none';
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            this.logger.error(`OpenFGA resolveAccess failed: user=${userId} area=${area}: ${message}`);
            return 'none';
        }
    }
    async listUserAreas(userId) {
        if (!this.client)
            return {};
        const result = {};
        try {
            for (const { relation, level } of CHECK_RELATIONS) {
                const resp = await this.client.listObjects({
                    user: `user:${userId}`,
                    relation,
                    type: 'area',
                });
                for (const obj of resp.objects ?? []) {
                    const areaSlug = obj.replace('area:', '');
                    if (!result[areaSlug]) {
                        result[areaSlug] = level;
                    }
                }
            }
            return result;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            this.logger.error(`OpenFGA listUserAreas failed: user=${userId}: ${message}`);
            return {};
        }
    }
    async setUserAccess(userId, area, accessLevel) {
        if (!this.client)
            return;
        await this.removeUserAccess(userId, area);
        if (accessLevel !== 'none') {
            const relation = ACCESS_TO_RELATION[accessLevel];
            await this.client.write({
                writes: [
                    {
                        user: `user:${userId}`,
                        relation,
                        object: `area:${area}`,
                    },
                ],
            });
        }
    }
    async removeUserAccess(userId, area) {
        if (!this.client)
            return;
        for (const { relation } of CHECK_RELATIONS) {
            try {
                await this.client.write({
                    deletes: [
                        {
                            user: `user:${userId}`,
                            relation,
                            object: `area:${area}`,
                        },
                    ],
                });
            }
            catch {
                // Tuple may not exist
            }
        }
    }
    async assignRole(userId, role) {
        if (!this.client)
            return;
        await this.client.write({
            writes: [
                {
                    user: `user:${userId}`,
                    relation: 'member',
                    object: `role:${role}`,
                },
            ],
        });
    }
    async removeRole(userId, role) {
        if (!this.client)
            return;
        try {
            await this.client.write({
                deletes: [
                    {
                        user: `user:${userId}`,
                        relation: 'member',
                        object: `role:${role}`,
                    },
                ],
            });
        }
        catch {
            // Tuple may not exist
        }
    }
    async seedRoleDefaults() {
        if (!this.client)
            return 0;
        let count = 0;
        const writes = [];
        for (const [role, areas] of Object.entries(role_defaults_1.ROLE_DEFAULTS)) {
            for (const [area, access] of Object.entries(areas)) {
                if (access === 'none')
                    continue;
                const relation = ACCESS_TO_RELATION[access];
                writes.push({
                    user: `role:${role}#member`,
                    relation,
                    object: `area:${area}`,
                });
                count++;
            }
        }
        const BATCH_SIZE = 100;
        for (let i = 0; i < writes.length; i += BATCH_SIZE) {
            const batch = writes.slice(i, i + BATCH_SIZE);
            await this.client.write({ writes: batch });
        }
        this.logger.log(`Seeded ${count} role default tuples into OpenFGA`);
        return count;
    }
    async setRoleAreaDefault(role, area, accessLevel) {
        if (!this.client)
            return;
        for (const { relation } of CHECK_RELATIONS) {
            try {
                await this.client.write({
                    deletes: [
                        {
                            user: `role:${role}#member`,
                            relation,
                            object: `area:${area}`,
                        },
                    ],
                });
            }
            catch {
                // Tuple may not exist
            }
        }
        if (accessLevel !== 'none') {
            const relation = ACCESS_TO_RELATION[accessLevel];
            await this.client.write({
                writes: [
                    {
                        user: `role:${role}#member`,
                        relation,
                        object: `area:${area}`,
                    },
                ],
            });
        }
    }
};
exports.OpenFGAService = OpenFGAService;
exports.OpenFGAService = OpenFGAService = OpenFGAService_1 = __decorate([
    (0, common_1.Injectable)()
], OpenFGAService);
//# sourceMappingURL=openfga.service.js.map