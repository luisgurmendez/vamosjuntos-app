

import { createAction } from '@reduxjs/toolkit';
import { Ride } from 'types/models';
import { withPayloadType } from '../types';

export const setRides = createAction(
  '[RIDE] SET_RIDES',
  withPayloadType<Ride[]>()
);

