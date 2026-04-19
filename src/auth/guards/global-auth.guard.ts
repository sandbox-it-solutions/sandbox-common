// @ai-generated — GitHub Copilot (Claude Opus 4.6); modified — Claude Opus 4.7 — task: fix #2 system-user-fallback, prompted by: Jonas
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { ExecutionContext, Inject, Injectable, Logger, Optional, UnauthorizedException } from '@nestjs/common';
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
      if (!this.userLookup) {
        throw new UnauthorizedException(
          'Internal-key path requires a USER_LOOKUP provider',
        );
      }
      const employeeEmail = request.headers['x-employee-email'];
      if (!employeeEmail) {
        throw new UnauthorizedException(
          'Internal-key requests must include X-Employee-Email',
        );
      }
      let dbUser: { id: string; email: string; role: string } | null;
      try {
        dbUser = await this.userLookup.findByEmail(employeeEmail);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        this.logger.error(
          `Failed to resolve employee ${employeeEmail}: ${message}`,
        );
        throw new UnauthorizedException('Employee lookup failed');
      }
      if (!dbUser) {
        this.logger.warn(
          `Internal-key reject: ${employeeEmail} not found in database`,
        );
        throw new UnauthorizedException('Unknown employee');
      }
      request.user = {
        id: dbUser.id,
        email: dbUser.email,
        role: dbUser.role,
      };
      return true;
    }

    try {
      const result = super.canActivate(context);
      if (result instanceof Promise) return await result;
      if (typeof result === 'boolean') return result;
      return new Promise((resolve, reject) => {
        result.subscribe({
          next: (v) => resolve(v),
          error: (e: Error) => reject(e),
        });
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes('Unknown authentication strategy')) {
        this.logger.warn('JWT strategy not registered — rejecting request');
        throw new UnauthorizedException('Authentication required');
      }
      throw err;
    }
  }
}
