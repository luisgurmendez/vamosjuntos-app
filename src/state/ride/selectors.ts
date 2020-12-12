import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "state/types";
import { Ride, RideStatus } from "types/models";

export const getPendingRides = createSelector<AppState, Ride[], Ride[]>(
  state => state.ride.rides,
  rides => {
    return rides.filter(r => r.status === RideStatus.PENDING)
  }
);

export const getCompletedRides = createSelector<AppState, Ride[], Ride[]>(
  state => state.ride.rides,
  rides => {
    return rides.filter(r => r.status === RideStatus.COMPLETED)
  }
);

