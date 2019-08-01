import {
  SearchResultActionTypes,
  SearchResultActions
} from '../actions/searchResults';
import { Params$SearchResult, Response$SearchResult } from '../../typings';
import { UUID } from '../../utils/uuid';
import { union } from '../../utils/array';

interface State extends Params$SearchResult, Response$SearchResult {
  offset: number;
  noMore: boolean;
}

const CID = new UUID();
const NUM_OF_SEARCH_RESULT_RETURN = 20; // depends on the source, cannot control
const createPlaceholders = (length = NUM_OF_SEARCH_RESULT_RETURN) =>
  Array.from({ length }, () => CID.next());

const initialState: State = {
  offset: 0,
  page: 1,
  keyword: '',
  noMore: false,
  byIds: {},
  ids: []
};

export default function(
  state = initialState,
  action: SearchResultActions
): State {
  switch (action.type) {
    case SearchResultActionTypes.GET_SEARCH_RESULTS:
      return {
        ...initialState,
        keyword: action.payload,
        ids: createPlaceholders()
      };

    case SearchResultActionTypes.GET_MORE_SEARCH_RESULTS:
      return {
        ...state,
        page: state.page + 1,
        ids: [...state.ids, ...createPlaceholders()]
      };

    case SearchResultActionTypes.GET_SEARCH_RESULT_SUCCESS:
    case SearchResultActionTypes.GET_SEARCH_RESULT_FAILURE:
      return (() => {
        const { byIds, ids } = action.payload;
        const newIds = union([
          ...state.ids.slice(0, state.offset),
          ...ids,
          ...state.ids.slice(state.offset + NUM_OF_SEARCH_RESULT_RETURN)
        ]);
        return {
          ...state,
          error: null,
          loading: false,
          offset: newIds.length,
          noMore: ids.length < NUM_OF_SEARCH_RESULT_RETURN,
          ids: newIds,
          byIds: {
            ...state.byIds,
            ...byIds
          }
        };
      })();

    default:
      return state;
  }
}
