import { SearchResults, GetSearchResultsParam, ApiError } from '../../typings';

export enum SearchActionTypes {
  GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS',
  GET_MORE_SEARCH_RESULTS = 'GET_MORE_SEARCH_RESULTS',
  GET_SEARCH_RESULTS_SUCCESS = 'GET_SEARCH_RESULTS_SUCCESS',
  GET_SEARCH_RESULTS_FAIL = 'GET_SEARCH_RESULTS_FAIL',
  GET_SEARCH_RESULTS_CANCELED = 'GET_SEARCH_RESULTS_CANCELED'
}

export interface GetSearchResults {
  type: SearchActionTypes.GET_SEARCH_RESULTS;
  payload: GetSearchResultsParam;
}

export interface GetMoreSearchResults {
  type: SearchActionTypes.GET_MORE_SEARCH_RESULTS;
  payload: GetSearchResultsParam;
}

export interface GetSearchResultsSuccess {
  type: SearchActionTypes.GET_SEARCH_RESULTS_SUCCESS;
  payload: SearchResults;
}

export interface GetSearchResultsFailed {
  type: SearchActionTypes.GET_SEARCH_RESULTS_FAIL;
  payload: ApiError;
}

export interface GetSearchResultsCanceled {
  type: SearchActionTypes.GET_SEARCH_RESULTS_CANCELED;
}

export type SearchActions =
  | GetSearchResults
  | GetMoreSearchResults
  | GetSearchResultsSuccess
  | GetSearchResultsFailed
  | GetSearchResultsCanceled;

export const SearchActionCreators = {
  getSearchResults(payload: GetSearchResultsParam): GetSearchResults {
    return {
      type: SearchActionTypes.GET_SEARCH_RESULTS,
      payload
    };
  },
  getMoreSearchResults(payload: GetSearchResultsParam): GetMoreSearchResults {
    return {
      type: SearchActionTypes.GET_MORE_SEARCH_RESULTS,
      payload
    };
  },
  cancelGetSearchResults(): GetSearchResultsCanceled {
    return {
      type: SearchActionTypes.GET_SEARCH_RESULTS_CANCELED
    };
  }
};
