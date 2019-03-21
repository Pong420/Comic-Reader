import { Action } from 'redux';
import { ImageDetail } from '../../../typing';

export enum ImageActionTypes {
  PRELOAD_IMAGES = 'PRELOAD_IMAGES',
  PRELOAD_IMAGES_STOPPED = 'PRELOAD_IMAGES_STOPPED',
  LOAD_IMAGE_SUCCESS = 'LOAD_IMAGE_SUCCESS',
  LOAD_IMAGE_FAIL = 'LOAD_IMAGE_FAIL',
  TOGGLE_FIT_TO_PAGE = 'TOGGLE_FIT_TO_PAGE'
}

export interface PreloadImage extends Action {
  type: ImageActionTypes.PRELOAD_IMAGES;
  payload: ImageDetail[];
}

export interface LoadLoadImageSuccess extends Action {
  type: ImageActionTypes.LOAD_IMAGE_SUCCESS;
  payload: ImageDetail;
}

export interface LoadLoadImageFail extends Action {
  type: ImageActionTypes.LOAD_IMAGE_FAIL;
  payload: ImageDetail;
}

export interface PreloadImageStopped extends Action {
  type: ImageActionTypes.PRELOAD_IMAGES_STOPPED;
}

export interface ToggleFitToPage extends Action {
  type: ImageActionTypes.TOGGLE_FIT_TO_PAGE;
  payload?: boolean;
}

export type ImageActions =
  | LoadLoadImageSuccess
  | LoadLoadImageFail
  | PreloadImage
  | PreloadImageStopped
  | ToggleFitToPage;

export function preloadImage(imagesDetail: ImageDetail[]): PreloadImage {
  return {
    type: ImageActionTypes.PRELOAD_IMAGES,
    payload: imagesDetail
  };
}

export function stopPreloadImage(): PreloadImageStopped {
  return {
    type: ImageActionTypes.PRELOAD_IMAGES_STOPPED
  };
}

export function toggleFitToPage(payload?: boolean): ToggleFitToPage {
  return {
    type: ImageActionTypes.TOGGLE_FIT_TO_PAGE,
    payload
  };
}

export const ImageActionCreators = {
  preloadImage,
  stopPreloadImage,
  toggleFitToPage
};
