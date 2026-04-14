"use strict";
// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FeatureFlagGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureFlagGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const feature_flag_decorator_1 = require("../../decorators/feature-flag.decorator");
let FeatureFlagGuard = FeatureFlagGuard_1 = class FeatureFlagGuard {
    reflector;
    configService;
    logger = new common_1.Logger(FeatureFlagGuard_1.name);
    constructor(reflector, configService) {
        this.reflector = reflector;
        this.configService = configService;
    }
    canActivate(context) {
        const featureName = this.reflector.getAllAndOverride(feature_flag_decorator_1.FEATURE_FLAG_KEY, [context.getHandler(), context.getClass()]);
        if (!featureName)
            return true;
        const envKey = `FEATURE_${featureName.toUpperCase()}`;
        const value = this.configService.get(envKey);
        if (value === 'true' || value === 'preview') {
            this.logger.debug(`Feature '${featureName}' is enabled (${value})`);
            return true;
        }
        this.logger.warn(`Feature '${featureName}' not available (${envKey}=${value ?? 'unset'})`);
        throw new common_1.HttpException({
            statusCode: 501,
            message: `Feature '${featureName}' is currently not available`,
            feature: featureName,
            status: 'coming_soon',
        }, common_1.HttpStatus.NOT_IMPLEMENTED);
    }
};
exports.FeatureFlagGuard = FeatureFlagGuard;
exports.FeatureFlagGuard = FeatureFlagGuard = FeatureFlagGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        config_1.ConfigService])
], FeatureFlagGuard);
//# sourceMappingURL=feature-flag.guard.js.map