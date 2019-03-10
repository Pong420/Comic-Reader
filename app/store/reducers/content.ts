import { ContentActions, ContentActionTypes } from '../actions/content';
import { ContentData, ApiError } from '../../../typing';

export interface ContentState extends ContentData {
  loading: boolean;
  error: ApiError | null;
  totalPage: number;
}

const initialState: ContentState = {
  error: null,
  loading: true,
  images: [],
  prevId: 0,
  nextId: 0,
  totalPage: 0
};

export default function(state = initialState, action: ContentActions) {
  switch (action.type) {
    case ContentActionTypes.GET_CONTENT:
      return {
        ...state,
        loading: true
      };

    case ContentActionTypes.GET_CONTENT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        totalPage: action.payload.images.length
      };

    case ContentActionTypes.GET_CONTENT_FAIL:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
