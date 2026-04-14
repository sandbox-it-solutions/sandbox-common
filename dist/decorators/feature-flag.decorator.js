"use strict";
// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureFlag = exports.FEATURE_FLAG_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.FEATURE_FLAG_KEY = 'feature_flag';
const FeatureFlag = (featureName) => (0, common_1.SetMetadata)(exports.FEATURE_FLAG_KEY, featureName);
exports.FeatureFlag = FeatureFlag;
//# sourceMappingURL=feature-flag.decorator.js.map