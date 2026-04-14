// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { OpenFgaClient, CredentialsMethod } from '@openfga/sdk';
import { AccessLevel, ROLE_DEFAULTS } from '../constants/role-defaults';
import { IPermissionChecker } from '../interfaces/permission-checker.interface';

const ACCESS_TO_RELATION: Record<AccessLevel, string> = {
  full: 'full_access',
  partial: 'partial_access',
  read: 'read_access',
  none: 'can_view',
};

const CHECK_RELATIONS: { relation: string; level: AccessLevel }[] = [
  { relation: 'full_access', level: 'full' },
  { relation: 'partial_access', level: 'partial' },
  { relation: 'read_access', level: 'read' },
];

@Injectable()
export class OpenFGAService implements OnModuleInit, IPermissionChecker {
  private readonly logger = new Logger(OpenFGAService.name);
  private client!: OpenFgaClient;

  async onModuleInit(): Promise<void> {
    const apiUrl = process.env.OPENFGA_API_URL || 'http://openfga:8080';
    const storeId = process.env.OPENFGA_STORE_ID;
    const modelId = process.env.OPENFGA_MODEL_ID;

    if (!storeId || !modelId) {
      this.logger.warn(
        'OPENFGA_STORE_ID or OPENFGA_MODEL_ID not set — OpenFGA disabled',
      );
      return;
    }

    this.client = new OpenFgaClient({
      apiUrl,
      storeId,
      authorizationModelId: modelId,
      credentials: { method: CredentialsMethod.None },
    });

    try {
      const model = await this.client.readAuthorizationModel();
      this.logger.log(
        `Connected to OpenFGA store=${storeId} model=${model.authorization_model?.id}`,
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.error(`Failed to connect to OpenFGA: ${message}`);
    }
  }

  get isEnabled(): boolean {
    return !!this.client;
  }

  async check(
    userId: string,
    area: string,
    minAccess: AccessLevel,
  ): Promise<boolean> {
    if (!this.client) return false;

    const relation = ACCESS_TO_RELATION[minAccess];
    if (!relation || minAccess === 'none') return true;

    try {
      const result = await this.client.check({
        user: `user:${userId}`,
        relation,
        object: `area:${area}`,
      });
      return result.allowed ?? false;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.error(
        `OpenFGA check failed: user=${userId} area=${area}: ${message}`,
      );
      return false;
    }
  }

  async resolveAccess(userId: string, area: string): Promise<AccessLevel> {
    if (!this.client) return 'none';

    try {
      for (const { relation, level } of CHECK_RELATIONS) {
        const result = await this.client.check({
          user: `user:${userId}`,
          relation,
          object: `area:${area}`,
        });
        if (result.allowed) return level;
      }
      return 'none';
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.error(
        `OpenFGA resolveAccess failed: user=${userId} area=${area}: ${message}`,
      );
      return 'none';
    }
  }

  async listUserAreas(userId: string): Promise<Record<string, AccessLevel>> {
    if (!this.client) return {};

    const result: Record<string, AccessLevel> = {};

    try {
      for (const { relation, level } of CHECK_RELATIONS) {
        const resp: { objects?: string[] } = await this.client.listObjects({
          user: `user:${userId}`,
          relation,
          type: 'area',
        });

        for (const obj of resp.objects ?? []) {
          const areaSlug = obj.replace('area:', '');
          if (!result[areaSlug]) {
            result[areaSlug] = level;
          }
        }
      }

      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.error(
        `OpenFGA listUserAreas failed: user=${userId}: ${message}`,
      );
      return {};
    }
  }

  async setUserAccess(
    userId: string,
    area: string,
    accessLevel: AccessLevel,
  ): Promise<void> {
    if (!this.client) return;

    await this.removeUserAccess(userId, area);

    if (accessLevel !== 'none') {
      const relation = ACCESS_TO_RELATION[accessLevel];
      await this.client.write({
        writes: [
          {
            user: `user:${userId}`,
            relation,
            object: `area:${area}`,
          },
        ],
      });
    }
  }

  async removeUserAccess(userId: string, area: string): Promise<void> {
    if (!this.client) return;

    for (const { relation } of CHECK_RELATIONS) {
      try {
        await this.client.write({
          deletes: [
            {
              user: `user:${userId}`,
              relation,
              object: `area:${area}`,
            },
          ],
        });
      } catch {
        // Tuple may not exist
      }
    }
  }

  async assignRole(userId: string, role: string): Promise<void> {
    if (!this.client) return;

    await this.client.write({
      writes: [
        {
          user: `user:${userId}`,
          relation: 'member',
          object: `role:${role}`,
        },
      ],
    });
  }

  async removeRole(userId: string, role: string): Promise<void> {
    if (!this.client) return;

    try {
      await this.client.write({
        deletes: [
          {
            user: `user:${userId}`,
            relation: 'member',
            object: `role:${role}`,
          },
        ],
      });
    } catch {
      // Tuple may not exist
    }
  }

  async seedRoleDefaults(): Promise<number> {
    if (!this.client) return 0;

    let count = 0;
    const writes: { user: string; relation: string; object: string }[] = [];

    for (const [role, areas] of Object.entries(ROLE_DEFAULTS)) {
      for (const [area, access] of Object.entries(areas)) {
        if (access === 'none') continue;
        const relation = ACCESS_TO_RELATION[access];
        writes.push({
          user: `role:${role}#member`,
          relation,
          object: `area:${area}`,
        });
        count++;
      }
    }

    const BATCH_SIZE = 100;
    for (let i = 0; i < writes.length; i += BATCH_SIZE) {
      const batch = writes.slice(i, i + BATCH_SIZE);
      await this.client.write({ writes: batch });
    }

    this.logger.log(`Seeded ${count} role default tuples into OpenFGA`);
    return count;
  }

  async setRoleAreaDefault(
    role: string,
    area: string,
    accessLevel: AccessLevel,
  ): Promise<void> {
    if (!this.client) return;

    for (const { relation } of CHECK_RELATIONS) {
      try {
        await this.client.write({
          deletes: [
            {
              user: `role:${role}#member`,
              relation,
              object: `area:${area}`,
            },
          ],
        });
      } catch {
        // Tuple may not exist
      }
    }

    if (accessLevel !== 'none') {
      const relation = ACCESS_TO_RELATION[accessLevel];
      await this.client.write({
        writes: [
          {
            user: `role:${role}#member`,
            relation,
            object: `area:${area}`,
          },
        ],
      });
    }
  }
}
