/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import { OnModuleInit } from '@nestjs/common';
import { AccessLevel } from '../constants/role-defaults';
import { IPermissionChecker } from '../interfaces/permission-checker.interface';
export declare class OpenFGAService implements OnModuleInit, IPermissionChecker {
    private readonly logger;
    private client;
    onModuleInit(): Promise<void>;
    get isEnabled(): boolean;
    check(userId: string, area: string, minAccess: AccessLevel): Promise<boolean>;
    resolveAccess(userId: string, area: string): Promise<AccessLevel>;
    listUserAreas(userId: string): Promise<Record<string, AccessLevel>>;
    setUserAccess(userId: string, area: string, accessLevel: AccessLevel): Promise<void>;
    removeUserAccess(userId: string, area: string): Promise<void>;
    assignRole(userId: string, role: string): Promise<void>;
    removeRole(userId: string, role: string): Promise<void>;
    seedRoleDefaults(): Promise<number>;
    setRoleAreaDefault(role: string, area: string, accessLevel: AccessLevel): Promise<void>;
}
