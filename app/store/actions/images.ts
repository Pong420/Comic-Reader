import { Action } from 'redux';
import { ImageDetail } from '../../../typing';

export enum ImageActionTypes {
  LOAD_IMAGE_SUCCESS = 'LOAD_IMAGE_SUCCESS',
  LOAD_IMAGE_FAIL = 'LOAD_IMAGE_FAIL',
  PRELOAD_IMAGE = 'PRELOAD_IMAGE',
  PRELOAD_IMAGE_STOPPED = 'PRELOAD_IMAGE_STOPPED'
}

export interface PreloadImagePayload {
  imagesDetail: ImageDetail[];
  startIndex: number;
}

export interface LoadImageSuccess extends Action {
  type: ImageActionTypes.LOAD_IMAGE_SUCCESS;
  payload: ImageDetail;
}

export interface LoadImageFail extends Action {
  type: ImageActionTypes.LOAD_IMAGE_FAIL;
  payload: ImageDetail;
}

export interface PreloadImage extends Action {
  type: ImageActionTypes.PRELOAD_IMAGE;
  payload: PreloadImagePayload;
}

export interface PreloadImageStopped extends Action {
  type: ImageActionTypes.PRELOAD_IMAGE_STOPPED;
}

export type ImageActions =
  | LoadImageSuccess
  | LoadImageFail
  | PreloadImage
  | PreloadImageStopped;

export function loadImageSuccess(payload: ImageDetail): LoadImageSuccess {
  return {
    type: ImageActionTypes.LOAD_IMAGE_SUCCESS,
    payload
  };
}

export function loadImageFail(payload: ImageDetail): LoadImageFail {
  return {
    type: ImageActionTypes.LOAD_IMAGE_FAIL,
    payload
  };
}

export function preloadImage(
  imagesDetail: ImageDetail[],
  startIndex: number
): PreloadImage {
  return {
    type: ImageActionTypes.PRELOAD_IMAGE,
    payload: {
      imagesDetail,
      startIndex
    }
  };
}

export function stopPreloadImage(): PreloadImageStopped {
  return {
    type: ImageActionTypes.PRELOAD_IMAGE_STOPPED
  };
}

export const ImageActionCreators = {
  loadImageSuccess,
  loadImageFail,
  preloadImage,
  stopPreloadImage
};
