import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "state/types";
import Storage from "storage/Storage";
import { SavedAddress } from "types/storage";
import {
  setAddresses,
  setShouldWelcome,
  setShowCanceledRides,
  setShowCompletedRides,
  setShowSeenNotifications,
  setHasMadeASearch,
} from "./actions";

export const init = createAsyncThunk<any, never, { state: AppState }>(
  '[STORAGE] init',
  async (_, { dispatch }) => {
    await Storage.init();

    const savedAddresses = await Storage.getItem<SavedAddress[]>(Storage.ADDRESSES);
    savedAddresses !== undefined && dispatch(setAddresses(savedAddresses));

    const shouldWelcome = await Storage.getItem<boolean>(Storage.SHOULD_WELCOME);
    shouldWelcome !== undefined && dispatch(setShouldWelcome(shouldWelcome));

    const showCanceledRides = await Storage.getItem<boolean>(Storage.SHOW_CANCELED_RIDES);
    showCanceledRides !== undefined && dispatch(setShowCanceledRides(showCanceledRides));

    const showCompletedRides = await Storage.getItem<boolean>(Storage.SHOW_COMPLETED_RIDES);
    showCompletedRides !== undefined && dispatch(setShowCompletedRides(showCompletedRides));

    const showSeenNotifications = await Storage.getItem<boolean>(Storage.SHOW_SEEN_NOTIFICATIONS);
    showSeenNotifications !== undefined && dispatch(setShowSeenNotifications(showSeenNotifications));

    const hasMadeASearch = await Storage.getItem<boolean>(Storage.HAS_MADE_A_SEARCH);
    hasMadeASearch !== undefined && dispatch(setHasMadeASearch(hasMadeASearch));
  }
);

export const setSavedAddressesInStorage = createAsyncThunk<any, SavedAddress[], { state: AppState }>('[STORAGE setSavedAddressesInStorage]', async (item, { dispatch }) => {
  await Storage.setItem(Storage.ADDRESSES, item)
  dispatch(setAddresses(item))
})

export const setShouldWelcomeInStorage = createAsyncThunk<any, boolean, { state: AppState }>('[STORAGE setShouldWelcomeInStorage]', async (item, { dispatch }) => {
  await Storage.setItem(Storage.SHOULD_WELCOME, item)
  dispatch(setShouldWelcome(item))
})

export const setShowCanceledRidesInStorage = createAsyncThunk<any, boolean, { state: AppState }>('[STORAGE setShowCanceledRidesInStorage]', async (item, { dispatch }) => {
  await Storage.setItem(Storage.SHOW_CANCELED_RIDES, item)
  dispatch(setShowCanceledRides(item))
})

export const setShowCompletedRidesInStorage = createAsyncThunk<any, boolean, { state: AppState }>('[STORAGE setShowCompletedRidesInStorage]', async (item, { dispatch }) => {
  await Storage.setItem(Storage.SHOW_COMPLETED_RIDES, item)
  dispatch(setShowCompletedRides(item))
})

export const setShowSeenNotificationsInStorage = createAsyncThunk<any, boolean, { state: AppState }>('[STORAGE setShowSeenNotificationsInStorage]', async (item, { dispatch }) => {
  await Storage.setItem(Storage.SHOW_SEEN_NOTIFICATIONS, item)
  dispatch(setShowSeenNotifications(item))
})


export const setHasMadeASearchInStorage = createAsyncThunk<any, boolean, { state: AppState }>('[STORAGE setHasMadeASearchInStorage]', async (item, { dispatch }) => {
  console.log('THUNK ACTION! SHOULD UPDATE STATEE');
  await Storage.setItem(Storage.HAS_MADE_A_SEARCH, item)
  dispatch(setHasMadeASearch(item))
})
