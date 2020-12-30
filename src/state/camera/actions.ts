import { createAction } from '@reduxjs/toolkit';
import { withPayloadType } from '../types';

export const setShowCamera = createAction('[CAMERA] SET_SHOW_CAMERA', withPayloadType<boolean>());
export const setTmpImage = createAction('[CAMERA] SET_TMP_IMAGE', withPayloadType<string | undefined>());
