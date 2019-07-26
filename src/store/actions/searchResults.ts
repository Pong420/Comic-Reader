import { Response$SearchResult } from '../../typings';

export enum SearchResultActionTypes {
  GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS',
  GET_SEARCH_RESULT_SUCCESS = 'GET_SEARCH_RESULT_SUCCESS',
  GET_SEARCH_RESULT_FAILURE = 'GET_SEARCH_RESULT_FAILURE',
  GET_MORE_SEARCH_RESULTS = 'GET_MORE_SEARCH_RESULTS'
}

export interface GetSearchResults {
  type: SearchResultActionTypes.GET_SEARCH_RESULTS;
  payload: string;
}

export interface GetSearchResultSuccess {
  type: SearchResultActionTypes.GET_SEARCH_RESULT_SUCCESS;
  payload: Response$SearchResult;
}

export interface GetSearchResultFailure {
  type: SearchResultActionTypes.GET_SEARCH_RESULT_FAILURE;
  payload: Response$SearchResult;
}

export interface GetMoreSearchResults {
  type: SearchResultActionTypes.GET_MORE_SEARCH_RESULTS;
}

export type SearchResultActions =
  | GetSearchResults
  | GetSearchResultSuccess
  | GetSearchResultFailure
  | GetMoreSearchResults;

export function getSearchResults(payload: string): GetSearchResults {
  return {
    type: SearchResultActionTypes.GET_SEARCH_RESULTS,
    payload
  };
}

export function getMoreSearchResults(): GetMoreSearchResults {
  return {
    type: SearchResultActionTypes.GET_MORE_SEARCH_RESULTS
  };
}

export const SearchActionCreators = {
  getSearchResults,
  getMoreSearchResults
};
