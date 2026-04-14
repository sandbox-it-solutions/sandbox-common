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
var EmployeeGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeGuard = void 0;
const common_1 = require("@nestjs/common");
const roles_1 = require("../../constants/roles");
let EmployeeGuard = EmployeeGuard_1 = class EmployeeGuard {
    logger = new common_1.Logger(EmployeeGuard_1.name);
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            this.logger.warn('EmployeeGuard: No user found on request');
            throw new common_1.ForbiddenException('Access denied: authentication required');
        }
        const allowed = [
            roles_1.Roles.EMPLOYEE,
            roles_1.Roles.PLATFORM_ADMIN,
            roles_1.Roles.FOUNDER,
        ];
        if (!allowed.includes(user.role)) {
            this.logger.warn(`User ${user.id} with role "${user.role}" denied access. Required: employee+`);
            throw new common_1.ForbiddenException('Access denied: requires employee or platform_admin role');
        }
        return true;
    }
};
exports.EmployeeGuard = EmployeeGuard;
exports.EmployeeGuard = EmployeeGuard = EmployeeGuard_1 = __decorate([
    (0, common_1.Injectable)()
], EmployeeGuard);
//# sourceMappingURL=employee.guard.js.map