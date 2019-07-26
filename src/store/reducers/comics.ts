import { ComicsActions, ComicsActionTypes } from '../actions/comics';
import { transformDatabyIds } from '../../utils/transformDatabyIds';
import {
  Schema$ComicItem,
  Param$ComicList,
  ApiRequestStatus
} from '../../typings';
import { UUID } from '../../utils/uuid';
import { FILTER_DATA } from '../../constants';

interface State extends Param$ComicList, Pick<ApiRequestStatus, 'error'> {
  byIds: { [comicID: string]: Schema$ComicItem };
  ids: string[];
  noMore: boolean;
  offset: number;
  filter: string[];
}

const CID = new UUID();
// depends on the source, cannot control
const NUM_OF_COMIC_ITEM_RETURN = 42;
const createPlaceholders = (length = NUM_OF_COMIC_ITEM_RETURN) =>
  Array.from({ length }, () => CID.next());

const initialState: State = {
  byIds: {},
  ids: createPlaceholders(),
  noMore: false,
  page: 1,
  offset: 0,
  error: null,
  filter: new Array(FILTER_DATA.length).fill('')
};

export default function(state = initialState, action: ComicsActions): State {
  switch (action.type) {
    case ComicsActionTypes.GET_COMICS:
      return {
        ...initialState,
        filter: state.filter
      };

    case ComicsActionTypes.GET_MORE_COMICS:
      return {
        ...state,
        page: state.page + 1,
        ids: [...state.ids, ...createPlaceholders()]
      };

    case ComicsActionTypes.GET_COMICS_SUCCESS:
    case ComicsActionTypes.GET_COMICS_FAILURE:
      return (() => {
        const { byIds, ids, offset } = state;
        const newComics = transformDatabyIds(action.payload, 'comicID');

        return {
          ...state,
          offset: offset + newComics.ids.length,
          noMore: newComics.ids.length < NUM_OF_COMIC_ITEM_RETURN,
          byIds: {
            ...byIds,
            ...newComics.byIds
          },
          ids: Array.from(
            new Set([
              ...ids.slice(0, offset),
              ...newComics.ids,
              ...ids.slice(offset + NUM_OF_COMIC_ITEM_RETURN)
            ])
          )
        };
      })();

    case ComicsActionTypes.SET_FILTER:
      const newFilter = state.filter.slice();
      newFilter[action.payload.index] = action.payload.value;
      return {
        ...state,
        filter: newFilter
      };

    default:
      return state;
  }
}
