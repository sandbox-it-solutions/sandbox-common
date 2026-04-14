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
var WorkspaceGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceGuard = void 0;
const common_1 = require("@nestjs/common");
const workspace_membership_checker_interface_1 = require("../../interfaces/workspace-membership-checker.interface");
const roles_1 = require("../../constants/roles");
let WorkspaceGuard = WorkspaceGuard_1 = class WorkspaceGuard {
    membershipChecker;
    logger = new common_1.Logger(WorkspaceGuard_1.name);
    constructor(membershipChecker) {
        this.membershipChecker = membershipChecker;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new common_1.ForbiddenException('Access denied: authentication required');
        }
        const workspaceId = (request.params.workspaceId || request.params.id);
        if (!workspaceId)
            return true;
        if (user.role === roles_1.Roles.PLATFORM_ADMIN)
            return true;
        if (!this.membershipChecker) {
            this.logger.warn('WorkspaceGuard: no membership checker — DMS module not loaded');
            throw new common_1.ForbiddenException('Workspace operations are handled by the DMS API');
        }
        const membership = await this.membershipChecker.checkMembership(workspaceId, user.id);
        if (!membership) {
            this.logger.warn(`User ${user.id} denied access to workspace ${workspaceId}: not a member`);
            throw new common_1.ForbiddenException('Access denied: you are not a member of this workspace');
        }
        request.workspaceMembership = membership;
        return true;
    }
};
exports.WorkspaceGuard = WorkspaceGuard;
exports.WorkspaceGuard = WorkspaceGuard = WorkspaceGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, common_1.Inject)(workspace_membership_checker_interface_1.WORKSPACE_MEMBERSHIP_CHECKER)),
    __metadata("design:paramtypes", [Object])
], WorkspaceGuard);
//# sourceMappingURL=workspace.guard.js.map