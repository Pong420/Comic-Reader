import { AxiosError } from 'axios';
import { ComicActions, ComicActionTypes } from '../actions/comic';
import { ComicData } from '../../../typing';

export interface ComicState {
  comicData: ComicData;
  loading: boolean;
  error: AxiosError | null;
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

    case ComicActionTypes.RESET_COMIC_STATE:
      return {
        ...initialState
      };

    default:
      return state;
  }
}
