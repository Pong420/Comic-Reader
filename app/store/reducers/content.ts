import { ContentActions, ContentActionTypes } from '../actions/content';
import { ContentData } from '../../../typing';

export interface ContentState extends ContentData {
  totalPage: number;
}

const initialState: ContentState = {
  images: [],
  prevId: 0,
  nextId: 0,
  totalPage: 0
};

export default function(state = initialState, action: ContentActions) {
  switch (action.type) {
    case ContentActionTypes.GET_CONTENT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        totalPage: action.payload.images.length
      };

    default:
      return state;
  }
}
