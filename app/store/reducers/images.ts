import {
  ContentActions,
  ContentActionTypes,
  ImageActions,
  ImageActionTypes
  // ImageActionTypes
} from '../actions';
import { ImageDetail } from '../../../typing';

export interface ImagesState {
  imagesDetail: ImageDetail[];
}

const initialState: ImagesState = {
  imagesDetail: []
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
          error: false
        }))
      };

    case ImageActionTypes.LOAD_IMAGE_SUCCESS:
    case ImageActionTypes.LOAD_IMAGE_FAIL:
      return {
        ...state,
        imagesDetail: updateImageDetail(state.imagesDetail, action.payload)
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
