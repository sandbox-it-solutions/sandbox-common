/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import { AccessLevel } from '../constants/role-defaults';
export declare const PERMISSION_KEY = "requiredPermission";
export interface RequiredPermission {
    area: string;
    minAccess: AccessLevel;
}
export declare const RequirePermission: (area: string, minAccess?: AccessLevel) => import("@nestjs/common").CustomDecorator<string>;
