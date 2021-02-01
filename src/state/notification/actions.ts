

import { createAction } from '@reduxjs/toolkit';
import { Notification } from 'types/models';
import { withPayloadType } from '../types';

export const setNotifications = createAction(
  '[NOTIFICATION] SET_NOTIFICATIONS',
  withPayloadType<Notification[]>()
);


export const updateNotification = createAction(
  '[NOTIFICATION] UPDATE_NOTIFICATION',
  withPayloadType<Notification>()
);
