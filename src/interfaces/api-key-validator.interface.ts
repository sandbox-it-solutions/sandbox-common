// @ai-generated — GitHub Copilot (Claude Opus 4.6)
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

export const API_KEY_VALIDATOR = Symbol('API_KEY_VALIDATOR');
