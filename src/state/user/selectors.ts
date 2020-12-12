
import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "state/types";
import { UserState } from "./reducer";

export const getIsUserLoggedIn = createSelector<AppState, UserState, boolean>(
  state => state.user,
  user => {
    return user.user !== undefined
  }
);

