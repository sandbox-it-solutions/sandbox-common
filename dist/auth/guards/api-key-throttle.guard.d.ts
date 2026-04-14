/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ICacheProvider } from '../../interfaces/cache-provider.interface';
export declare class ApiKeyThrottleGuard implements CanActivate {
    private readonly config;
    private readonly cache?;
    private readonly logger;
    private readonly maxRequests;
    private readonly windowSeconds;
    constructor(config: ConfigService, cache?: ICacheProvider | undefined);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
