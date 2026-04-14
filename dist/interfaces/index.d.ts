/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
export { AuthenticatedUser, AuthenticatedRequest, } from './authenticated-request.interface';
export { ICacheProvider, CACHE_PROVIDER } from './cache-provider.interface';
export { IQueueProvider, QueueJobOptions, QUEUE_PROVIDER, } from './queue-provider.interface';
export { IPermissionChecker, PERMISSION_CHECKER, } from './permission-checker.interface';
export { IApiKeyValidator, ApiKeyPayload, API_KEY_VALIDATOR, } from './api-key-validator.interface';
export { IFeatureGateProvider, PlanLimits, FEATURE_GATE_PROVIDER, IPlanLookup, PLAN_LOOKUP, } from './plan-lookup.interface';
export { IWorkspaceMembershipChecker, WORKSPACE_MEMBERSHIP_CHECKER, } from './workspace-membership-checker.interface';
export { IReferralService, REFERRAL_SERVICE } from './referral-service.interface';
export { IUserLookup, UserLookupResult, USER_LOOKUP, } from './user-lookup.interface';
export { IPermissionStore, PermissionAuditEntry, PERMISSION_STORE, } from './permission-store.interface';
export { IOrgMembershipLookup, ORG_MEMBERSHIP_LOOKUP, } from './org-membership-lookup.interface';
