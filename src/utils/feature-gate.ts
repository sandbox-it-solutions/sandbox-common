// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import type {
  IFeatureGateProvider,
  PlanLimits,
} from '../interfaces/plan-lookup.interface';

export type { PlanLimits };

export interface OrgWithPlan {
  plan: string;
  id: string;
}

export function canAccessFeature(
  planLookup: IFeatureGateProvider,
  plan: string,
  feature: string,
): boolean {
  const planConfig = planLookup.getPlanLimits(plan);
  if (!planConfig) return false;
  return planConfig.features.includes(feature);
}

export function hasAvailableSeats(
  planLookup: IFeatureGateProvider,
  org: OrgWithPlan,
  currentMembers: number,
): boolean {
  const limits = getPlanLimits(planLookup, org.plan);
  return currentMembers < limits.maxSeats;
}

export function getPlanLimits(
  planLookup: IFeatureGateProvider,
  planType: string,
): PlanLimits {
  const planConfig = planLookup.getPlanLimits(planType);
  if (!planConfig) {
    return { ...planLookup.getDefaultPlanLimits() };
  }
  return { ...planConfig };
}
