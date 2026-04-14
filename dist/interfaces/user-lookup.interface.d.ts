/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
/**
 * Abstraction for user lookup used by auth guards.
 * Each service provides its own implementation backed by its Prisma schema.
 */
export interface IUserLookup {
    findById(id: string): Promise<UserLookupResult | null>;
    findByEmail(email: string): Promise<UserLookupResult | null>;
}
export interface UserLookupResult {
    id: string;
    email: string;
    role: string;
    deletedAt?: Date | null;
    tokenVersion?: number;
}
export declare const USER_LOOKUP: unique symbol;
