/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { IUserLookup } from '../../interfaces/user-lookup.interface';
declare const GlobalAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GlobalAuthGuard extends GlobalAuthGuard_base {
    private reflector;
    private userLookup?;
    private readonly logger;
    constructor(reflector: Reflector, userLookup?: IUserLookup | undefined);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
