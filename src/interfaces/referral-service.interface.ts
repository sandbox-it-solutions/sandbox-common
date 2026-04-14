// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

export interface IReferralService {
  applyCode(userId: string, code: string): Promise<void>;
}

export const REFERRAL_SERVICE = Symbol('REFERRAL_SERVICE');
