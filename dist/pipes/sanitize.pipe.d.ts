/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class SanitizePipe implements PipeTransform {
    private readonly dangerousPatterns;
    transform(value: unknown, metadata: ArgumentMetadata): unknown;
    private sanitizeObject;
    private sanitizeString;
}
