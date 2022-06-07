
import { createSelector } from "reselect";
import { AppState } from "state/types";
import { StorageState } from "./types";

export const getStorage = (state: AppState) => state.storage;

export const getInited = createSelector<AppState, StorageState, boolean>(
  getStorage,
  storage => storage.inited
)

export const getIsInitilizing = createSelector<AppState, StorageState, boolean>(
  getStorage,
  storage => storage.isInitializing
)