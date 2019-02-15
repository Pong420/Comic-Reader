import { LatestUpdateKeys, LatestUpdateTypes } from '../actions/latestUpdate';
import { ComicItemList } from '../../typing';

export interface LatestUpdateState {
  comicList: ComicItemList;
}

const initialState: LatestUpdateState = {
  comicList: []
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
    default:
      return state;
  }
}
