/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
export type AccessLevel = 'full' | 'read' | 'partial' | 'none';
export type RoleDefaultsMap = Record<string, Record<string, AccessLevel>>;
export declare const ACCESS_HIERARCHY: AccessLevel[];
export declare function meetsAccessLevel(actual: AccessLevel, required: AccessLevel): boolean;
export declare const ROLE_DEFAULTS: RoleDefaultsMap;
export declare function getRoleDefault(role: string, area: string): AccessLevel;
