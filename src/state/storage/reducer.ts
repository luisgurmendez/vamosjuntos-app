import {
  setAddresses,
  setHasMadeASearch,
  setShouldWelcome,
  setShowCanceledRides,
  setShowCompletedRides,
  setShowSeenNotifications
} from './actions';
import { init } from './thunkActions';
import { createReducer } from '@reduxjs/toolkit';
import { StorageState } from './types';

export const initialState: StorageState = {
  inited: false,
  isInitializing: false,
  addresses: [],
  shouldWelcome: false,
  showCanceledRides: false,
  showCompletedRides: false,
  showSeenNotifications: false,
  hasMadeASearch: false,
};

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(init.pending, state => {
      state.isInitializing = true;
    })
    .addCase(init.fulfilled, state => {
      state.isInitializing = false;
      state.inited = true
    })
    .addCase(init.rejected, state => {
      state.isInitializing = false;
      state.inited = false
    })
    .addCase(setAddresses, (state, action) => {
      state.addresses = action.payload;
    })
    .addCase(setShouldWelcome, (state, action) => {
      state.shouldWelcome = action.payload;
    })
    .addCase(setShowCanceledRides, (state, action) => {
      state.showCanceledRides = action.payload;
    })
    .addCase(setShowCompletedRides, (state, action) => {
      state.showCompletedRides = action.payload;
    })
    .addCase(setShowSeenNotifications, (state, action) => {
      state.showSeenNotifications = action.payload;
    })
    .addCase(setHasMadeASearch, (state, action) => {
      console.log('REDUCER!', action);
      state.hasMadeASearch = action.payload;
    })
  return builder;
});




