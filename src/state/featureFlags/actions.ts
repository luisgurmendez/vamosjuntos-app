

import { createAction } from '@reduxjs/toolkit';
import { FeatureFlag } from 'types/models';
import { withPayloadType } from '../types';

export const setFeatureFlags = createAction(
  '[FEATURE_FLAG] SET_FEATURE_FLAGS',
  withPayloadType<FeatureFlag[]>()
);

