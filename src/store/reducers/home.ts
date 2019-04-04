import { HomeActionTypes, HomeActions } from '../actions/home';
import { ComicItemList, ApiError } from '../../typings';
import { pad } from '../../utils/pad';

const FILTER_STORAGE_KEY = 'filter';
const NUM_OF_FILTER_TYPES = 6;
const DEFAULT_FILTER = JSON.parse(
  localStorage.getItem(FILTER_STORAGE_KEY) || JSON.stringify(new Array(NUM_OF_FILTER_TYPES).fill(''))
);

const NUM_OF_COMIC_ITEM_RETURN = 42;
const placeholders: ComicItemList = new Array(NUM_OF_COMIC_ITEM_RETURN).fill({
  isPlaceholder: true
});

export interface HomeState {
  comicList: ComicItemList;
  loading: boolean;
  error: ApiError | null;
  filter: string[];
  offset: number;
  noMoreComicResults: boolean;
  page: number;
}

const initialState: HomeState = {
  comicList: [],
  loading: false,
  error: null,
  filter: DEFAULT_FILTER,
  offset: 0,
  noMoreComicResults: true,
  page: 1
};

export default function(state = initialState, action: HomeActions): HomeState {
  switch (action.type) {
    case HomeActionTypes.GET_COMICS_LIST:
      return {
        ...initialState,
        page: initialState.page + 1,
        comicList: placeholders
      };

    case HomeActionTypes.GET_MORE_COMICS_LIST:
      return {
        ...state,
        page: state.page + 1,
        comicList: [...state.comicList, ...placeholders]
      };

    case HomeActionTypes.GET_COMICS_LIST_SUCCESS:
      const offset = state.offset + action.payload.length;

      return {
        ...state,
        offset,
        comicList: [
          ...state.comicList.slice(0, state.offset),
          ...action.payload,
          ...state.comicList.slice(state.offset + offset)
        ]
      };

    case HomeActionTypes.SET_FILTER:
      const filter = pad(action.payload, '', NUM_OF_FILTER_TYPES);
      localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filter));

      return {
        ...initialState,
        filter
      };

    case HomeActionTypes.GET_COMICS_LIST_CANCELED:
      return state;

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
