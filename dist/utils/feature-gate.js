"use strict";
// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.canAccessFeature = canAccessFeature;
exports.hasAvailableSeats = hasAvailableSeats;
exports.getPlanLimits = getPlanLimits;
function canAccessFeature(planLookup, plan, feature) {
    const planConfig = planLookup.getPlanLimits(plan);
    if (!planConfig)
        return false;
    return planConfig.features.includes(feature);
}
function hasAvailableSeats(planLookup, org, currentMembers) {
    const limits = getPlanLimits(planLookup, org.plan);
    return currentMembers < limits.maxSeats;
}
function getPlanLimits(planLookup, planType) {
    const planConfig = planLookup.getPlanLimits(planType);
    if (!planConfig) {
        return { ...planLookup.getDefaultPlanLimits() };
    }
    return { ...planConfig };
}
//# sourceMappingURL=feature-gate.js.map