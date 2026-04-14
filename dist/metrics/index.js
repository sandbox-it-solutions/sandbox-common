"use strict";
// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsConnectionsTotal = exports.authAttemptsTotal = exports.httpRequestTotal = exports.httpRequestDuration = exports.MetricsController = exports.MetricsModule = void 0;
var metrics_module_1 = require("./metrics.module");
Object.defineProperty(exports, "MetricsModule", { enumerable: true, get: function () { return metrics_module_1.MetricsModule; } });
var metrics_controller_1 = require("./metrics.controller");
Object.defineProperty(exports, "MetricsController", { enumerable: true, get: function () { return metrics_controller_1.MetricsController; } });
Object.defineProperty(exports, "httpRequestDuration", { enumerable: true, get: function () { return metrics_controller_1.httpRequestDuration; } });
Object.defineProperty(exports, "httpRequestTotal", { enumerable: true, get: function () { return metrics_controller_1.httpRequestTotal; } });
Object.defineProperty(exports, "authAttemptsTotal", { enumerable: true, get: function () { return metrics_controller_1.authAttemptsTotal; } });
Object.defineProperty(exports, "wsConnectionsTotal", { enumerable: true, get: function () { return metrics_controller_1.wsConnectionsTotal; } });
//# sourceMappingURL=index.js.map