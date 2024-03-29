
import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "state/types";
import { NotificationStatus, NotificationType } from "types/models";


const getAllNotifications = (state: AppState) => state.notification.notifications;

export const getUnseenNotifications = createSelector(
  getAllNotifications,
  notis => {
    return notis.filter(n => n.status === NotificationStatus.UN_SEEN);
  }
);

export const getSeenNotifications = createSelector(
  getAllNotifications,
  notis => {
    return notis.filter(n => n.status === NotificationStatus.SEEN);
  }
);

export const getNumberOfUnseenNotifications = createSelector(
  getUnseenNotifications,
  notis => {
    return notis.length
  }
);

export const getNumberOfUnseenNotificationsFilteringNewMessageType = createSelector(
  getUnseenNotifications,
  notis => {
    return notis.filter(n => n.type !== NotificationType.NEW_MESSAGE).length
  }
);
