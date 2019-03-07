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
    case ComicListTypes.SET_COMICS_LIST:
      return {
        ...state,
        comicList: action.payload
      };

    default:
      return state;
  }
}
