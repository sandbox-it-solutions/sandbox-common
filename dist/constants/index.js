"use strict";
// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleDefault = exports.ROLE_DEFAULTS = exports.meetsAccessLevel = exports.ACCESS_HIERARCHY = exports.VALID_AREAS = exports.hasMinRole = exports.FOUNDER_ONLY_REPOS = exports.Roles = void 0;
var roles_1 = require("./roles");
Object.defineProperty(exports, "Roles", { enumerable: true, get: function () { return roles_1.Roles; } });
Object.defineProperty(exports, "FOUNDER_ONLY_REPOS", { enumerable: true, get: function () { return roles_1.FOUNDER_ONLY_REPOS; } });
Object.defineProperty(exports, "hasMinRole", { enumerable: true, get: function () { return roles_1.hasMinRole; } });
var permission_areas_1 = require("./permission-areas");
Object.defineProperty(exports, "VALID_AREAS", { enumerable: true, get: function () { return permission_areas_1.VALID_AREAS; } });
var role_defaults_1 = require("./role-defaults");
Object.defineProperty(exports, "ACCESS_HIERARCHY", { enumerable: true, get: function () { return role_defaults_1.ACCESS_HIERARCHY; } });
Object.defineProperty(exports, "meetsAccessLevel", { enumerable: true, get: function () { return role_defaults_1.meetsAccessLevel; } });
Object.defineProperty(exports, "ROLE_DEFAULTS", { enumerable: true, get: function () { return role_defaults_1.ROLE_DEFAULTS; } });
Object.defineProperty(exports, "getRoleDefault", { enumerable: true, get: function () { return role_defaults_1.getRoleDefault; } });
//# sourceMappingURL=index.js.map