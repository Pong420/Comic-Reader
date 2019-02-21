import { SearchResultKeys, SearchResultTypes } from '../actions/searchResult';
import { SearchResults, SearchHistory } from '../../typing';

export interface SearchResultState {
  page: number;
  keyword: string;
  noMoreResult: boolean;
  searchHistory: SearchHistory;
  searchResults: SearchResults;
}

const initialState: SearchResultState = {
  page: 1,
  keyword: '',
  noMoreResult: false,
  searchHistory: [],
  searchResults: []
};

export default function(state = initialState, action: SearchResultTypes) {
  switch (action.type) {
    case SearchResultKeys.ADD_SEARCH_RESULT:
      const total = state.searchResults.length;
      const { from = total, to = from } = action.payload;

      return {
        ...state,
        searchResults: [
          ...state.searchResults.slice(0, from),
          ...action.payload.searchResults,
          ...state.searchResults.slice(to, total)
        ]
      };
    case SearchResultKeys.ADD_SEARCH_HISTORY:
      return {
        ...state,
        searchHistory: [
          ...state.searchHistory,
          action.payload.searchHistoryItem
        ]
      };
    case SearchResultKeys.SET_KEYWORD:
    case SearchResultKeys.SET_PAGE_NUMBER:
    case SearchResultKeys.SET_SEARCH_RESULT:
    case SearchResultKeys.SET_NO_MORE_RESULT:
    case SearchResultKeys.SET_SEARCH_HISTORY:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}
