import {
  setFeatureFlags
} from './actions';
import { createReducer } from '@reduxjs/toolkit';
import { FeatureFlag } from 'types/models';

export type MappedFeatureFlag = { [ffName: string]: boolean };

export interface FeatureFlagsState {
  featureFlags: MappedFeatureFlag;
}

export const initialState: FeatureFlagsState = {
  featureFlags: {},
};

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(setFeatureFlags, (state, action) => {
      const featureFlagMaps: MappedFeatureFlag = {};
      action.payload.forEach(fFlag => {
        featureFlagMaps[fFlag.name] = fFlag.enabled;
      })
      state.featureFlags = featureFlagMaps;
    })

  return builder;
});

