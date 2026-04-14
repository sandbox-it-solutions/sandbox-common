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
var OrgMemberGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgMemberGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const org_membership_lookup_interface_1 = require("../../interfaces/org-membership-lookup.interface");
const org_roles_decorator_1 = require("../../decorators/org-roles.decorator");
const roles_1 = require("../../constants/roles");
let OrgMemberGuard = OrgMemberGuard_1 = class OrgMemberGuard {
    reflector;
    orgLookup;
    logger = new common_1.Logger(OrgMemberGuard_1.name);
    constructor(reflector, orgLookup) {
        this.reflector = reflector;
        this.orgLookup = orgLookup;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new common_1.ForbiddenException('Access denied: authentication required');
        }
        const organizationId = request.params.id || request.params.organizationId;
        if (!organizationId)
            return true;
        if (user.role === roles_1.Roles.PLATFORM_ADMIN || user.role === roles_1.Roles.FOUNDER) {
            return true;
        }
        if (!this.orgLookup) {
            this.logger.warn('OrgMemberGuard: No IOrgMembershipLookup provided');
            return true;
        }
        const membership = await this.orgLookup.findMembership(organizationId, user.id);
        if (!membership) {
            this.logger.warn(`User ${user.id} denied access to org ${organizationId}: not a member`);
            throw new common_1.ForbiddenException('Access denied: you are not a member of this organization');
        }
        const requiredRoles = this.reflector.getAllAndOverride(org_roles_decorator_1.ORG_ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (requiredRoles && requiredRoles.length > 0) {
            if (!requiredRoles.includes(membership.role)) {
                this.logger.warn(`User ${user.id} with org role "${membership.role}" denied. Required: [${requiredRoles.join(', ')}]`);
                throw new common_1.ForbiddenException(`Access denied: requires organization role [${requiredRoles.join(', ')}]`);
            }
        }
        request.orgMembership = membership;
        return true;
    }
};
exports.OrgMemberGuard = OrgMemberGuard;
exports.OrgMemberGuard = OrgMemberGuard = OrgMemberGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Optional)()),
    __param(1, (0, common_1.Inject)(org_membership_lookup_interface_1.ORG_MEMBERSHIP_LOOKUP)),
    __metadata("design:paramtypes", [core_1.Reflector, Object])
], OrgMemberGuard);
//# sourceMappingURL=org-member.guard.js.map