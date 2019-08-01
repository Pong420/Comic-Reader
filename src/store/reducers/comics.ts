import { ComicsActions, ComicsActionTypes } from '../actions/comics';
import { transformDatabyIds } from '../../utils/transformDatabyIds';
import {
  Schema$ComicItem,
  Params$ComicList,
  ApiRequestStatus,
  Schema$Data
} from '../../typings';
import { UUID } from '../../utils/uuid';
import { union } from '../../utils/array';
import { filterStorage } from '../../storage/filter';

interface State
  extends Params$ComicList,
    Pick<ApiRequestStatus, 'error'>,
    Schema$Data<Schema$ComicItem, 'comicID'> {
  init: boolean;
  noMore: boolean;
  offset: number;
  filter: string[];
}

const CID = new UUID();
const NUM_OF_COMIC_ITEM_RETURN = 42; // depends on the source, cannot control
const createPlaceholders = (length = NUM_OF_COMIC_ITEM_RETURN) =>
  Array.from({ length }, () => CID.next());

const initialState: State = {
  init: true,
  byIds: {},
  ids: createPlaceholders(),
  noMore: false,
  page: 1,
  offset: 0,
  error: null,
  filter: filterStorage.get()
};

export default function(state = initialState, action: ComicsActions): State {
  switch (action.type) {
    case ComicsActionTypes.GET_COMICS:
      return {
        ...initialState,
        init: false,
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
        const newIds = union([
          ...ids.slice(0, offset),
          ...newComics.ids,
          ...ids.slice(offset + NUM_OF_COMIC_ITEM_RETURN)
        ]);

        return {
          ...state,
          ids: newIds,
          offset: newIds.length,
          noMore: newComics.ids.length < NUM_OF_COMIC_ITEM_RETURN,
          byIds: {
            ...byIds,
            ...newComics.byIds
          }
        };
      })();

    case ComicsActionTypes.SET_FILTER:
      let newFilter: string[] = [];
      if (!Array.isArray(action.payload)) {
        newFilter = state.filter.slice();
        newFilter[action.payload.index] = action.payload.value;
      }

      filterStorage.save(newFilter);

      return {
        ...state,
        init: true,
        filter: newFilter
      };

    default:
      return state;
  }
}
