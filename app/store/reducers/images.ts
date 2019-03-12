import {
  ContentActions,
  ContentActionTypes,
  ImageActions,
  ImageActionTypes
} from '../actions';
import { ImageDetail, ImageDimenClassName } from '../../../typing';

const IMAGE_DIMEN_CLASSNAME_KEY = 'IMAGE_DIMEN_CLASSNAME_KEY';

export interface ImagesState {
  imagesDetail: ImageDetail[];
  imageDimenClassName: ImageDimenClassName;
}

const initialState: ImagesState = {
  imagesDetail: [],
  imageDimenClassName:
    <ImageDimenClassName>localStorage.getItem(IMAGE_DIMEN_CLASSNAME_KEY) || ''
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

    case ImageActionTypes.LOAD_IMAGE_SUCCESS:
    case ImageActionTypes.LOAD_IMAGE_FAIL:
      return {
        ...state,
        imagesDetail: updateImageDetail(state.imagesDetail, action.payload)
      };

    case ImageActionTypes.SWITCH_IMAGE_DIMENSIONS:
      const imageDimenClassName =
        action.payload || ImageDimenClassNameMaping(state.imageDimenClassName);

      console.log(imageDimenClassName, action.payload);

      localStorage.setItem(IMAGE_DIMEN_CLASSNAME_KEY, imageDimenClassName);

      return {
        ...state,
        imageDimenClassName
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

export function ImageDimenClassNameMaping(
  current: ImageDimenClassName
): ImageDimenClassName {
  switch (current) {
    case '':
      return 'fit-to-page';

    case 'fit-to-page':
      return 'fit-to-width';

    case 'fit-to-width':
      return '';

    default:
      return '';
  }
}
