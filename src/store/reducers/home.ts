import { HomeActionTypes, HomeActions } from '../actions/home';

export interface HomeState {
  comicList: [];
}

const initialState: HomeState = {
  comicList: []
};

export default function(state = initialState, action: HomeActions): HomeState {
  switch (action.type) {
    case HomeActionTypes.GET_COMICS_LIST:
      return {
        ...initialState
      };

    default:
      return state;
  }
}
