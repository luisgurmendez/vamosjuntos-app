

import { createAction } from '@reduxjs/toolkit';
import { Ride, RideRequest } from 'types/models';
import { withPayloadType } from '../types';

export const setRides = createAction(
  '[RIDE] SET_RIDES',
  withPayloadType<Ride[]>()
);

export const setRideRequests = createAction(
  '[RIDE_REQUEST] SET_RIDE_REQUESTS',
  withPayloadType<RideRequest[]>()
);

export const removeRideRequest = createAction(
  '[RIDE_REQUEST] REMOVE_RIDE_REQUEST',
  withPayloadType<string>()
)

export const addRideRequest = createAction(
  '[RIDE_REQUEST] ADD_RIDE_REQUEST',
  withPayloadType<RideRequest>()
)
