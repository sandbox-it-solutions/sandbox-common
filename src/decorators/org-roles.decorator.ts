// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { SetMetadata } from '@nestjs/common';

export const ORG_ROLES_KEY = 'orgRoles';

export const OrgRoles = (...roles: string[]) =>
  SetMetadata(ORG_ROLES_KEY, roles);
