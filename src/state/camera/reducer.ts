import {
  setShowCamera, setUploadingATMImage
} from './actions';
import { createReducer } from '@reduxjs/toolkit';

export interface CameraState {
  showCamera: boolean;
  uploadingImage: boolean;
}

export const initialState: CameraState = {
  showCamera: false,
  uploadingImage: false
};

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(setShowCamera, (state, action) => {
      state.showCamera = action.payload;
    })
    .addCase(setUploadingATMImage, (state, action) => {
      state.uploadingImage = action.payload;
    })

  return builder;
});
