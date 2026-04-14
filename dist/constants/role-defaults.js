"use strict";
// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_DEFAULTS = exports.ACCESS_HIERARCHY = void 0;
exports.meetsAccessLevel = meetsAccessLevel;
exports.getRoleDefault = getRoleDefault;
const permission_areas_1 = require("./permission-areas");
exports.ACCESS_HIERARCHY = [
    'none',
    'partial',
    'read',
    'full',
];
function meetsAccessLevel(actual, required) {
    return exports.ACCESS_HIERARCHY.indexOf(actual) >= exports.ACCESS_HIERARCHY.indexOf(required);
}
exports.ROLE_DEFAULTS = {
    founder: Object.fromEntries([...permission_areas_1.VALID_AREAS].map((area) => [area, 'full'])),
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
        'grafana-dashboards': 'read',
        'grafana-alerting': 'read',
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
function getRoleDefault(role, area) {
    return exports.ROLE_DEFAULTS[role]?.[area] ?? 'none';
}
//# sourceMappingURL=role-defaults.js.map