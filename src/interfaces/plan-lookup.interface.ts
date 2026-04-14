// @ai-generated — GitHub Copilot (Claude Opus 4.6)
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

export const FEATURE_GATE_PROVIDER = Symbol('FEATURE_GATE_PROVIDER');

/** @deprecated Use IFeatureGateProvider instead. */
export type IPlanLookup = IFeatureGateProvider;
/** @deprecated Use FEATURE_GATE_PROVIDER instead. */
export const PLAN_LOOKUP = FEATURE_GATE_PROVIDER;
