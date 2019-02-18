import { SearchResults } from '../../typing';

export enum SearchResultKeys {
  SET_SEARCH_RESULT = 'SET_SEARCH_RESULT',
  ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT',
  SET_PAGE_NUMBER = 'SET_PAGE_NUMBER',
  SET_KEYWORD = 'SET_KEYWORD'
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

export type SearchResultTypes =
  | SetSearchResultAction
  | AddSearchResultAction
  | SetPageNoAction
  | SetKeywordAction;

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
  return {
    type: SearchResultKeys.SET_SEARCH_RESULT,
    payload: {
      searchResults
    }
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

export default {
  setSearchResults,
  addSearchResults,
  setPageNumber,
  setKeyword
};
