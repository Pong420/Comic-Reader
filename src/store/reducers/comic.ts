import { ComicActions, ComicActionTypes } from '../actions/comic';
import { ComicData, ApiError } from '../../typings';

export interface ComicState {
  comicData: ComicData | null;
  loading: boolean;
  error: ApiError | null;
}

const initialState: ComicState = {
  comicData: null,
  loading: true,
  error: null
};

export default function(state = initialState, action: ComicActions) {
  switch (action.type) {
    case ComicActionTypes.GET_COMIC:
      return {
        ...initialState,
        loading: true
      };

    case ComicActionTypes.GET_COMIC_SUCCESS:
      return {
        ...state,
        comicData: action.payload,
        loading: false
      };

    case ComicActionTypes.GET_COMIC_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
