/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
export interface IReferralService {
    applyCode(userId: string, code: string): Promise<void>;
}
export declare const REFERRAL_SERVICE: unique symbol;
