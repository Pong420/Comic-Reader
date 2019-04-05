import { ImageDetail } from '../../typings';

export enum ImageActionTypes {
  PRELOAD_IMAGES = 'PRELOAD_IMAGES',
  LOAD_IMAGE_SUCCESS = 'LOAD_IMAGE_SUCCESS',
  LOAD_IMAGE_FAIL = 'LOAD_IMAGE_FAIL',
  TOGGLE_FIT_TO_PAGE = 'TOGGLE_FIT_TO_PAGE'
}

export interface PreloadImage {
  type: ImageActionTypes.PRELOAD_IMAGES;
  payload: number;
}

export interface LoadLoadImageSuccess {
  type: ImageActionTypes.LOAD_IMAGE_SUCCESS;
  payload: ImageDetail;
}

export interface LoadLoadImageFail {
  type: ImageActionTypes.LOAD_IMAGE_FAIL;
  payload: ImageDetail;
}

export interface ToggleFitToPage {
  type: ImageActionTypes.TOGGLE_FIT_TO_PAGE;
  payload?: boolean;
}

export type ImageActions = LoadLoadImageSuccess | LoadLoadImageFail | PreloadImage | ToggleFitToPage;

export const ImageActionCreators = {
  preloadImage(startIndex: number): PreloadImage {
    return {
      type: ImageActionTypes.PRELOAD_IMAGES,
      payload: startIndex
    };
  },
  toggleFitToPage(payload?: boolean): ToggleFitToPage {
    return {
      type: ImageActionTypes.TOGGLE_FIT_TO_PAGE,
      payload
    };
  }
};
