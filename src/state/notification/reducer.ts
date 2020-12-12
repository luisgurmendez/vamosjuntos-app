import {
  setNotifications
} from './actions';
import { createReducer } from '@reduxjs/toolkit';
import { Notification } from 'types/models';

export interface NotificationState {
  notifications: Notification[];
}

export const initialState: NotificationState = {
  notifications: [],
};

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(setNotifications, (state, action) => {
      state.notifications = action.payload;
    })

  return builder;
});
