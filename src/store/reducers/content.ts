import { ContentActionTypes, ContentActions } from '../actions/content';
import {
  Schema$ContentData,
  Schema$ImageDetail,
  ApiRequestStatus
} from '../../typings';

export interface ContentState extends Schema$ContentData, ApiRequestStatus {
  imagesDetails: Schema$ImageDetail[];
}

const initialState: ContentState = {
  loading: false,
  error: false,
  images: [],
  imagesDetails: []
};

export default function(
  state = initialState,
  action: ContentActions
): ContentState {
  switch (action.type) {
    case ContentActionTypes.GET_CONTENT:
      return {
        ...initialState,
        loading: true
      };

    case ContentActionTypes.GET_CONTENT_SUCCESS:
      const { images } = action.payload;

      return {
        ...state,
        error: false,
        loading: false,
        images,
        imagesDetails: images.map((src, index) => ({
          index,
          src,
          loaded: false,
          error: false
        }))
      };

    case ContentActionTypes.GET_CONTENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case ContentActionTypes.PRELOAD_IMAGE_SUCCESS:
      return (() => {
        const { index } = action.payload;
        const imagesDetails = state.imagesDetails.slice();
        imagesDetails[index] = { ...imagesDetails[index], ...action.payload };

        return {
          ...state,
          imagesDetails
        };
      })();

    default:
      return state;
  }
}
