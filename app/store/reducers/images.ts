import {
  ContentActions,
  ContentActionTypes,
  ImageActions,
  ImageActionTypes
} from '../actions';
import { ImageDetail } from '../../../typing';

const FIT_TO_PAGE_KEY = 'FIT_TO_PAGE_KEY';

export interface ImagesState {
  imagesDetail: ImageDetail[];
  fitToPage: boolean;
}

const initialState: ImagesState = {
  imagesDetail: [],
  fitToPage: localStorage.getItem(FIT_TO_PAGE_KEY) === 'true'
};

export default function(
  state = initialState,
  action: ContentActions | ImageActions
) {
  switch (action.type) {
    case ContentActionTypes.GET_CONTENT_SUCCESS:
      return {
        ...state,
        imagesDetail: action.payload.images.map((src, index) => ({
          index,
          src,
          loaded: false,
          error: false,
          dimensions: []
        }))
      };

    case ImageActionTypes.PELOAD_IMAGE_SUCCESS:
    case ImageActionTypes.PELOAD_IMAGE_FAIL:
      return {
        ...state,
        imagesDetail: updateImageDetail(state.imagesDetail, action.payload)
      };

    case ImageActionTypes.TOGGLE_FIT_TO_PAGE:
      const fitToPage = !state.fitToPage;

      localStorage.setItem(FIT_TO_PAGE_KEY, JSON.stringify(fitToPage));

      return {
        ...state,
        fitToPage
      };

    default:
      return state;
  }
}

function updateImageDetail(arr: ImageDetail[], detail: ImageDetail) {
  const result = arr.slice();
  result[detail.index] = detail;
  return result;
}
