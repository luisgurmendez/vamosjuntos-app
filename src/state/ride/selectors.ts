import { createSelector } from "@reduxjs/toolkit";
import moment from "moment";
import { AppState } from "state/types";
import { RideRequestStatus, RideStatus } from "types/models";

export const getAllRides = (state: AppState) => state.ride.rides;

export const getPendingRides = createSelector(
  getAllRides,
  rides => {
    return rides.filter(r => r.status === RideStatus.PENDING)
  }
);

export const getCompletedRides = createSelector(
  getAllRides,
  rides => {
    return rides.filter(r => r.status === RideStatus.COMPLETED)
  }
);

export const getCanceledRides = createSelector(
  getAllRides,
  rides => {
    return rides.filter(r => r.status === RideStatus.CANCELED)
  }
);

export const getPendingRidesWithPassedDates = createSelector(
  getAllRides,
  rides => {
    return rides.filter(r => {
      const hasAlreadyPass = moment().diff(moment(r.date)) > 0;
      return hasAlreadyPass && r.status === RideStatus.PENDING
    })
  }
);


export const getPendingRideRequests = createSelector(
  (state: AppState) => state.ride.rideRequests,
  rrs => {
    return rrs.filter(r => r.status === RideRequestStatus.PENDING)
  }
);