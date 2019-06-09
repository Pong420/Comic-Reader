import { ContentActionTypes, ContentActions } from '../actions/content';
import {
  Schema$ContentData,
  Schema$ImageDetail,
  ApiRequestStatus
} from '../../typings';

export interface ContentState extends Schema$ContentData, ApiRequestStatus {
  imagesDetails: Schema$ImageDetail[];
  fitToPage: boolean;
}

const FIT_TO_PAGE_KEY = 'COMIC_READER_FIT_TO_PAGE';

const initialState: ContentState = {
  loading: false,
  error: false,
  images: [],
  imagesDetails: [],
  fitToPage: localStorage.getItem(FIT_TO_PAGE_KEY) === 'true'
};

export default function(
  state = initialState,
  action: ContentActions
): ContentState {
  switch (action.type) {
    case ContentActionTypes.GET_CONTENT:
      return {
        ...initialState,
        loading: true,
        fitToPage: state.fitToPage
      };

    case ContentActionTypes.GET_CONTENT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: false,
        loading: false,
        imagesDetails: action.payload.images.map((src, index) => ({
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

    case ContentActionTypes.TOGGLE_FIT_TO_PAGE:
      const fitToPage =
        typeof action.payload !== 'undefined'
          ? !!action.payload
          : !state.fitToPage;

      localStorage.setItem(FIT_TO_PAGE_KEY, JSON.stringify(fitToPage));

      return {
        ...state,
        fitToPage
      };

    default:
      return state;
  }
}
