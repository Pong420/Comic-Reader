import {
  ContentActions,
  ContentActionTypes,
  ImageActions,
  ImageActionTypes
} from '../actions';
import { ImageDetail, ImageDimenClassName } from '../../../typing';

const IMAGE_DIMEN_CLASSNAME_KEY = 'IMAGE_DIMEN_CLASSNAME_KEY';
const className =
  <ImageDimenClassName>localStorage.getItem(IMAGE_DIMEN_CLASSNAME_KEY) || '';

export interface ImagesState {
  imagesDetail: ImageDetail[];
  imageDimenClassName: ImageDimenClassName;
  nextImageDimenClassName: ImageDimenClassName;
}

const initialState: ImagesState = {
  imagesDetail: [],
  imageDimenClassName: className,
  nextImageDimenClassName: mapping(className)
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
        action.payload || mapping(state.imageDimenClassName);

      localStorage.setItem(IMAGE_DIMEN_CLASSNAME_KEY, imageDimenClassName);

      return {
        ...state,
        imageDimenClassName,
        nextImageDimenClassName: mapping(imageDimenClassName)
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

function mapping(current: ImageDimenClassName): ImageDimenClassName {
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
