/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { IOrgMembershipLookup } from '../../interfaces/org-membership-lookup.interface';
export declare class OrgMemberGuard implements CanActivate {
    private readonly reflector;
    private readonly orgLookup?;
    private readonly logger;
    constructor(reflector: Reflector, orgLookup?: IOrgMembershipLookup | undefined);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
