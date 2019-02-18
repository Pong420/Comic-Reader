import { SearchResultKeys, SearchResultTypes } from '../actions/searchResult';
import { SearchResults } from '../../typing';

export interface LatestUpdateState {
  page: number;
  keyword: string;
  searchResults: SearchResults;
}

const initialState: LatestUpdateState = {
  page: 1,
  keyword: '',
  searchResults: []
};

export default function(state = initialState, action: SearchResultTypes) {
  switch (action.type) {
    case SearchResultKeys.SET_SEARCH_RESULT:
      return {
        ...state,
        searchResults: action.payload.searchResults
      };
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
    case SearchResultKeys.SET_KEYWORD:
    case SearchResultKeys.SET_PAGE_NUMBER:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
