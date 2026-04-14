/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import type { IFeatureGateProvider, PlanLimits } from '../interfaces/plan-lookup.interface';
export type { PlanLimits };
export interface OrgWithPlan {
    plan: string;
    id: string;
}
export declare function canAccessFeature(planLookup: IFeatureGateProvider, plan: string, feature: string): boolean;
export declare function hasAvailableSeats(planLookup: IFeatureGateProvider, org: OrgWithPlan, currentMembers: number): boolean;
export declare function getPlanLimits(planLookup: IFeatureGateProvider, planType: string): PlanLimits;
