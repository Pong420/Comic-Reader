import { SearchActionTypes, SearchActions } from '../actions/search';
import { SearchResults } from '../../typings';

export interface SearchResultsState {
  cachedKeyword: string;
  offset: number;
  noMoreSearchResults: boolean;
  page: number;
  searchResults: SearchResults;
}

const initialState: SearchResultsState = {
  cachedKeyword: '',
  offset: 0,
  noMoreSearchResults: false,
  page: 1,
  searchResults: []
};

const NUM_OF_SEARCH_RESULT_RETURN = 20;
const placeholders: SearchResults = new Array(NUM_OF_SEARCH_RESULT_RETURN).fill({
  isPlaceholder: true
});

export default function(state = initialState, action: SearchActions) {
  switch (action.type) {
    case SearchActionTypes.GET_SEARCH_RESULTS:
      return {
        ...initialState,
        page: initialState.page + 1,
        cachedKeyword: action.payload.keyword,
        searchResults: placeholders
      };

    case SearchActionTypes.GET_MORE_SEARCH_RESULTS:
      return {
        ...state,
        page: state.page + 1,
        searchResults: [...state.searchResults, ...placeholders]
      };

    case SearchActionTypes.GET_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        offset: state.offset + action.payload.length,
        noMoreSearchResults: action.payload.length < placeholders.length,
        searchResults: [
          ...state.searchResults.slice(0, state.offset),
          ...action.payload,
          ...state.searchResults.slice(state.offset + NUM_OF_SEARCH_RESULT_RETURN)
        ]
      };

    default:
      return state;
  }
}
