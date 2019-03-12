import { Action } from 'redux';
import { ImageDetail, ImageDimenClassName } from '../../../typing';

export enum ImageActionTypes {
  LOAD_IMAGE_SUCCESS = 'LOAD_IMAGE_SUCCESS',
  LOAD_IMAGE_FAIL = 'LOAD_IMAGE_FAIL',
  PRELOAD_IMAGE = 'PRELOAD_IMAGE',
  PRELOAD_IMAGE_STOPPED = 'PRELOAD_IMAGE_STOPPED',
  SWITCH_IMAGE_DIMENSIONS = 'SWITCH_IMAGE_DIMENSIONS'
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

export interface SwitchImageDimensions extends Action {
  type: ImageActionTypes.SWITCH_IMAGE_DIMENSIONS;
  payload?: ImageDimenClassName;
}

export type ImageActions =
  | LoadImageSuccess
  | LoadImageFail
  | PreloadImage
  | PreloadImageStopped
  | SwitchImageDimensions;

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

export function switchImageDimensions(
  payload?: ImageDimenClassName
): SwitchImageDimensions {
  return {
    type: ImageActionTypes.SWITCH_IMAGE_DIMENSIONS,
    payload
  };
}

export const ImageActionCreators = {
  loadImageSuccess,
  loadImageFail,
  preloadImage,
  stopPreloadImage,
  switchImageDimensions
};
