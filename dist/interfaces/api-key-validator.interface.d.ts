/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
export interface ApiKeyPayload {
    userId: string;
    scopes: string[];
}
export interface IApiKeyValidator {
    validateApiKey(rawKey: string): Promise<ApiKeyPayload | null>;
}
export declare const API_KEY_VALIDATOR: unique symbol;
