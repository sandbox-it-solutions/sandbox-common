/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import { CanActivate, ExecutionContext } from '@nestjs/common';
import type { IWorkspaceMembershipChecker } from '../../interfaces/workspace-membership-checker.interface';
export declare class WorkspaceGuard implements CanActivate {
    private readonly membershipChecker?;
    private readonly logger;
    constructor(membershipChecker?: IWorkspaceMembershipChecker | undefined);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
