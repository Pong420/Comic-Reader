import { LatestUpdateKeys, LatestUpdateTypes } from '../actions/latestUpdate';
import { ComicItemList } from '../../typing';

export interface LatestUpdateState {
  comicList: ComicItemList;
}

const initialState: LatestUpdateState = {
  comicList: []
};

export default function counter(
  state = initialState,
  action: LatestUpdateTypes
) {
  switch (action.type) {
    case LatestUpdateKeys.SET_COMICS:
      return [...state.comicList, ...action.payload.comicList];
    default:
      return state;
  }
}
