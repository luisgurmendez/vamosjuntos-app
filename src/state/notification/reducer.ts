import {
  setNotifications, updateNotification
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
    .addCase(updateNotification, (state, action) => {
      state.notifications = state.notifications.map(n => {
        if (n.id === action.payload.id) {
          return action.payload
        }
        return n;
      });
    })

  return builder;
});
