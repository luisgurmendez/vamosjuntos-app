
import { createSelector } from "reselect";
import { AppState } from "state/types";

export const getStorage = (state: AppState) => state.storage;

export const getInited = createSelector(
  getStorage,
  storage => storage.inited
)

export const getIsInitilizing = createSelector(
  getStorage,
  storage => storage.isInitializing
)