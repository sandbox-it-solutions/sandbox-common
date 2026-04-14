// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

/**
 * Abstraction for org membership lookup used by OrgMemberGuard.
 * Each service provides its own implementation.
 */
export interface IOrgMembershipLookup {
  findMembership(
    organizationId: string,
    userId: string,
  ): Promise<{ role: string } | null>;
}

export const ORG_MEMBERSHIP_LOOKUP = Symbol('ORG_MEMBERSHIP_LOOKUP');
