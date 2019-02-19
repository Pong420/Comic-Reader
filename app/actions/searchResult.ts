import { SearchResults, SearchHistory, SearchHistoryItem } from '../../typing';

export enum SearchResultKeys {
  SET_SEARCH_RESULT = 'SET_SEARCH_RESULT',
  ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT',
  SET_PAGE_NUMBER = 'SET_PAGE_NUMBER',
  SET_KEYWORD = 'SET_KEYWORD',
  SET_NO_MORE_RESULT = 'SET_NO_MORE_RESULT',
  ADD_SEARCH_HISTORY = 'ADD_SEARCH_HISTORY',
  SET_SEARCH_HISTORY = 'SET_SEARCH_HISTORY'
}

interface SetSearchResultAction {
  type: SearchResultKeys.SET_SEARCH_RESULT;
  payload: {
    searchResults: SearchResults;
  };
}

interface AddSearchResultAction {
  type: SearchResultKeys.ADD_SEARCH_RESULT;
  payload: AddSearchResultsPayload;
}

interface SetPageNoAction {
  type: SearchResultKeys.SET_PAGE_NUMBER;
  payload: {
    page: number;
  };
}

interface SetKeywordAction {
  type: SearchResultKeys.SET_KEYWORD;
  payload: {
    keyword: string;
  };
}

interface SetNoMoreResultAction {
  type: SearchResultKeys.SET_NO_MORE_RESULT;
  payload: {
    noMoreResult: boolean;
  };
}

interface SetSearchHistoryAction {
  type: SearchResultKeys.SET_SEARCH_HISTORY;
  payload: {
    searchHistory: SearchHistory;
  };
}

interface AddSearchHistoryAction {
  type: SearchResultKeys.ADD_SEARCH_HISTORY;
  payload: {
    searchHistoryItem: SearchHistoryItem;
  };
}

export type SearchResultTypes =
  | SetSearchResultAction
  | AddSearchResultAction
  | SetPageNoAction
  | SetKeywordAction
  | SetNoMoreResultAction
  | AddSearchHistoryAction
  | SetSearchHistoryAction;

export interface AddSearchResultsPayload {
  searchResults: SearchResults;
  page: number;
  from?: number;
  to?: number;
}

export function setPageNumber(page: number) {
  return {
    type: SearchResultKeys.SET_PAGE_NUMBER,
    payload: {
      page
    }
  };
}

export function setSearchResults(searchResults: SearchResults) {
  return dispatch => {
    dispatch(setPageNumber(1));
    dispatch({
      type: SearchResultKeys.SET_SEARCH_RESULT,
      payload: {
        searchResults
      }
    });
  };
}

export function addSearchResults({
  page,
  searchResults,
  from,
  to
}: AddSearchResultsPayload) {
  return dispatch => {
    dispatch(setPageNumber(page));
    dispatch({
      type: SearchResultKeys.ADD_SEARCH_RESULT,
      payload: {
        searchResults,
        from,
        to
      }
    });
  };
}

export function setKeyword(keyword: string) {
  return {
    type: SearchResultKeys.SET_KEYWORD,
    payload: {
      keyword
    }
  };
}

export function setNoMoreResult(noMoreResult: boolean) {
  return {
    type: SearchResultKeys.SET_NO_MORE_RESULT,
    payload: {
      noMoreResult
    }
  };
}

export function setSearchHistory(searchHistory: SearchHistory) {
  return {
    type: SearchResultKeys.SET_SEARCH_HISTORY,
    payload: {
      searchHistory
    }
  };
}

export function addSearchHistory(searchHistoryItem: SearchHistoryItem) {
  return {
    type: SearchResultKeys.ADD_SEARCH_HISTORY,
    payload: {
      searchHistoryItem
    }
  };
}

export default {
  setSearchResults,
  addSearchResults,
  setPageNumber,
  setKeyword,
  setNoMoreResult,
  setSearchHistory,
  addSearchHistory
};
