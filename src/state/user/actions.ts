import { createAction } from '@reduxjs/toolkit';
import { Passenger, Ride, User } from 'types/models';
import { withPayloadType } from '../types';

export const setUser = createAction('[USER] SET_USER', withPayloadType<User | undefined>());

export const setOwesReview = createAction('[USER] SET_OWES_REVIEW', withPayloadType<Passenger | undefined>());
