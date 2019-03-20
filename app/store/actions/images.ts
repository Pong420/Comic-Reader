import { Action } from 'redux';
import { ImageDetail } from '../../../typing';

export enum ImageActionTypes {
  PRELOAD_IMAGE = 'PRELOAD_IMAGE',
  PELOAD_IMAGE_SUCCESS = 'PELOAD_IMAGE_SUCCESS',
  PELOAD_IMAGE_FAIL = 'PELOAD_IMAGE_FAIL',
  PRELOAD_IMAGE_STOPPED = 'PRELOAD_IMAGE_STOPPED',
  TOGGLE_FIT_TO_PAGE = 'TOGGLE_FIT_TO_PAGE'
}

export interface PreloadImagePayload {
  imagesDetail: ImageDetail[];
  startIndex: number;
}

export interface PreloadImage extends Action {
  type: ImageActionTypes.PRELOAD_IMAGE;
  payload: PreloadImagePayload;
}

export interface PreloadLoadImageSuccess extends Action {
  type: ImageActionTypes.PELOAD_IMAGE_SUCCESS;
  payload: ImageDetail;
}

export interface PreloadLoadImageFail extends Action {
  type: ImageActionTypes.PELOAD_IMAGE_FAIL;
  payload: ImageDetail;
}

export interface PreloadImageStopped extends Action {
  type: ImageActionTypes.PRELOAD_IMAGE_STOPPED;
}

export interface ToggleFitToPage extends Action {
  type: ImageActionTypes.TOGGLE_FIT_TO_PAGE;
  payload?: boolean;
}

export type ImageActions =
  | PreloadLoadImageSuccess
  | PreloadLoadImageFail
  | PreloadImage
  | PreloadImageStopped
  | ToggleFitToPage;

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

export function PreloadloadImageSuccess(
  payload: ImageDetail
): PreloadLoadImageSuccess {
  return {
    type: ImageActionTypes.PELOAD_IMAGE_SUCCESS,
    payload
  };
}

export function PreloadloadImageFail(payload: ImageDetail): PreloadLoadImageFail {
  return {
    type: ImageActionTypes.PELOAD_IMAGE_FAIL,
    payload
  };
}

export function stopPreloadImage(): PreloadImageStopped {
  return {
    type: ImageActionTypes.PRELOAD_IMAGE_STOPPED
  };
}

export function toggleFitToPage(payload?: boolean): ToggleFitToPage {
  return {
    type: ImageActionTypes.TOGGLE_FIT_TO_PAGE,
    payload
  };
}

export const ImageActionCreators = {
  PreloadloadImageSuccess,
  PreloadloadImageFail,
  preloadImage,
  stopPreloadImage,
  toggleFitToPage
};
