"use strict";
// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOUNDER_ONLY_REPOS = exports.Roles = void 0;
exports.hasMinRole = hasMinRole;
/**
 * User role constants.
 * Hierarchy: FOUNDER > PLATFORM_ADMIN > EMPLOYEE > CUSTOMER
 */
exports.Roles = {
    FOUNDER: 'founder',
    PLATFORM_ADMIN: 'platform_admin',
    EMPLOYEE: 'employee',
    CUSTOMER: 'customer',
};
exports.FOUNDER_ONLY_REPOS = [
    'sandbox-infrastructure',
    'sandbox-founder',
];
function hasMinRole(userRole, requiredRole) {
    const hierarchy = [
        exports.Roles.CUSTOMER,
        exports.Roles.EMPLOYEE,
        exports.Roles.PLATFORM_ADMIN,
        exports.Roles.FOUNDER,
    ];
    return hierarchy.indexOf(userRole) >= hierarchy.indexOf(requiredRole);
}
//# sourceMappingURL=roles.js.map