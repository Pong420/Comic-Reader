import { ComicListActionTypes, ComicListActions } from '../actions/comicList';
import { ComicItemList, ApiError } from '../../../typing';
import { pad } from '../../utils/pad';

const FILTER_STORAGE_KEY = 'filter';
const NO_OF_FILTER_TYPES = 6;

const DEFAULT_FILTER = JSON.parse(
  localStorage.getItem(FILTER_STORAGE_KEY) ||
    JSON.stringify(new Array(NO_OF_FILTER_TYPES).fill(''))
);

export const NO_OF_COMIC_ITEM_RETURN = 42;
const placeholders: ComicItemList = new Array(NO_OF_COMIC_ITEM_RETURN).fill({
  isPlaceholder: true
});

export interface ComicListState {
  comicList: ComicItemList;
  filter: string[];
  noMoreComicResults: boolean;
  page: number;
  error: ApiError | null;
}

const initialState: ComicListState = {
  comicList: [],
  filter: DEFAULT_FILTER,
  noMoreComicResults: false,
  page: 1,
  error: null
};

export default function(state = initialState, action: ComicListActions) {
  switch (action.type) {
    case ComicListActionTypes.GET_COMICS_LIST:
      return {
        ...state,
        page: state.page + 1,
        comicList: [...state.comicList, ...placeholders]
      };

    case ComicListActionTypes.GET_COMICS_LIST_SUCCESS:
      const total = state.comicList.length;
      const { from = total, to = total, comicList } = action.payload;

      console.log(comicList, pad(comicList, {}, placeholders.length));

      return {
        ...state,
        noMoreComicResults: comicList.length < placeholders.length,
        comicList: [
          ...state.comicList.slice(0, from),
          ...pad(comicList, {}, placeholders.length),
          ...state.comicList.slice(to, total)
        ]
      };

    case ComicListActionTypes.SET_FILTER:
      const filter = pad(action.payload, '', NO_OF_FILTER_TYPES);
      localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filter));

      return {
        ...initialState,
        filter
      };

    case ComicListActionTypes.GET_COMICS_LIST_CANCELED:
      const validComiclist = state.comicList.filter(({ comicID }) => !!comicID);

      return {
        ...state,
        page: Math.floor(validComiclist.length / placeholders.length) + 1,
        comicList: validComiclist
      };

    case ComicListActionTypes.GET_COMICS_LIST_FAIL:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
