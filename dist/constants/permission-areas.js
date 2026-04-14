"use strict";
// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALID_AREAS = void 0;
/**
 * Canonical list of all permission areas in the platform.
 * Shared across all services for consistent authorization.
 */
exports.VALID_AREAS = [
    // Management
    'founder-dashboard',
    'revenue',
    'iam',
    'founders-mgmt',
    'settings',
    'governance',
    'infrastructure',
    // Platform Ops
    'admin-dashboard',
    'customers',
    'analytics',
    'status',
    'compliance',
    'audit',
    // Employee Portal
    'emp-dashboard',
    'review-queue',
    'verification',
    'provenance',
    'gdpr-export',
    // Sales
    'products',
    'billing-portal',
    'licenses',
    'developer-api',
    // Customer Success
    'customer-portal',
    'onboarding',
    // Monitoring
    'grafana-dashboards',
    'grafana-alerting',
    'grafana-datasources',
    'uptime-monitors',
    'uptime-status',
    'uptime-notifications',
    // Security
    'fail2ban-jails',
    'fail2ban-bans',
    'fail2ban-logs',
    // Infrastructure
    'portainer-stacks',
    'portainer-containers',
    'portainer-registry',
];
//# sourceMappingURL=permission-areas.js.map