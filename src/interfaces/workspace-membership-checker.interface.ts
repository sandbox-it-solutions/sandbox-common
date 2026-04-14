// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

export interface IWorkspaceMembershipChecker {
  checkMembership(
    workspaceId: string,
    userId: string,
  ): Promise<{ role: string } | null>;
}

export const WORKSPACE_MEMBERSHIP_CHECKER = Symbol(
  'WORKSPACE_MEMBERSHIP_CHECKER',
);
