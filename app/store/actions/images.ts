import { Action } from 'redux';
import { ImageDetail } from '../../../typing';

export enum ImageActionTypes {
  PRELOAD_IMAGES = 'PRELOAD_IMAGES',
  LOAD_IMAGE_SUCCESS = 'LOAD_IMAGE_SUCCESS',
  LOAD_IMAGE_FAIL = 'LOAD_IMAGE_FAIL',
  TOGGLE_FIT_TO_PAGE = 'TOGGLE_FIT_TO_PAGE'
}

export interface PreloadImage extends Action {
  type: ImageActionTypes.PRELOAD_IMAGES;
  payload: number;
}

export interface LoadLoadImageSuccess extends Action {
  type: ImageActionTypes.LOAD_IMAGE_SUCCESS;
  payload: ImageDetail;
}

export interface LoadLoadImageFail extends Action {
  type: ImageActionTypes.LOAD_IMAGE_FAIL;
  payload: ImageDetail;
}

export interface ToggleFitToPage extends Action {
  type: ImageActionTypes.TOGGLE_FIT_TO_PAGE;
  payload?: boolean;
}

export type ImageActions =
  | LoadLoadImageSuccess
  | LoadLoadImageFail
  | PreloadImage
  | ToggleFitToPage;

export function preloadImage(startIndex: number): PreloadImage {
  return {
    type: ImageActionTypes.PRELOAD_IMAGES,
    payload: startIndex
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
  toggleFitToPage
};
