import { Action } from 'redux';
import { GetContentDataParam, ContentData, ApiError } from '../../typings';

export enum ContentActionTypes {
  GET_CONTENT = 'GET_CONTENT',
  GET_CONTENT_SUCCESS = 'GET_CONTENT_SUCCESS',
  GET_CONTENT_FAIL = 'GET_CONTENT_FAIL',
  GET_CONTENT_CANCELED = 'GET_CONTENT_CANCELED'
}

export interface GetContent {
  type: ContentActionTypes.GET_CONTENT;
  payload: GetContentDataParam;
}

export interface GetContentSuccess {
  type: ContentActionTypes.GET_CONTENT_SUCCESS;
  payload: ContentData;
}

export interface GetContentFail {
  type: ContentActionTypes.GET_CONTENT_FAIL;
  payload: ApiError;
}

export interface GetContentCanceled {
  type: ContentActionTypes.GET_CONTENT_CANCELED;
}

export type ContentActions =
  | GetContent
  | GetContentSuccess
  | GetContentFail
  | GetContentCanceled;

export const ContentActionCreators = {
  getContent(payload: GetContentDataParam): GetContent {
    return {
      type: ContentActionTypes.GET_CONTENT,
      payload
    };
  },
  cancelGetContent(): GetContentCanceled {
    return {
      type: ContentActionTypes.GET_CONTENT_CANCELED
    };
  }
};
