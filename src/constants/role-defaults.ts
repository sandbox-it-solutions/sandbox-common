// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { VALID_AREAS } from './permission-areas';

export type AccessLevel = 'full' | 'read' | 'partial' | 'none';

export type RoleDefaultsMap = Record<string, Record<string, AccessLevel>>;

export const ACCESS_HIERARCHY: AccessLevel[] = [
  'none',
  'partial',
  'read',
  'full',
];

export function meetsAccessLevel(
  actual: AccessLevel,
  required: AccessLevel,
): boolean {
  return ACCESS_HIERARCHY.indexOf(actual) >= ACCESS_HIERARCHY.indexOf(required);
}

export const ROLE_DEFAULTS: RoleDefaultsMap = {
  founder: Object.fromEntries(
    [...VALID_AREAS].map((area) => [area, 'full' as AccessLevel]),
  ),

  platform_admin: {
    'admin-dashboard': 'full',
    customers: 'full',
    analytics: 'full',
    status: 'full',
    compliance: 'full',
    audit: 'read',
    'emp-dashboard': 'full',
    'review-queue': 'full',
    verification: 'full',
    provenance: 'full',
    'gdpr-export': 'read',
    products: 'read',
    'billing-portal': 'read',
    licenses: 'read',
    'developer-api': 'read',
    'customer-portal': 'read',
    onboarding: 'read',
    'prometheus-metrics': 'read',
    'prometheus-alerts': 'read',
    'uptime-monitors': 'read',
    'uptime-status': 'read',
    'fail2ban-logs': 'read',
    'portainer-stacks': 'read',
    'portainer-containers': 'read',
  },

  employee: {
    'emp-dashboard': 'full',
    'review-queue': 'full',
    verification: 'full',
    provenance: 'read',
    'gdpr-export': 'full',
  },

  customer: {
    'customer-portal': 'full',
    'billing-portal': 'full',
    licenses: 'full',
    'developer-api': 'full',
    onboarding: 'full',
    products: 'read',
  },
};

export function getRoleDefault(role: string, area: string): AccessLevel {
  return ROLE_DEFAULTS[role]?.[area] ?? 'none';
}
