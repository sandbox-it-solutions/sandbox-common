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
var PermissionGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cache_provider_interface_1 = require("../../interfaces/cache-provider.interface");
const permission_checker_interface_1 = require("../../interfaces/permission-checker.interface");
const permission_store_interface_1 = require("../../interfaces/permission-store.interface");
const require_permission_decorator_1 = require("../../decorators/require-permission.decorator");
const public_decorator_1 = require("../../decorators/public.decorator");
const role_defaults_1 = require("../../constants/role-defaults");
const roles_1 = require("../../constants/roles");
const PERMISSION_CACHE_TTL = 300;
const CACHE_PREFIX = 'perm:';
let PermissionGuard = PermissionGuard_1 = class PermissionGuard {
    reflector;
    cache;
    permissionChecker;
    permissionStore;
    logger = new common_1.Logger(PermissionGuard_1.name);
    constructor(reflector, cache, permissionChecker, permissionStore) {
        this.reflector = reflector;
        this.cache = cache;
        this.permissionChecker = permissionChecker;
        this.permissionStore = permissionStore;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;
        const required = this.reflector.getAllAndOverride(require_permission_decorator_1.PERMISSION_KEY, [context.getHandler(), context.getClass()]);
        if (!required)
            return true;
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user)
            return true;
        // Founders bypass all permission checks
        if (user.role === roles_1.Roles.FOUNDER) {
            this.logAudit(user.id, user.role, required.area, required.minAccess, 'full', true, `${request.method} ${request.originalUrl || request.url}`, request.headers?.['x-forwarded-for'] ||
                request.headers?.['x-real-ip'] ||
                request.ip);
            return true;
        }
        const effectiveAccess = await this.resolveAccess(user.id, user.role, required.area);
        const granted = (0, role_defaults_1.meetsAccessLevel)(effectiveAccess, required.minAccess);
        const endpoint = `${request.method} ${request.originalUrl || request.url}`;
        this.logAudit(user.id, user.role, required.area, required.minAccess, effectiveAccess, granted, endpoint, request.headers?.['x-forwarded-for'] ||
            request.headers?.['x-real-ip'] ||
            request.ip);
        if (!granted) {
            this.logger.warn(`Permission denied: user=${user.id} role=${user.role} area=${required.area} ` +
                `has=${effectiveAccess} needs=${required.minAccess} endpoint=${endpoint}`);
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
        return true;
    }
    logAudit(userId, role, area, required, actual, granted, endpoint, ipAddress) {
        if (granted && role !== roles_1.Roles.FOUNDER && Math.random() > 0.1)
            return;
        if (this.permissionStore) {
            this.permissionStore
                .createAuditLog({
                userId,
                role,
                area,
                required,
                actual,
                granted,
                endpoint,
                ipAddress,
            })
                .catch((err) => {
                const message = err instanceof Error ? err.message : String(err);
                this.logger.error(`Audit log failed: ${message}`);
            });
        }
    }
    async resolveAccess(userId, role, area) {
        // Primary: OpenFGA
        if (this.permissionChecker.isEnabled) {
            try {
                const access = await this.permissionChecker.resolveAccess(userId, area);
                if (access !== 'none')
                    return access;
                return 'none';
            }
            catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                this.logger.warn(`OpenFGA check failed, falling back to store: ${message}`);
            }
        }
        // Fallback: cached store permissions + role defaults
        if (this.permissionStore) {
            const overrides = await this.getCachedPermissions(userId);
            const override = overrides.find((p) => p.area === area);
            if (override)
                return override.access;
        }
        return (0, role_defaults_1.getRoleDefault)(role, area);
    }
    async getCachedPermissions(userId) {
        const cacheKey = `${CACHE_PREFIX}${userId}`;
        try {
            const cached = await this.cache.get(cacheKey);
            if (cached) {
                return JSON.parse(cached);
            }
        }
        catch {
            // Cache miss or parse error
        }
        if (!this.permissionStore)
            return [];
        const dbPermissions = await this.permissionStore.findUserPermissions(userId);
        const permissions = dbPermissions.map((p) => ({
            area: p.area,
            access: p.access,
        }));
        try {
            await this.cache.set(cacheKey, JSON.stringify(permissions), PERMISSION_CACHE_TTL);
        }
        catch {
            // Non-critical
        }
        return permissions;
    }
    static cacheKey(userId) {
        return `${CACHE_PREFIX}${userId}`;
    }
};
exports.PermissionGuard = PermissionGuard;
exports.PermissionGuard = PermissionGuard = PermissionGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_provider_interface_1.CACHE_PROVIDER)),
    __param(2, (0, common_1.Inject)(permission_checker_interface_1.PERMISSION_CHECKER)),
    __param(3, (0, common_1.Optional)()),
    __param(3, (0, common_1.Inject)(permission_store_interface_1.PERMISSION_STORE)),
    __metadata("design:paramtypes", [core_1.Reflector, Object, Object, Object])
], PermissionGuard);
//# sourceMappingURL=permission.guard.js.map