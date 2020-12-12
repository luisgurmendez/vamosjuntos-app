import {
  setUser
} from './actions';
import { createReducer } from '@reduxjs/toolkit';
import { User } from 'types/models';

export interface UserState {
  user: User | undefined;
}

export const initialState: UserState = {
  user: undefined,
};

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })

  return builder;
});
