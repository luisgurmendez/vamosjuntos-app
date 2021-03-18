
import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "state/types";
import { User } from "types/models";
import { UserState } from "./reducer";

export const getIsUserLoggedIn = createSelector<AppState, UserState, boolean>(
  state => state.user,
  user => {
    return user.isLoggedIn
  }
);

export const getUser = createSelector<AppState, UserState, User | undefined>(
  state => state.user,
  user => {
    return user.user
  }
);

export const getUserId = createSelector<AppState, User | undefined, string | undefined>(
  getUser,
  user => {
    if (user) {
      return user.id
    }
    return undefined
  }
);

