// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { Global, Module } from '@nestjs/common';
import { OpenFGAService } from './openfga.service';
import { PERMISSION_CHECKER } from '../interfaces/permission-checker.interface';

@Global()
@Module({
  providers: [
    OpenFGAService,
    {
      provide: PERMISSION_CHECKER,
      useExisting: OpenFGAService,
    },
  ],
  exports: [OpenFGAService, PERMISSION_CHECKER],
})
export class OpenFGAModule {}
