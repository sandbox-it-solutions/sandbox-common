// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { Request } from 'express';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
  name?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
  correlationId?: string;
  apiKeyAuth?: {
    userId: string;
    scopes: string[];
  };
  orgMembership?: unknown;
  workspaceMembership?: unknown;
}
