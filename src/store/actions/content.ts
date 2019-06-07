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
  PRELOAD_IMAGE_SUCCESS = 'PRELOAD_IMAGE_SUCCESS'
}

export interface Payload$PreloadImageSuccess {
  index: number;
  image: Partial<Schema$ImageDetail>;
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

export interface PreloadImage {
  type: ContentActionTypes.PRELOAD_IMAGE;
  payload: number;
}

export interface PreloadImageSuccess {
  type: ContentActionTypes.PRELOAD_IMAGE_SUCCESS;
  payload: Payload$PreloadImageSuccess;
}

export type ContentActions =
  | GetContent
  | GetContentSuccess
  | GetContentFail
  | CancelGetContent
  | PreloadImage
  | PreloadImageSuccess;

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

export function preloadImage(payload: number): PreloadImage {
  return {
    type: ContentActionTypes.PRELOAD_IMAGE,
    payload
  };
}

export const ContentActionCreators = {
  getContent,
  cancelGetContent,
  preloadImage
};
