import {
  Param$ContentData,
  Schema$ContentData,
  Schema$ImageDetail,
  ApiError
} from '../../typings';

export enum ContentActionTypes {
  GET_CONTENT = 'GET_CONTENT',
  GET_CONTENT_SUCCESS = 'GET_CONTENT_SUCCESS',
  GET_CONTENT_FAIL = 'GET_CONTENT_FAIL',
  GET_CONTENT_CANCELED = 'GET_CONTENT_CANCELED',
  PRELOAD_IMAGE = 'PRELOAD_IMAGE',
  PRELOAD_IMAGE_SUCCESS = 'PRELOAD_IMAGE_SUCCESS',
  PRELOAD_IMAGE_FAIL = 'PRELOAD_IMAGE_FAIL',
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

export interface GetContentFail {
  type: ContentActionTypes.GET_CONTENT_FAIL;
  payload: ApiError;
}

export interface CancelGetContent {
  type: ContentActionTypes.GET_CONTENT_CANCELED;
}

export interface PreloadImageSuccess {
  type: ContentActionTypes.PRELOAD_IMAGE_SUCCESS;
  payload: Payload$PreloadImageSuccess;
}

export interface PreloadImageFail {
  type: ContentActionTypes.PRELOAD_IMAGE_FAIL;
  payload: Partial<Schema$ImageDetail>;
}

export interface ToggleFitToPage {
  type: ContentActionTypes.TOGGLE_FIT_TO_PAGE;
  payload?: boolean;
}

export type ContentActions =
  | GetContent
  | GetContentSuccess
  | GetContentFail
  | CancelGetContent
  | PreloadImageSuccess
  | PreloadImageFail
  | ToggleFitToPage;

export function getContent(payload: Param$ContentData): GetContent {
  return {
    type: ContentActionTypes.GET_CONTENT,
    payload
  };
}

export function cancelGetContent(): CancelGetContent {
  return {
    type: ContentActionTypes.GET_CONTENT_CANCELED
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
  cancelGetContent,
  toggleFitToPage
};
