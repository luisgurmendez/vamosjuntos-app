import {
  addRideRequest,
  removeRideRequest,
  setRideRequests,
  setRides
} from './actions';
import { createReducer } from '@reduxjs/toolkit';
import { Ride, RideRequest } from 'types/models';

export interface RideState {
  rides: Ride[];
  rideRequests: RideRequest[];
}

export const initialState: RideState = {
  rides: [],
  rideRequests: []
};

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(setRides, (state, action) => {
      state.rides = action.payload;
    })
    .addCase(setRideRequests, (state, action) => {
      state.rideRequests = action.payload;
    })
    .addCase(removeRideRequest, (state, action) => {
      state.rideRequests = state.rideRequests.filter(rr => rr.id !== action.payload)
    })
    .addCase(addRideRequest, (state, action) => {
      state.rideRequests = [...state.rideRequests, action.payload]
    })

  return builder;
});
