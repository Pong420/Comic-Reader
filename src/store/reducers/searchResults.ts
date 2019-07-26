import {
  SearchResultActionTypes,
  SearchResultActions
} from '../actions/searchResults';
import {
  Param$SearchResult,
  Response$SearchResult,
  ApiRequestStatus
} from '../../typings';

interface State
  extends Param$SearchResult,
    Response$SearchResult,
    ApiRequestStatus {
  offset: number;
  noMore: boolean;
}

const NUM_OF_SEARCH_RESULT_RETURN = 20;

const initialState: State = {
  loading: false,
  error: null,
  offset: 0,
  page: 1,
  keyword: '',
  noMore: false,
  byIds: {},
  ids: []
};

export default function(state = initialState, action: SearchResultActions) {
  switch (action.type) {
    case SearchResultActionTypes.GET_SEARCH_RESULTS:
      return {
        ...initialState,
        error: null,
        loading: true,
        keyword: action.payload
      };

    case SearchResultActionTypes.GET_MORE_SEARCH_RESULTS:
      return {
        ...state,
        page: state.page + 1
      };

    case SearchResultActionTypes.GET_SEARCH_RESULT_SUCCESS:
      return (() => {
        const { byIds, ids } = action.payload;

        return {
          ...state,
          error: null,
          loading: false,
          offset: state.offset + ids.length,
          noMore: ids.length < NUM_OF_SEARCH_RESULT_RETURN,
          ids: [...state.ids, ...ids],
          byIds: {
            ...state.byIds,
            ...byIds
          }
        };
      })();

    case SearchResultActionTypes.GET_SEARCH_RESULT_FAILURE:
      return {
        ...state,
        error: null, // TODO:
        loading: false
      };

    default:
      return state;
  }
}
