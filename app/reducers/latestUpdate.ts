import { LatestUpdateKeys, LatestUpdateTypes } from '../actions/latestUpdate';
import { ComicItemList } from '../../typing';

export interface LatestUpdateState {
  page: number;
  comicList: ComicItemList;
}

const initialState: LatestUpdateState = {
  comicList: [],
  page: 1
};

export default function(state = initialState, action: LatestUpdateTypes) {
  switch (action.type) {
    case LatestUpdateKeys.SET_COMICS:
      return {
        ...state,
        comicList: action.payload.comicList
      };
    case LatestUpdateKeys.ADD_COMICS:
      return {
        ...state,
        comicList: [...state.comicList, ...action.payload.comicList]
      };
    case LatestUpdateKeys.SET_PAGE_NUMBER:
      return {
        ...state,
        page: action.payload.page
      };
      break;
    default:
      return state;
  }
}