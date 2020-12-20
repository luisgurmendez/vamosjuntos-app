
import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "state/types";
import { Notification, NotificationStatus } from "types/models";


export const getUnseenNotifications = createSelector<AppState, Notification[], Notification[]>(
  state => state.notification.notifications,
  notis => {
    return notis.filter(n => n.status === NotificationStatus.UN_SEEN);
  }
);

export const getSeenNotifications = createSelector<AppState, Notification[], Notification[]>(
  state => state.notification.notifications,
  notis => {
    return notis.filter(n => n.status === NotificationStatus.SEEN);
  }
);

export const getNumberOfUnseenNotifications = createSelector<AppState, Notification[], number>(
  getUnseenNotifications,
  notis => {
    return notis.length
  }
);
