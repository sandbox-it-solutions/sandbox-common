// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { AccessLevel } from '../constants/role-defaults';

/**
 * Abstraction for permission storage (Prisma fallback when OpenFGA is down).
 * Each service provides its own implementation.
 */
export interface IPermissionStore {
  findUserPermissions(
    userId: string,
  ): Promise<Array<{ area: string; access: AccessLevel }>>;

  createAuditLog(entry: PermissionAuditEntry): Promise<void>;
}

export interface PermissionAuditEntry {
  userId: string;
  role: string;
  area: string;
  required: string;
  actual: string;
  granted: boolean;
  endpoint: string;
  ipAddress?: string;
}

export const PERMISSION_STORE = Symbol('PERMISSION_STORE');
