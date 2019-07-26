import {
  SearchResultActionTypes,
  SearchResultActions
} from '../actions/searchResults';
import { Param$SearchResult, Response$SearchResult } from '../../typings';
import { UUID } from '../../utils/uuid';

interface State extends Param$SearchResult, Response$SearchResult {
  offset: number;
  noMore: boolean;
}

const CID = new UUID();
// depends on the source, cannot control
const NUM_OF_SEARCH_RESULT_RETURN = 20;
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
      CID.reset();

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
        return {
          ...state,
          error: null,
          loading: false,
          offset: state.offset + ids.length,
          noMore: ids.length < NUM_OF_SEARCH_RESULT_RETURN,
          byIds: {
            ...state.byIds,
            ...byIds
          },
          // Array.from(new Set([...])) this will union the array
          ids: Array.from(
            new Set([
              ...state.ids.slice(0, state.offset),
              ...ids,
              ...state.ids.slice(state.offset + NUM_OF_SEARCH_RESULT_RETURN)
            ])
          )
        };
      })();

    default:
      return state;
  }
}
