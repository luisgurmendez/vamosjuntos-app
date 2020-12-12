import {
  setRides
} from './actions';
import { createReducer } from '@reduxjs/toolkit';
import { Ride } from 'types/models';

export interface RideState {
  rides: Ride[];
}

export const initialState: RideState = {
  rides: [],
};

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(setRides, (state, action) => {
      state.rides = action.payload;
    })

  return builder;
});
