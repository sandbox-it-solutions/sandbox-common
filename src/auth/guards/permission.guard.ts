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
import type { ICacheProvider } from '../../interfaces/cache-provider.interface';
import { CACHE_PROVIDER } from '../../interfaces/cache-provider.interface';
import type { IPermissionChecker } from '../../interfaces/permission-checker.interface';
import { PERMISSION_CHECKER } from '../../interfaces/permission-checker.interface';
import type { IPermissionStore } from '../../interfaces/permission-store.interface';
import { PERMISSION_STORE } from '../../interfaces/permission-store.interface';
import { AuthenticatedRequest } from '../../interfaces/authenticated-request.interface';
import {
  PERMISSION_KEY,
  RequiredPermission,
} from '../../decorators/require-permission.decorator';
import { IS_PUBLIC_KEY } from '../../decorators/public.decorator';
import {
  AccessLevel,
  getRoleDefault,
  meetsAccessLevel,
} from '../../constants/role-defaults';
import { Roles } from '../../constants/roles';

const PERMISSION_CACHE_TTL = 300;
const CACHE_PREFIX = 'perm:';

export interface CachedPermission {
  area: string;
  access: AccessLevel;
}

@Injectable()
export class PermissionGuard implements CanActivate {
  private readonly logger = new Logger(PermissionGuard.name);

  constructor(
    private readonly reflector: Reflector,
    @Inject(CACHE_PROVIDER) private readonly cache: ICacheProvider,
    @Inject(PERMISSION_CHECKER)
    private readonly permissionChecker: IPermissionChecker,
    @Optional()
    @Inject(PERMISSION_STORE)
    private readonly permissionStore?: IPermissionStore,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const required = this.reflector.getAllAndOverride<RequiredPermission>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!required) return true;

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    if (!user) return true;

    // Founders bypass all permission checks
    if (user.role === Roles.FOUNDER) {
      this.logAudit(
        user.id,
        user.role,
        required.area,
        required.minAccess,
        'full' as AccessLevel,
        true,
        `${request.method} ${request.originalUrl || request.url}`,
        (request.headers?.['x-forwarded-for'] as string) ||
          (request.headers?.['x-real-ip'] as string) ||
          request.ip,
      );
      return true;
    }

    const effectiveAccess = await this.resolveAccess(
      user.id,
      user.role,
      required.area,
    );

    const granted = meetsAccessLevel(effectiveAccess, required.minAccess);
    const endpoint = `${request.method} ${request.originalUrl || request.url}`;

    this.logAudit(
      user.id,
      user.role,
      required.area,
      required.minAccess,
      effectiveAccess,
      granted,
      endpoint,
      (request.headers?.['x-forwarded-for'] as string) ||
        (request.headers?.['x-real-ip'] as string) ||
        request.ip,
    );

    if (!granted) {
      this.logger.warn(
        `Permission denied: user=${user.id} role=${user.role} area=${required.area} ` +
          `has=${effectiveAccess} needs=${required.minAccess} endpoint=${endpoint}`,
      );
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }

  private logAudit(
    userId: string,
    role: string,
    area: string,
    required: string,
    actual: string,
    granted: boolean,
    endpoint: string,
    ipAddress?: string,
  ): void {
    if (granted && role !== Roles.FOUNDER && Math.random() > 0.1) return;

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
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : String(err);
          this.logger.error(`Audit log failed: ${message}`);
        });
    }
  }

  private async resolveAccess(
    userId: string,
    role: string,
    area: string,
  ): Promise<AccessLevel> {
    // Primary: OpenFGA
    if (this.permissionChecker.isEnabled) {
      try {
        const access = await this.permissionChecker.resolveAccess(userId, area);
        if (access !== 'none') return access;
        return 'none';
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        this.logger.warn(
          `OpenFGA check failed, falling back to store: ${message}`,
        );
      }
    }

    // Fallback: cached store permissions + role defaults
    if (this.permissionStore) {
      const overrides = await this.getCachedPermissions(userId);
      const override = overrides.find((p) => p.area === area);
      if (override) return override.access;
    }

    return getRoleDefault(role, area);
  }

  private async getCachedPermissions(
    userId: string,
  ): Promise<CachedPermission[]> {
    const cacheKey = `${CACHE_PREFIX}${userId}`;

    try {
      const cached = await this.cache.get<string>(cacheKey);
      if (cached) {
        return JSON.parse(cached) as CachedPermission[];
      }
    } catch {
      // Cache miss or parse error
    }

    if (!this.permissionStore) return [];

    const dbPermissions =
      await this.permissionStore.findUserPermissions(userId);

    const permissions: CachedPermission[] = dbPermissions.map((p) => ({
      area: p.area,
      access: p.access as AccessLevel,
    }));

    try {
      await this.cache.set(
        cacheKey,
        JSON.stringify(permissions),
        PERMISSION_CACHE_TTL,
      );
    } catch {
      // Non-critical
    }

    return permissions;
  }

  static cacheKey(userId: string): string {
    return `${CACHE_PREFIX}${userId}`;
  }
}
