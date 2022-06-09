
import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "state/types";

export const getIsUserLoggedIn = createSelector(
  (state: AppState) => state.user,
  user => {
    return user.isLoggedIn
  }
);

export const getUser = createSelector(
  (state: AppState) => state.user,
  user => {
    return user.user
  }
);

export const getUserId = createSelector(
  getUser,
  user => {
    if (user) {
      return user.id
    }
    return undefined
  }
);

