/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
/**
 * User role constants.
 * Hierarchy: FOUNDER > PLATFORM_ADMIN > EMPLOYEE > CUSTOMER
 */
export declare const Roles: {
    readonly FOUNDER: "founder";
    readonly PLATFORM_ADMIN: "platform_admin";
    readonly EMPLOYEE: "employee";
    readonly CUSTOMER: "customer";
};
export type Role = (typeof Roles)[keyof typeof Roles];
export declare const FOUNDER_ONLY_REPOS: readonly ["sandbox-infrastructure", "sandbox-founder"];
export declare function hasMinRole(userRole: string, requiredRole: string): boolean;
