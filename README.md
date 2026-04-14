# @sandbox-it-solutions/common

Shared NestJS infrastructure for all SandBox microservices.

## What's included

| Category | Exports |
|----------|---------|
| **Guards** | `GlobalAuthGuard`, `RolesGuard`, `PermissionGuard`, `EmployeeGuard`, `FeatureFlagGuard`, `ApiKeyGuard`, `OrgMemberGuard` |
| **Decorators** | `@Public()`, `@CurrentUser()`, `@RolesDecorator()`, `@OrgRoles()`, `@RequirePermission()`, `@FeatureFlag()`, `@EmployeeOnly()` |
| **Interceptors** | `LoggingInterceptor` (CLS + Prometheus), `TransformInterceptor` (response envelope) |
| **Filters** | `HttpExceptionFilter` (standardized error responses) |
| **Pipes** | `SanitizePipe` (XSS protection) |
| **Validators** | `IsStrongPassword` |
| **Modules** | `CacheModule` (Redis/Memory), `QueueModule` (BullMQ/Sync), `OpenFGAModule`, `MetricsModule` |
| **Interfaces** | `ICacheProvider`, `IQueueProvider`, `IPermissionChecker`, `IUserLookup`, `IPermissionStore`, `IOrgMembershipLookup`, `IApiKeyValidator`, `IFeatureGateProvider` |
| **Constants** | `Roles`, `AccessLevel`, `ROLE_DEFAULTS`, `VALID_AREAS` |
| **Services** | `OpenFGAService`, `ThrottlerCacheStorage` |

## Installation

```bash
npm install @sandbox-it-solutions/common
```

## Usage

```typescript
import { Module } from '@nestjs/common';
import {
  CacheModule,
  QueueModule,
  OpenFGAModule,
  MetricsModule,
  GlobalAuthGuard,
  PermissionGuard,
  HttpExceptionFilter,
  LoggingInterceptor,
  TransformInterceptor,
  SanitizePipe,
  USER_LOOKUP,
  PERMISSION_STORE,
} from '@sandbox-it-solutions/common';

@Module({
  imports: [
    CacheModule,       // Auto-selects Redis or Memory
    QueueModule,       // Auto-selects BullMQ or Sync
    OpenFGAModule,     // Zanzibar-based authorization
    MetricsModule,     // /metrics endpoint
  ],
  providers: [
    // Provide your own implementations for these interfaces:
    { provide: USER_LOOKUP, useClass: YourUserLookupService },
    { provide: PERMISSION_STORE, useClass: YourPermissionStoreService },
    // Global guards, filters, interceptors:
    { provide: 'APP_GUARD', useClass: GlobalAuthGuard },
    { provide: 'APP_GUARD', useClass: PermissionGuard },
    { provide: 'APP_FILTER', useClass: HttpExceptionFilter },
    { provide: 'APP_INTERCEPTOR', useClass: TransformInterceptor },
    { provide: 'APP_INTERCEPTOR', useClass: LoggingInterceptor },
    { provide: 'APP_PIPE', useClass: SanitizePipe },
  ],
})
export class AppModule {}
```

## Interface Contracts

Each service must provide implementations for the interfaces it uses:

### `IUserLookup` (required by `GlobalAuthGuard`)
```typescript
@Injectable()
class UserLookupService implements IUserLookup {
  constructor(private prisma: PrismaService) {}
  
  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
```

### `IPermissionStore` (optional, for `PermissionGuard` Prisma fallback)
```typescript
@Injectable()
class PermissionStoreService implements IPermissionStore {
  constructor(private prisma: PrismaService) {}
  
  async findUserPermissions(userId: string) {
    return this.prisma.userPermission.findMany({ where: { userId } });
  }
  
  async createAuditLog(entry: PermissionAuditEntry) {
    await this.prisma.permissionAuditLog.create({ data: entry });
  }
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `REDIS_URL` | No | Redis connection URL (enables Redis cache + BullMQ) |
| `INTERNAL_API_KEY` | No | Service-to-service auth key |
| `OPENFGA_API_URL` | No | OpenFGA server URL |
| `OPENFGA_STORE_ID` | No | OpenFGA store ID |
| `OPENFGA_MODEL_ID` | No | OpenFGA authorization model ID |

## License

MIT © SandBox IT Solutions
