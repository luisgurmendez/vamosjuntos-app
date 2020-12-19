import {
  setHasInternetConnection
} from './actions';

import { createReducer } from '@reduxjs/toolkit';
import { FeatureFlag } from 'types/models';

export interface GeneralState {
  hasInternetConnection: boolean;
  featureFlags: FeatureFlag[]
}

export const initialState: GeneralState = {
  hasInternetConnection: true,
  featureFlags: []
};

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(setHasInternetConnection, (state, action) => {
      state.hasInternetConnection = action.payload;
    })

  return builder;
});
