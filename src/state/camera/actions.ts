import { createAction } from '@reduxjs/toolkit';
import { withPayloadType } from '../types';

export const setShowCamera = createAction('[CAMERA] SET_SHOW_CAMERA', withPayloadType<boolean>());
export const setUploadingATMImage = createAction('[CAMERA] SET_UPLOADING_IMAGE', withPayloadType<boolean>());

