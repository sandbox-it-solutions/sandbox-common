/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { ICacheProvider } from '../../interfaces/cache-provider.interface';
import type { IPermissionChecker } from '../../interfaces/permission-checker.interface';
import type { IPermissionStore } from '../../interfaces/permission-store.interface';
import { AccessLevel } from '../../constants/role-defaults';
export interface CachedPermission {
    area: string;
    access: AccessLevel;
}
export declare class PermissionGuard implements CanActivate {
    private readonly reflector;
    private readonly cache;
    private readonly permissionChecker;
    private readonly permissionStore?;
    private readonly logger;
    constructor(reflector: Reflector, cache: ICacheProvider, permissionChecker: IPermissionChecker, permissionStore?: IPermissionStore | undefined);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private logAudit;
    private resolveAccess;
    private getCachedPermissions;
    static cacheKey(userId: string): string;
}
