import { SearchActionTypes, SearchActions } from '../actions/search';
import {
  Param$SearchResult,
  Schema$SearchResult,
  ApiRequestStatus
} from '../../typings';

export interface SearchState extends Param$SearchResult, ApiRequestStatus {
  offset: number;
  noMoreSearchResult: boolean;
  searchResults: Schema$SearchResult[];
}

const NUM_OF_SEARCH_RESULT_RETURN = 20;
const placeholders: Schema$SearchResult[] = new Array(
  NUM_OF_SEARCH_RESULT_RETURN
).fill({
  isPlaceholder: true
});

const initialState: SearchState = {
  loading: false,
  error: false,
  offset: 0,
  keyword: '',
  page: 1,
  noMoreSearchResult: false,
  searchResults: []
};

export default function(state = initialState, action: SearchActions) {
  switch (action.type) {
    case SearchActionTypes.GET_SEARCH_RESULT:
      return {
        ...initialState,
        error: false,
        loading: true,
        keyword: action.payload,
        searchResults: placeholders
      };

    case SearchActionTypes.GET_MORE_SEARCH_RESULT:
      return {
        ...state,
        page: state.page + 1,
        searchResults: [...state.searchResults, ...placeholders]
      };

    case SearchActionTypes.GET_SEARCH_RESULT_SUCCESS:
      return (() => {
        const newSearchResults = action.payload;
        const { searchResults, offset } = state;

        return {
          ...state,
          error: false,
          loading: false,
          offset: offset + newSearchResults.length,
          noMoreSearchResult:
            newSearchResults.length < NUM_OF_SEARCH_RESULT_RETURN,
          searchResults: [
            ...searchResults.slice(0, offset),
            ...newSearchResults,
            ...searchResults.slice(offset + NUM_OF_SEARCH_RESULT_RETURN)
          ]
        };
      })();

    case SearchActionTypes.GET_SEARCH_RESULT_FAIL:
      return {
        ...state,
        error: true,
        loading: false
      };

    default:
      return state;
  }
}
