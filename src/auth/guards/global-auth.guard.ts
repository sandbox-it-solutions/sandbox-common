// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { ExecutionContext, Inject, Injectable, Logger, Optional } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../decorators/public.decorator';
import type { IUserLookup } from '../../interfaces/user-lookup.interface';
import { USER_LOOKUP } from '../../interfaces/user-lookup.interface';

@Injectable()
export class GlobalAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(GlobalAuthGuard.name);

  constructor(
    private reflector: Reflector,
    @Optional() @Inject(USER_LOOKUP) private userLookup?: IUserLookup,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string | undefined>;
      user?: { id: string; email: string; role: string };
    }>();
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
          this.logger.warn(
            `Employee email ${employeeEmail} not found, using system user`,
          );
        } catch (err: unknown) {
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

    const result = super.canActivate(context);
    if (result instanceof Promise) return result;
    if (typeof result === 'boolean') return result;
    return new Promise((resolve, reject) => {
      result.subscribe({
        next: (v) => resolve(v),
        error: (e: Error) => reject(e),
      });
    });
  }
}
