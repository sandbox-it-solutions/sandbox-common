// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { SetMetadata } from '@nestjs/common';
import { AccessLevel } from '../constants/role-defaults';

export const PERMISSION_KEY = 'requiredPermission';

export interface RequiredPermission {
  area: string;
  minAccess: AccessLevel;
}

export const RequirePermission = (
  area: string,
  minAccess: AccessLevel = 'read',
) => SetMetadata(PERMISSION_KEY, { area, minAccess } as RequiredPermission);
