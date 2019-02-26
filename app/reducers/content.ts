import { ContentKeys, ContentTypes } from '../actions/content';

export interface ContentState {
  totalPage: number;
}

const initialState: ContentState = {
  totalPage: 0
};

export default function(state = initialState, action: ContentTypes) {
  switch (action.type) {
    case ContentKeys.SET_TOTAL_PAGE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
