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
var GlobalAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const public_decorator_1 = require("../../decorators/public.decorator");
const user_lookup_interface_1 = require("../../interfaces/user-lookup.interface");
let GlobalAuthGuard = GlobalAuthGuard_1 = class GlobalAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    reflector;
    userLookup;
    logger = new common_1.Logger(GlobalAuthGuard_1.name);
    constructor(reflector, userLookup) {
        super();
        this.reflector = reflector;
        this.userLookup = userLookup;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;
        const request = context.switchToHttp().getRequest();
        const internalKey = request.headers['x-internal-key'];
        const expectedKey = process.env.INTERNAL_API_KEY;
        if (expectedKey && internalKey === expectedKey) {
            const employeeEmail = request.headers['x-employee-email'];
            if (employeeEmail && this.userLookup) {
                try {
                    const dbUser = await this.userLookup.findByEmail(employeeEmail);
                    if (dbUser) {
                        request.user = {
                            id: dbUser.id,
                            email: dbUser.email,
                            role: dbUser.role,
                        };
                        return true;
                    }
                    this.logger.warn(`Employee email ${employeeEmail} not found, using system user`);
                }
                catch (err) {
                    const message = err instanceof Error ? err.message : String(err);
                    this.logger.error(`Failed to resolve employee: ${message}`);
                }
            }
            request.user = {
                id: 'system-employee-portal',
                email: 'system@sandbox-it.de',
                role: 'employee',
            };
            return true;
        }
        try {
            const result = super.canActivate(context);
            if (result instanceof Promise)
                return await result;
            if (typeof result === 'boolean')
                return result;
            return new Promise((resolve, reject) => {
                result.subscribe({
                    next: (v) => resolve(v),
                    error: (e) => reject(e),
                });
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            if (message.includes('Unknown authentication strategy')) {
                this.logger.warn('JWT strategy not registered — rejecting request');
                throw new common_1.UnauthorizedException('Authentication required');
            }
            throw err;
        }
    }
};
exports.GlobalAuthGuard = GlobalAuthGuard;
exports.GlobalAuthGuard = GlobalAuthGuard = GlobalAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Optional)()),
    __param(1, (0, common_1.Inject)(user_lookup_interface_1.USER_LOOKUP)),
    __metadata("design:paramtypes", [core_1.Reflector, Object])
], GlobalAuthGuard);
//# sourceMappingURL=global-auth.guard.js.map