import { ComicListKeys, ComicListTypes } from '../actions/comicList';
import { ComicItemList } from '../../typing';

const FILTER_STORAGE_KEY = 'filter';
const filter = JSON.parse(
  localStorage.getItem(FILTER_STORAGE_KEY) ||
    JSON.stringify(new Array(6).fill(''))
);

export interface ComicListState {
  comicList: ComicItemList;
  filter: string[];
  noMoreComicResults: boolean;
  page: number;
}

const initialState: ComicListState = {
  comicList: [],
  filter,
  noMoreComicResults: false,
  page: 1
};

export default function(state = initialState, action: ComicListTypes) {
  switch (action.type) {
    case ComicListKeys.SET_COMICS:
      return {
        ...state,
        comicList: action.payload.comicList
      };

    case ComicListKeys.ADD_COMICS:
      const total = state.comicList.length;
      const { from = total, to = total } = action.payload;

      return {
        ...state,
        comicList: [
          ...state.comicList.slice(0, from),
          ...action.payload.comicList,
          ...state.comicList.slice(to, total)
        ]
      };

    case ComicListKeys.SET_PAGE_NUMBER:
      return {
        ...state,
        page: action.payload.page
      };

    case ComicListKeys.SET_FILTER:
      localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(action.payload));

      return {
        ...initialState,
        filter: action.payload
      };

    case ComicListKeys.SET_NO_MORE_COMIC_RESULT:
      return {
        ...state,
        noMoreComicResults: action.payload
      };

    default:
      return state;
  }
}
