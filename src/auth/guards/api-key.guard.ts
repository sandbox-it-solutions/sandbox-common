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
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { AuthenticatedRequest } from '../../interfaces/authenticated-request.interface';
import type { IApiKeyValidator } from '../../interfaces/api-key-validator.interface';
import { API_KEY_VALIDATOR } from '../../interfaces/api-key-validator.interface';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(API_KEY_VALIDATOR)
    private readonly apiKeyValidator: IApiKeyValidator,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const apiKey = request.headers['x-api-key'] as string | undefined;

    if (!apiKey) return true;

    const result = await this.apiKeyValidator.validateApiKey(apiKey);
    if (!result) {
      throw new UnauthorizedException('Invalid or revoked API key');
    }

    request.apiKeyAuth = {
      userId: result.userId,
      scopes: result.scopes,
    };

    return true;
  }
}
