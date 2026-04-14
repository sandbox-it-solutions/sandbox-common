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
    findMembership(organizationId: string, userId: string): Promise<{
        role: string;
    } | null>;
}
export declare const ORG_MEMBERSHIP_LOOKUP: unique symbol;
