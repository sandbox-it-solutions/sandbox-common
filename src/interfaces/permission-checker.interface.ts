// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { AccessLevel } from '../constants/role-defaults';

/**
 * Abstraction for permission resolution used by PermissionGuard.
 * Decouples guards from concrete OpenFGA or Prisma implementations.
 */
export interface IPermissionChecker {
  readonly isEnabled: boolean;
  resolveAccess(userId: string, area: string): Promise<AccessLevel>;
}

export const PERMISSION_CHECKER = Symbol('PERMISSION_CHECKER');
