// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Logger,
  Optional,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthenticatedRequest } from '../../interfaces/authenticated-request.interface';
import type { IOrgMembershipLookup } from '../../interfaces/org-membership-lookup.interface';
import { ORG_MEMBERSHIP_LOOKUP } from '../../interfaces/org-membership-lookup.interface';
import { ORG_ROLES_KEY } from '../../decorators/org-roles.decorator';
import { Roles } from '../../constants/roles';

@Injectable()
export class OrgMemberGuard implements CanActivate {
  private readonly logger = new Logger(OrgMemberGuard.name);

  constructor(
    private readonly reflector: Reflector,
    @Optional()
    @Inject(ORG_MEMBERSHIP_LOOKUP)
    private readonly orgLookup?: IOrgMembershipLookup,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Access denied: authentication required');
    }

    const organizationId = (
      request.params as Record<string, string | undefined>
    ).id || (request.params as Record<string, string | undefined>).organizationId;

    if (!organizationId) return true;

    if (user.role === Roles.PLATFORM_ADMIN || user.role === Roles.FOUNDER) {
      return true;
    }

    if (!this.orgLookup) {
      this.logger.warn('OrgMemberGuard: No IOrgMembershipLookup provided');
      return true;
    }

    const membership = await this.orgLookup.findMembership(
      organizationId,
      user.id,
    );

    if (!membership) {
      this.logger.warn(
        `User ${user.id} denied access to org ${organizationId}: not a member`,
      );
      throw new ForbiddenException(
        'Access denied: you are not a member of this organization',
      );
    }

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ORG_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (requiredRoles && requiredRoles.length > 0) {
      if (!requiredRoles.includes(membership.role)) {
        this.logger.warn(
          `User ${user.id} with org role "${membership.role}" denied. Required: [${requiredRoles.join(', ')}]`,
        );
        throw new ForbiddenException(
          `Access denied: requires organization role [${requiredRoles.join(', ')}]`,
        );
      }
    }

    request.orgMembership = membership;
    return true;
  }
}
