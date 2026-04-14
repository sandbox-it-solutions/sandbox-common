// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */

import { SetMetadata } from '@nestjs/common';

export const FEATURE_FLAG_KEY = 'feature_flag';

export const FeatureFlag = (featureName: string) =>
  SetMetadata(FEATURE_FLAG_KEY, featureName);
