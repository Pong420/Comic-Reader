import { Action } from 'redux';
import {
  SearchResults,
  GetSearchResultsParam,
  ApiError
} from '../../../typing';

export enum SearchActionTypes {
  GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS',
  GET_SEARCH_RESULTS_SUCCESS = 'GET_SEARCH_RESULTS_SUCCESS',
  GET_SEARCH_RESULTS_FAIL = 'GET_SEARCH_RESULTS_FAIL',
  GET_SEARCH_RESULTS_CANCELED = 'GET_SEARCH_RESULTS_CANCELED',
  CLEAN_SEARCH_RESULTS = 'CLEAN_SEARCH_RESULTS'
}

export interface GetSearchResultsSuccessPayload {
  searchResults: SearchResults;
  from: number;
  to: number;
}

export interface GetSearchResults extends Action {
  type: SearchActionTypes.GET_SEARCH_RESULTS;
  payload: GetSearchResultsParam;
}

export interface GetSearchResultsSuccess extends Action {
  type: SearchActionTypes.GET_SEARCH_RESULTS_SUCCESS;
  payload: GetSearchResultsSuccessPayload;
}

export interface GetSearchResultsFailed extends Action {
  type: SearchActionTypes.GET_SEARCH_RESULTS_FAIL;
  payload: ApiError;
}

export interface GetSearchResultsCanceled extends Action {
  type: SearchActionTypes.GET_SEARCH_RESULTS_CANCELED;
}

export interface CleanSearchResults {
  type: SearchActionTypes.CLEAN_SEARCH_RESULTS;
}

export type SearchActions =
  | GetSearchResults
  | GetSearchResultsSuccess
  | GetSearchResultsFailed
  | GetSearchResultsCanceled
  | CleanSearchResults;

export function getSearchResults(
  payload: GetSearchResultsParam
): GetSearchResults {
  return {
    type: SearchActionTypes.GET_SEARCH_RESULTS,
    payload
  };
}

export function getSearchResultsSuccess(
  payload: GetSearchResultsSuccessPayload
): GetSearchResultsSuccess {
  return {
    type: SearchActionTypes.GET_SEARCH_RESULTS_SUCCESS,
    payload
  };
}

export function cleanSearchResults(): CleanSearchResults {
  return {
    type: SearchActionTypes.CLEAN_SEARCH_RESULTS
  };
}

export function cancelGetSearchResults(): GetSearchResultsCanceled {
  return {
    type: SearchActionTypes.GET_SEARCH_RESULTS_CANCELED
  };
}

export const SearchActionCreators = {
  getSearchResults,
  getSearchResultsSuccess,
  cancelGetSearchResults,
  cleanSearchResults
};
