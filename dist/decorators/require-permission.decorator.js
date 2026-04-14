"use strict";
// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirePermission = exports.PERMISSION_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.PERMISSION_KEY = 'requiredPermission';
const RequirePermission = (area, minAccess = 'read') => (0, common_1.SetMetadata)(exports.PERMISSION_KEY, { area, minAccess });
exports.RequirePermission = RequirePermission;
//# sourceMappingURL=require-permission.decorator.js.map