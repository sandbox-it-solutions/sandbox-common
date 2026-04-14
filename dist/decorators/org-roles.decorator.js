"use strict";
// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgRoles = exports.ORG_ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ORG_ROLES_KEY = 'orgRoles';
const OrgRoles = (...roles) => (0, common_1.SetMetadata)(exports.ORG_ROLES_KEY, roles);
exports.OrgRoles = OrgRoles;
//# sourceMappingURL=org-roles.decorator.js.map