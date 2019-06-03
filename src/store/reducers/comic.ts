import { ComicActionTypes, ComicActions } from '../actions/comic';
import { Schema$ComicData, ApiRequestStatus } from '../../typings';

export interface ComicState extends ApiRequestStatus {
  comicData: Partial<Schema$ComicData>;
}

const initialState: ComicState = {
  comicData: {},
  error: false,
  loading: false
};

export default function(
  state = initialState,
  action: ComicActions
): ComicState {
  switch (action.type) {
    case ComicActionTypes.GET_COMIC:
      return {
        ...initialState,
        loading: true
      };

    case ComicActionTypes.GET_COMIC_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        comicData: action.payload
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
