/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import { Counter, Histogram } from 'prom-client';
export declare const httpRequestDuration: Histogram<"method" | "route" | "status_code">;
export declare const httpRequestTotal: Counter<"method" | "route" | "status_code">;
export declare const authAttemptsTotal: Counter<"method" | "status">;
export declare const wsConnectionsTotal: Counter<"namespace">;
export declare class MetricsController {
    getMetrics(): Promise<string>;
}
