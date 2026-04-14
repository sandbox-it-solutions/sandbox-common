/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import { CanActivate, ExecutionContext } from '@nestjs/common';
import type { IApiKeyValidator } from '../../interfaces/api-key-validator.interface';
export declare class ApiKeyGuard implements CanActivate {
    private readonly apiKeyValidator;
    constructor(apiKeyValidator: IApiKeyValidator);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
