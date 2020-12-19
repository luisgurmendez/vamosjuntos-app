import { createAction } from '@reduxjs/toolkit';
import { withPayloadType } from '../types';

export const setHasInternetConnection = createAction('[GENERAL] SET_HAS_INTERNET', withPayloadType<boolean>());
