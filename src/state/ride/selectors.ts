import { createSelector } from "@reduxjs/toolkit";
import moment from "moment";
import { AppState } from "state/types";
import { Ride, RideRequest, RideRequestStatus, RideStatus } from "types/models";

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

export const getCanceledRides = createSelector<AppState, Ride[], Ride[]>(
  state => state.ride.rides,
  rides => {
    return rides.filter(r => r.status === RideStatus.CANCELED)
  }
);

export const getPendingRidesWithPassedDates = createSelector<AppState, Ride[], Ride[]>(
  state => state.ride.rides,
  rides => {
    return rides.filter(r => {
      const hasAlreadyPass = moment().diff(moment(r.date)) > 0;
      return hasAlreadyPass && r.status === RideStatus.PENDING
    })
  }
);


export const getPendingRideRequests = createSelector<AppState, RideRequest[], RideRequest[]>(
  state => state.ride.rideRequests,
  rrs => {
    return rrs.filter(r => r.status === RideRequestStatus.PENDING)
  }
);