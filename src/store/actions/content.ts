import {
  Param$ContentData,
  Schema$ContentData,
  Schema$ImageDetail,
  ApiError
} from '../../typings';

export enum ContentActionTypes {
  GET_CONTENT = 'GET_CONTENT',
  GET_CONTENT_SUCCESS = 'GET_CONTENT_SUCCESS',
  GET_CONTENT_FAILURE = 'GET_CONTENT_FAILURE',
  PRELOAD_IMAGE = 'PRELOAD_IMAGE',
  PRELOAD_IMAGE_SUCCESS = 'PRELOAD_IMAGE_SUCCESS',
  PRELOAD_IMAGE_FAILURE = 'PRELOAD_IMAGE_FAILURE',
  TOGGLE_FIT_TO_PAGE = 'TOGGLE_FIT_TO_PAGE'
}

export interface Payload$PreloadImageSuccess
  extends Partial<Schema$ImageDetail> {
  index: number;
}

export interface GetContent {
  type: ContentActionTypes.GET_CONTENT;
  payload: Param$ContentData;
}

export interface GetContentSuccess {
  type: ContentActionTypes.GET_CONTENT_SUCCESS;
  payload: Schema$ContentData;
}

export interface GetContentFailure {
  type: ContentActionTypes.GET_CONTENT_FAILURE;
  payload: ApiError;
}

export interface PreloadImageSuccess {
  type: ContentActionTypes.PRELOAD_IMAGE_SUCCESS;
  payload: Payload$PreloadImageSuccess;
}

export interface PreloadImageFailure {
  type: ContentActionTypes.PRELOAD_IMAGE_FAILURE;
  payload: Partial<Schema$ImageDetail>;
}

export interface ToggleFitToPage {
  type: ContentActionTypes.TOGGLE_FIT_TO_PAGE;
  payload?: boolean;
}

export type ContentActions =
  | GetContent
  | GetContentSuccess
  | GetContentFailure
  | PreloadImageSuccess
  | PreloadImageFailure
  | ToggleFitToPage;

export function getContent(payload: Param$ContentData): GetContent {
  return {
    type: ContentActionTypes.GET_CONTENT,
    payload
  };
}

export function toggleFitToPage(payload?: boolean): ToggleFitToPage {
  return {
    type: ContentActionTypes.TOGGLE_FIT_TO_PAGE,
    payload
  };
}

export const ContentActionCreators = {
  getContent,
  toggleFitToPage
};
