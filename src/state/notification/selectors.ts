
import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "state/types";
import { Notification } from "types/models";

export const getNumberOfUnseenNotifications = createSelector<AppState, Notification[], number>(
  state => state.notification.notifications,
  notis => {
    return notis.length
  }
);
