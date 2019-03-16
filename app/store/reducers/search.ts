import { SearchActionTypes, SearchActions } from '../actions/search';
import { SearchResults } from '../../../typing';

export interface SearchResultsState {
  cachedKeyword: string;
  from: number;
  noMoreSearchResults: boolean;
  page: number;
  searchResults: SearchResults;
}

const initialState: SearchResultsState = {
  cachedKeyword: '',
  from: 0,
  noMoreSearchResults: false,
  page: 1,
  searchResults: []
};

const NO_OF_SEARCH_RESULT_RETURN = 20;
const placeholders: SearchResults = new Array(NO_OF_SEARCH_RESULT_RETURN).fill({
  isPlaceholder: true
});

export default function(state = initialState, action: SearchActions) {
  switch (action.type) {
    case SearchActionTypes.GET_SEARCH_RESULTS:
      return {
        ...state,
        cachedKeyword: action.payload.keyword,
        page: state.page + 1,
        searchResults: [...state.searchResults, ...placeholders]
      };

    case SearchActionTypes.GET_SEARCH_RESULTS_SUCCESS:
      const searchResults = action.payload;
      const { from } = state;
      const to = from + placeholders.length;

      return {
        ...state,
        from: from + searchResults.length,
        noMoreSearchResults: searchResults.length < placeholders.length,
        searchResults: [
          ...state.searchResults.slice(0, from),
          ...searchResults,
          ...state.searchResults.slice(to)
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
