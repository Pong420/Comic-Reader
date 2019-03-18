import { ComicListActionTypes, ComicListActions } from '../actions/comicList';
import { ComicItemList, ApiError } from '../../../typing';
import { pad } from '../../utils/pad';

const FILTER_STORAGE_KEY = 'filter';
const NO_OF_FILTER_TYPES = 6;

const DEFAULT_FILTER = JSON.parse(
  localStorage.getItem(FILTER_STORAGE_KEY) ||
    JSON.stringify(new Array(NO_OF_FILTER_TYPES).fill(''))
);

const NO_OF_COMIC_ITEM_RETURN = 42;
const placeholders: ComicItemList = new Array(NO_OF_COMIC_ITEM_RETURN).fill({
  isPlaceholder: true
});

export interface ComicListState {
  comicList: ComicItemList;
  loading: boolean;
  error: ApiError | null;
  filter: string[];
  from: number;
  noMoreComicResults: boolean;
  page: number;
}

const initialState: ComicListState = {
  comicList: [],
  loading: false,
  error: null,
  filter: DEFAULT_FILTER,
  from: 0,
  noMoreComicResults: false,
  page: 1
};

export default function(state = initialState, action: ComicListActions) {
  switch (action.type) {
    case ComicListActionTypes.GET_COMICS_LIST:
      return {
        ...state,
        loading: true,
        page: state.page + 1,
        comicList: [...state.comicList, ...placeholders]
      };

    case ComicListActionTypes.GET_COMICS_LIST_SUCCESS:
      const comicList = action.payload;
      const { from } = state;
      const to = from + placeholders.length;

      return {
        ...state,
        loading: false,
        from: from + comicList.length,
        noMoreComicResults: comicList.length < placeholders.length,
        comicList: [
          ...state.comicList.slice(0, from),
          ...comicList,
          ...state.comicList.slice(to)
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
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
