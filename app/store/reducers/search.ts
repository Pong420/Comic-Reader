import { SearchActionTypes, SearchActions } from '../actions/search';
import { SearchResults } from '../../../typing';

export interface SearchResultsState {
  cachedKeyword: string;
  noMoreSearchResults: boolean;
  page: number;
  searchResults: SearchResults;
}

const initialState: SearchResultsState = {
  cachedKeyword: '',
  noMoreSearchResults: false,
  page: 1,
  searchResults: []
};

export const searchResultPlaceholders: SearchResults = new Array(20).fill({});

export default function(state = initialState, action: SearchActions) {
  switch (action.type) {
    case SearchActionTypes.GET_SEARCH_RESULTS:
      return {
        ...state,
        cachedKeyword: action.payload.keyword,
        page: state.page + 1,
        searchResults: [...state.searchResults, ...searchResultPlaceholders]
      };

    case SearchActionTypes.GET_SEARCH_RESULTS_SUCCESS:
      const total = state.searchResults.length;
      const { from, to, searchResults } = action.payload;

      return {
        ...state,
        noMoreSearchResults:
          searchResults.length < searchResultPlaceholders.length,
        searchResults: [
          ...state.searchResults.slice(0, from),
          ...searchResults,
          ...state.searchResults.slice(to, total)
        ]
      };

    case SearchActionTypes.CLEAN_SEARCH_RESULTS:
      return {
        ...initialState
      };

    default:
      return state;
  }
}
