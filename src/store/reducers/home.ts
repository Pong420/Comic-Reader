import { HomeActionTypes, HomeActions } from '../actions/home';
import { Param$ComicList, Schema$ComicItem } from '../../typings';

export interface HomeState extends Param$ComicList {
  comicList: Schema$ComicItem[];
}

const initialState: HomeState = {
  comicList: [],
  page: 1
};

export default function(state = initialState, action: HomeActions): HomeState {
  switch (action.type) {
    case HomeActionTypes.GET_COMICS_LIST:
      return {
        ...initialState
      };

    case HomeActionTypes.GET_MORE_COMICS_LIST:
      return {
        ...state,
        page: state.page + 1
      };

    case HomeActionTypes.GET_COMICS_LIST_SUCCESS:
      return {
        ...state,
        comicList: [...state.comicList, ...action.payload]
      };

    default:
      return state;
  }
}
