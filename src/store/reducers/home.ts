import { HomeActionTypes, HomeActions } from '../actions/home';
import { ComicItemList, ApiError } from '../../typings';
import { pad } from '../../utils/pad';

const FILTER_STORAGE_KEY = 'filter';
const NUM_OF_FILTER_TYPES = 6;
const DEFAULT_FILTER = JSON.parse(
  localStorage.getItem(FILTER_STORAGE_KEY) ||
    JSON.stringify(new Array(NUM_OF_FILTER_TYPES).fill(''))
);

const NUM_OF_COMIC_ITEM_RETURN = 42;
const placeholders: ComicItemList = new Array(NUM_OF_COMIC_ITEM_RETURN).fill({
  isPlaceholder: true
});

export interface HomeState {
  comicList: ComicItemList;
  error: ApiError | null;
  filter: string[];
  offset: number;
  noMoreComicResults: boolean;
  page: number;
}

const initialState: HomeState = {
  comicList: [],
  error: null,
  filter: DEFAULT_FILTER,
  offset: 0,
  noMoreComicResults: false,
  page: 1
};

export default function(state = initialState, action: HomeActions): HomeState {
  switch (action.type) {
    case HomeActionTypes.GET_COMICS_LIST:
      return {
        ...initialState,
        page: initialState.page + 1,
        comicList: placeholders,
        filter: state.filter
      };

    case HomeActionTypes.GET_MORE_COMICS_LIST:
      return {
        ...state,
        page: state.page + 1,
        comicList: [...state.comicList, ...placeholders]
      };

    case HomeActionTypes.GET_COMICS_LIST_SUCCESS:
      return {
        ...state,
        offset: state.offset + action.payload.length,
        noMoreComicResults: action.payload.length < NUM_OF_COMIC_ITEM_RETURN,
        comicList: [
          ...state.comicList.slice(0, state.offset),
          ...action.payload,
          ...state.comicList.slice(state.offset + NUM_OF_COMIC_ITEM_RETURN)
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
        error: action.payload
      };

    default:
      return state;
  }
}