import { HomeActionTypes, HomeActions } from '../actions/home';
import {
  Param$ComicList,
  Schema$ComicItem,
  ApiRequestStatus
} from '../../typings';

const NUM_OF_COMIC_ITEM_RETURN = 42;
const placeholders: Schema$ComicItem[] = new Array(
  NUM_OF_COMIC_ITEM_RETURN
).fill({
  isPlaceholder: true
});

export interface HomeState extends Param$ComicList, ApiRequestStatus {
  comicList: Schema$ComicItem[];
  offset: number;
  noMoreComicResults: boolean;
}

const initialState: HomeState = {
  comicList: placeholders,
  offset: 0,
  page: 1,
  noMoreComicResults: false,
  error: false,
  loading: false
};

export default function(state = initialState, action: HomeActions): HomeState {
  switch (action.type) {
    case HomeActionTypes.GET_COMICS_LIST:
      return {
        ...initialState,
        loading: true
      };

    case HomeActionTypes.GET_MORE_COMICS_LIST:
      return {
        ...state,
        page: state.page + 1,
        comicList: [...state.comicList, ...placeholders]
      };

    case HomeActionTypes.GET_COMICS_LIST_SUCCESS:
      return (() => {
        const newComicList = action.payload;
        const { comicList, offset } = state;

        return {
          ...state,
          loading: false,
          error: false,
          offset: offset + newComicList.length,
          noMoreComicResults: newComicList.length < NUM_OF_COMIC_ITEM_RETURN,
          comicList: [
            ...comicList.slice(0, offset),
            ...newComicList,
            ...comicList.slice(offset + NUM_OF_COMIC_ITEM_RETURN)
          ]
        };
      })();

    case HomeActionTypes.GET_COMICS_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
