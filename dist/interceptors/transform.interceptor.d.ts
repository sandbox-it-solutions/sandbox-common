/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface TransformedResponse<T> {
    data: T;
    meta: {
        timestamp: string;
    };
}
export declare class TransformInterceptor<T> implements NestInterceptor<T, TransformedResponse<T>> {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<TransformedResponse<T>>;
}
