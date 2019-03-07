import { ComicListTypes, ComicListActions } from '../actions/comicList';
import { ComicItemList } from '../../../typing';

// const FILTER_STORAGE_KEY = 'filter';
// const filter = JSON.parse(
//   localStorage.getItem(FILTER_STORAGE_KEY) ||
//     JSON.stringify(new Array(6).fill(''))
// );

export interface ComicListState {
  comicList: ComicItemList;
  // filter: string[];
  // noMoreComicResults: boolean;
  // page: number;
}

const initialState: ComicListState = {
  comicList: []
  // filter,
  // noMoreComicResults: false,
  // page: 1
};

export default function(state = initialState, action: ComicListActions) {
  switch (action.type) {
    case ComicListTypes.ADD_COMICS_LIST:
    case ComicListTypes.ADD_COMICS_LIST_PLACE_HOLDER:
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

    default:
      return state;
  }
}
