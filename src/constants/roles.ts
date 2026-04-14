// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

/**
 * User role constants.
 * Hierarchy: FOUNDER > PLATFORM_ADMIN > EMPLOYEE > CUSTOMER
 */
export const Roles = {
  FOUNDER: 'founder',
  PLATFORM_ADMIN: 'platform_admin',
  EMPLOYEE: 'employee',
  CUSTOMER: 'customer',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export const FOUNDER_ONLY_REPOS = [
  'sandbox-infrastructure',
  'sandbox-founder',
] as const;

export function hasMinRole(userRole: string, requiredRole: string): boolean {
  const hierarchy: string[] = [
    Roles.CUSTOMER,
    Roles.EMPLOYEE,
    Roles.PLATFORM_ADMIN,
    Roles.FOUNDER,
  ];
  return hierarchy.indexOf(userRole) >= hierarchy.indexOf(requiredRole);
}
