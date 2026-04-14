// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { FEATURE_FLAG_KEY } from '../../decorators/feature-flag.decorator';

@Injectable()
export class FeatureFlagGuard implements CanActivate {
  private readonly logger = new Logger(FeatureFlagGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const featureName = this.reflector.getAllAndOverride<string>(
      FEATURE_FLAG_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!featureName) return true;

    const envKey = `FEATURE_${featureName.toUpperCase()}`;
    const value = this.configService.get<string>(envKey);

    if (value === 'true' || value === 'preview') {
      this.logger.debug(`Feature '${featureName}' is enabled (${value})`);
      return true;
    }

    this.logger.warn(
      `Feature '${featureName}' not available (${envKey}=${value ?? 'unset'})`,
    );

    throw new HttpException(
      {
        statusCode: 501,
        message: `Feature '${featureName}' is currently not available`,
        feature: featureName,
        status: 'coming_soon',
      },
      HttpStatus.NOT_IMPLEMENTED,
    );
  }
}
