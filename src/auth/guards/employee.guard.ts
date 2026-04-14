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
  Logger,
} from '@nestjs/common';
import { AuthenticatedRequest } from '../../interfaces/authenticated-request.interface';
import { Roles } from '../../constants/roles';

@Injectable()
export class EmployeeGuard implements CanActivate {
  private readonly logger = new Logger(EmployeeGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    if (!user) {
      this.logger.warn('EmployeeGuard: No user found on request');
      throw new ForbiddenException('Access denied: authentication required');
    }

    const allowed: string[] = [
      Roles.EMPLOYEE,
      Roles.PLATFORM_ADMIN,
      Roles.FOUNDER,
    ];
    if (!allowed.includes(user.role)) {
      this.logger.warn(
        `User ${user.id} with role "${user.role}" denied access. Required: employee+`,
      );
      throw new ForbiddenException(
        'Access denied: requires employee or platform_admin role',
      );
    }

    return true;
  }
}
