/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClsService } from 'nestjs-cls';
import { Histogram, Counter } from 'prom-client';
export declare const httpRequestDuration: Histogram<"method" | "route" | "status_code">;
export declare const httpRequestTotal: Counter<"method" | "route" | "status_code">;
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly cls?;
    private readonly logger;
    constructor(cls?: ClsService | undefined);
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown>;
}
