import { createAction } from '@reduxjs/toolkit';
import { SavedAddress } from 'types/storage';
import { withPayloadType } from '../types';

export const setAddresses = createAction('[STORAGE] setAddresses', withPayloadType<SavedAddress[]>())
export const setShouldWelcome = createAction('[STORAGE] setShouldWelcome', withPayloadType<boolean>())
export const setShowCanceledRides = createAction('[STORAGE] setShowCanceledRides', withPayloadType<boolean>())
export const setShowCompletedRides = createAction('[STORAGE] setShowCompletedRides', withPayloadType<boolean>())
export const setShowSeenNotifications = createAction('[STORAGE] setShowSeenNotifications', withPayloadType<boolean>())
export const setHasMadeASearch = createAction('[STORAGE] setHasMadeASearch', withPayloadType<boolean>())