import { ComicListTypes, ComicListActions } from '../actions/comicList';
import { ComicItemList } from '../../../typing';

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

export const comistListPlaceholders: ComicItemList = new Array(42).fill({});

export default function(state = initialState, action: ComicListActions) {
  switch (action.type) {
    case ComicListTypes.GET_COMICS_LIST:
      return {
        ...state,
        page: state.page + 1,
        comicList: [...state.comicList, ...comistListPlaceholders]
      };

    case ComicListTypes.GET_COMICS_LIST_SUCCESS:
      const total = state.comicList.length;
      const { from = total, to = total, comicList } = action.payload;

      return {
        ...state,
        noMoreComicResults: comicList.length < comistListPlaceholders.length,
        comicList: [
          ...state.comicList.slice(0, from),
          ...comicList,
          ...state.comicList.slice(to, total)
        ]
      };

    case ComicListTypes.SET_FILTER:
      localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(action.payload));

      return {
        ...initialState,
        filter: action.payload
      };

    // TODO: review
    case ComicListTypes.GET_COMICS_LIST_CANCELED:
      const validComiclist = state.comicList.filter(v => Object.keys(v).length);

      return {
        ...state,
        page: validComiclist.length / comistListPlaceholders.length + 1,
        comicList: validComiclist
      };

    default:
      return state;
  }
}
