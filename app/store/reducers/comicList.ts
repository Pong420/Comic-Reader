import { ComicListActionTypes, ComicListActions } from '../actions/comicList';
import { ComicItemList, ApiError } from '../../../typing';

const FILTER_STORAGE_KEY = 'filter';
export const NO_OF_FILTER_TYPES = 6;
const filter = JSON.parse(
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
  filter,
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

      return {
        ...state,
        noMoreComicResults: comicList.length < placeholders.length,
        comicList: [
          ...state.comicList.slice(0, from),
          ...comicList,
          ...new Array(placeholders.length).fill({}).slice(comicList.length),
          ...state.comicList.slice(to, total)
        ]
      };

    case ComicListActionTypes.SET_FILTER:
      const filter = [
        ...action.payload,
        ...new Array(NO_OF_FILTER_TYPES).fill('').slice(action.payload.length)
      ];

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
