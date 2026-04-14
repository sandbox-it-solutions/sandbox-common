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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenFGAModule = void 0;
const common_1 = require("@nestjs/common");
const openfga_service_1 = require("./openfga.service");
const permission_checker_interface_1 = require("../interfaces/permission-checker.interface");
let OpenFGAModule = class OpenFGAModule {
};
exports.OpenFGAModule = OpenFGAModule;
exports.OpenFGAModule = OpenFGAModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            openfga_service_1.OpenFGAService,
            {
                provide: permission_checker_interface_1.PERMISSION_CHECKER,
                useExisting: openfga_service_1.OpenFGAService,
            },
        ],
        exports: [openfga_service_1.OpenFGAService, permission_checker_interface_1.PERMISSION_CHECKER],
    })
], OpenFGAModule);
//# sourceMappingURL=openfga.module.js.map