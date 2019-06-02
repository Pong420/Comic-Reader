import { ComicActionTypes, ComicActions } from '../actions/comic';
import { Schema$ComicData } from '../../typings';

export interface ComicState {
  comicData: Partial<Schema$ComicData>;
}

const initialState: ComicState = {
  comicData: {}
};

export default function(
  state = initialState,
  action: ComicActions
): ComicState {
  switch (action.type) {
    case ComicActionTypes.GET_COMIC:
      return {
        ...initialState
      };

    case ComicActionTypes.GET_COMIC_SUCCESS:
      return {
        ...state,
        comicData: action.payload
      };

    default:
      return state;
  }
}
