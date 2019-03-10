import { Action } from 'redux';
import { GetContentDataParam, ContentData, ApiError } from '../../../typing';

export enum ContentActionTypes {
  GET_CONTENT = 'GET_CONTENT',
  GET_CONTENT_SUCCESS = 'GET_CONTENT_SUCCESS',
  GET_CONTENT_FAIL = 'GET_CONTENT_FAIL',
  GET_CONTENT_CANCELED = 'GET_CONTENT_CANCELED'
}

export interface GetContent extends Action {
  type: ContentActionTypes.GET_CONTENT;
  payload: GetContentDataParam;
}

export interface GetContentSuccess extends Action {
  type: ContentActionTypes.GET_CONTENT_SUCCESS;
  payload: ContentData;
}

export interface GetContentFail extends Action {
  type: ContentActionTypes.GET_CONTENT_FAIL;
  payload: ApiError;
}

export type ContentActions = GetContent | GetContentSuccess | GetContentFail;

export function getContent(payload: GetContentDataParam): GetContent {
  return {
    type: ContentActionTypes.GET_CONTENT,
    payload
  };
}

export function getContentSuccess(payload: ContentData): GetContentSuccess {
  return {
    type: ContentActionTypes.GET_CONTENT_SUCCESS,
    payload
  };
}

export const ContentActionCreators = {
  getContent,
  getContentSuccess
};
