/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
export interface PlanLimits {
    name: string;
    maxSeats: number;
    maxStorageGb: number;
    features: string[];
}
export interface IFeatureGateProvider {
    getPlanLimits(planId: string): PlanLimits | undefined;
    getDefaultPlanLimits(): PlanLimits;
}
export declare const FEATURE_GATE_PROVIDER: unique symbol;
/** @deprecated Use IFeatureGateProvider instead. */
export type IPlanLookup = IFeatureGateProvider;
/** @deprecated Use FEATURE_GATE_PROVIDER instead. */
export declare const PLAN_LOOKUP: symbol;
