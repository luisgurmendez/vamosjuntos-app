import {
  setHasInternetConnection
} from './actions';

import { createReducer } from '@reduxjs/toolkit';

export interface GeneralState {
  hasInternetConnection: boolean;
}

export const initialState: GeneralState = {
  hasInternetConnection: true,
};

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(setHasInternetConnection, (state, action) => {
      state.hasInternetConnection = action.payload;
    })

  return builder;
});
