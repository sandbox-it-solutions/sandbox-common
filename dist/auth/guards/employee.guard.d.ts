/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class EmployeeGuard implements CanActivate {
    private readonly logger;
    canActivate(context: ExecutionContext): boolean;
}
