import {
  logout,
  setIsLoggedIn,
  setOwesReview,
  setUser
} from './actions';
import { createReducer } from '@reduxjs/toolkit';
import { Passenger, Ride, User } from 'types/models';

export interface UserState {
  user: User | undefined;
  isLoggedIn: boolean;
  owesReview: Passenger | undefined;
}

export const initialState: UserState = {
  user: undefined,
  isLoggedIn: false,
  owesReview: undefined
};

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(logout, state => {
      state.user = undefined;
      state.isLoggedIn = false;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setIsLoggedIn, (state, action) => {
      state.isLoggedIn = action.payload;
    })
    .addCase(setOwesReview, (state, action) => {
      if (action.payload === null) {
        state.owesReview = undefined;
      } else {
        state.owesReview = action.payload;
      }
    })

  return builder;
});
