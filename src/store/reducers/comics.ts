import { ComicsActions, ComicsActionTypes } from '../actions/comics';
import { transformDatabyIds } from '../../utils/transformDatabyIds';
import {
  Schema$ComicItem,
  Param$ComicList,
  ApiRequestStatus
} from '../../typings';

interface State extends Param$ComicList, ApiRequestStatus {
  byIds: { [comicID: string]: Schema$ComicItem };
  ids: string[];
  noMore: boolean;
  offset: number;
  filter: string[];
}

const NUM_OF_COMIC_ITEM_RETURN = 42;

const initialState: State = {
  byIds: {},
  ids: [],
  noMore: false,
  page: 1,
  offset: 0,
  error: false,
  loading: false,
  filter: []
};

export default function(state = initialState, action: ComicsActions): State {
  switch (action.type) {
    case ComicsActionTypes.GET_COMICS:
      return {
        ...initialState,
        filter: state.filter,
        loading: true
      };

    case ComicsActionTypes.GET_MORE_COMICS:
      return {
        ...state,
        page: state.page + 1,
        ids: [...state.ids] // TODO:
      };

    case ComicsActionTypes.GET_COMICS_SUCCESS:
      return (() => {
        const { byIds, ids, offset } = state;
        const newComics = transformDatabyIds(action.payload, 'comicID');

        return {
          ...state,
          loading: false,
          error: false,
          offset: offset + newComics.ids.length,
          noMore: newComics.ids.length < NUM_OF_COMIC_ITEM_RETURN,
          byIds: {
            ...byIds,
            ...newComics.byIds
          },
          ids: [
            ...ids.slice(0, offset),
            ...newComics.ids,
            ...ids.slice(offset + NUM_OF_COMIC_ITEM_RETURN)
          ]
        };
      })();

    case ComicsActionTypes.GET_COMICS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
