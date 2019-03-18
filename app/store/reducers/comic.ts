import { ComicActions, ComicActionTypes } from '../actions/comic';
import { ComicData, ApiError } from '../../../typing';

export interface ComicState {
  comicData: ComicData;
  loading: boolean;
  error: ApiError | null;
}

const initialState: ComicState = {
  comicData: {} as ComicData,
  loading: true,
  error: null
};

export default function(state = initialState, action: ComicActions) {
  switch (action.type) {
    case ComicActionTypes.GET_COMIC:
      return {
        ...state,
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

    case ComicActionTypes.GET_COMIC_CANCELED:
      return {
        ...state,
        loading: false
      };

    case ComicActionTypes.RESET_COMIC_STATE:
      return {
        ...initialState
      };

    default:
      return state;
  }
}
