import { HomeActionTypes, HomeActions } from '../actions/home';
import {
  Param$ComicList,
  Schema$ComicItem,
  ApiRequestStatus
} from '../../typings';
import { FILTER_DATA } from '../../constants';

const FILTER_STORAGE_KEY = 'COMIC_READER_FILTER';
const NUM_OF_FILTER_TYPES = Object.keys(FILTER_DATA).length;
const DEFAULT_FILTER = new Array(NUM_OF_FILTER_TYPES).fill('');
const filterFromStorage = JSON.parse(
  localStorage.getItem(FILTER_STORAGE_KEY) || JSON.stringify(DEFAULT_FILTER)
);

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
  filter: string[];
}

const initialState: HomeState = {
  comicList: [],
  offset: 0,
  page: 1,
  noMoreComicResults: false,
  error: false,
  loading: false,
  filter: filterFromStorage
};

export default function(state = initialState, action: HomeActions): HomeState {
  switch (action.type) {
    case HomeActionTypes.GET_COMICS_LIST:
      return {
        ...initialState,
        comicList: placeholders,
        filter: state.filter,
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

    case HomeActionTypes.SET_FILTER:
      const filter = action.payload;

      localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filter));

      return {
        ...initialState,
        filter
      };

    default:
      return state;
  }
}
