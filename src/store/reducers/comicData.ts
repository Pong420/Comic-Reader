import { ComicDataActions, ComicDataActionTypes } from '../actions/comicData';
import { Schema$ComicData, ApiRequestStatus } from '../../typings';

export interface State extends ApiRequestStatus, Partial<Schema$ComicData> {}

const initialState: State = {
  error: null,
  loading: false
};

export default function(state = initialState, action: ComicDataActions): State {
  switch (action.type) {
    case ComicDataActionTypes.GET_COMIC_DATA:
      return {
        ...initialState,
        loading: true
      };

    case ComicDataActionTypes.GET_COMIC_DATA_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        ...action.payload
      };

    case ComicDataActionTypes.GET_COMIC_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
