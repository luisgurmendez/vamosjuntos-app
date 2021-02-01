import {
  setOwesReview,
  setUser
} from './actions';
import { createReducer } from '@reduxjs/toolkit';
import { Passenger, Ride, User } from 'types/models';

export interface UserState {
  user: User | undefined;
  owesReview: Passenger | undefined;
}

export const initialState: UserState = {
  user: undefined,
  owesReview: undefined
};

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setOwesReview, (state, action) => {
      state.owesReview = action.payload;
    })

  return builder;
});
