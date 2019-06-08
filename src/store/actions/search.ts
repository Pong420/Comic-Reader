import { Schema$SearchResult, ApiError } from '../../typings';

export enum SearchActionTypes {
  GET_SEARCH_RESULT = 'GET_SEARCH_RESULT',
  GET_SEARCH_RESULT_SUCCESS = 'GET_SEARCH_RESULT_SUCCESS',
  GET_SEARCH_RESULT_FAIL = 'GET_SEARCH_RESULT_FAIL',
  GET_SEARCH_RESULT_CANCELED = 'GET_SEARCH_RESULT_CANCELED',
  GET_MORE_SEARCH_RESULT = 'GET_MORE_SEARCH_RESULT'
}

export interface GetSearchResult {
  type: SearchActionTypes.GET_SEARCH_RESULT;
  payload: string;
}

export interface GetSearchResultSuccess {
  type: SearchActionTypes.GET_SEARCH_RESULT_SUCCESS;
  payload: Schema$SearchResult[];
}

export interface GetSearchResultFail {
  type: SearchActionTypes.GET_SEARCH_RESULT_FAIL;
  payload: ApiError;
}

export interface CancelGetSearchResult {
  type: SearchActionTypes.GET_SEARCH_RESULT_CANCELED;
}

export interface GetMoreSearchResult {
  type: SearchActionTypes.GET_MORE_SEARCH_RESULT;
}

export type SearchActions =
  | GetSearchResult
  | GetSearchResultSuccess
  | GetSearchResultFail
  | GetMoreSearchResult
  | CancelGetSearchResult;

export function getSearchResult(payload: string): GetSearchResult {
  return {
    type: SearchActionTypes.GET_SEARCH_RESULT,
    payload
  };
}

export function getMoreSearchResult(): GetMoreSearchResult {
  return {
    type: SearchActionTypes.GET_MORE_SEARCH_RESULT
  };
}

export function cancelGetSearchResult(): CancelGetSearchResult {
  return {
    type: SearchActionTypes.GET_SEARCH_RESULT_CANCELED
  };
}

export const SearchActionCreators = {
  getSearchResult,
  getMoreSearchResult,
  cancelGetSearchResult
};
