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
  Optional,
  Logger,
} from '@nestjs/common';

import { AuthenticatedRequest } from '../../interfaces/authenticated-request.interface';
import type { IWorkspaceMembershipChecker } from '../../interfaces/workspace-membership-checker.interface';
import { WORKSPACE_MEMBERSHIP_CHECKER } from '../../interfaces/workspace-membership-checker.interface';
import { Roles } from '../../constants/roles';

@Injectable()
export class WorkspaceGuard implements CanActivate {
  private readonly logger = new Logger(WorkspaceGuard.name);

  constructor(
    @Optional()
    @Inject(WORKSPACE_MEMBERSHIP_CHECKER)
    private readonly membershipChecker?: IWorkspaceMembershipChecker,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Access denied: authentication required');
    }

    const workspaceId = (request.params.workspaceId || request.params.id) as
      | string
      | undefined;

    if (!workspaceId) return true;

    if (user.role === Roles.PLATFORM_ADMIN) return true;

    if (!this.membershipChecker) {
      this.logger.warn('WorkspaceGuard: no membership checker — DMS module not loaded');
      throw new ForbiddenException('Workspace operations are handled by the DMS API');
    }

    const membership = await this.membershipChecker.checkMembership(
      workspaceId,
      user.id,
    );

    if (!membership) {
      this.logger.warn(
        `User ${user.id} denied access to workspace ${workspaceId}: not a member`,
      );
      throw new ForbiddenException(
        'Access denied: you are not a member of this workspace',
      );
    }

    request.workspaceMembership = membership;
    return true;
  }
}
