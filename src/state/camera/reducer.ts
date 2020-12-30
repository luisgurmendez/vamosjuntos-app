import {
  setShowCamera,
  setTmpImage
} from './actions';
import { createReducer } from '@reduxjs/toolkit';

export interface CameraState {
  showCamera: boolean;
  uploadingImage: boolean;
  tmpImage: string | undefined;
}

export const initialState: CameraState = {
  showCamera: false,
  uploadingImage: false,
  tmpImage: undefined
};

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(setShowCamera, (state, action) => {
      state.showCamera = action.payload;
    })
    .addCase(setTmpImage, (state, action) => {
      state.tmpImage = action.payload;
    })

  return builder;
});
