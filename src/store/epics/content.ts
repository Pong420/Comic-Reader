import { matchPath } from 'react-router-dom';
import { RouterAction, LOCATION_CHANGE } from 'connected-react-router';
import { from, of } from 'rxjs';
import {
  map,
  catchError,
  takeUntil,
  switchMap,
  concatMap
} from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getContentDataAPI } from '../../apis';
import {
  ContentActions,
  ContentActionTypes,
  GetContent,
  GetContentSuccess,
  GetContentFailure,
  PreloadImageSuccess,
  PreloadImageFailure
} from '../actions/content';
import { RootState } from '../reducers';
import {
  ApiError,
  Schema$ContentData,
  Response$LoadImage
} from '../../typings';
import { PATHS } from '../../constants';

type Actions = ContentActions | RouterAction;
type ContentEpic = Epic<Actions, Actions, RootState>;

const loadImage = (src: string) =>
  new Promise<Response$LoadImage>((res, rej) => {
    const image = new Image();
    image.src = src;
    image.onload = () =>
      res({
        src,
        width: image.width,
        height: image.height
      });
    image.onerror = rej;
  });

const getContentEpic: ContentEpic = action$ => {
  return action$.pipe(
    ofType<Actions, GetContent>(ContentActionTypes.GET_CONTENT),
    switchMap(action =>
      from(getContentDataAPI(action.payload)).pipe(
        map<Schema$ContentData, GetContentSuccess>(payload => ({
          type: ContentActionTypes.GET_CONTENT_SUCCESS,
          payload
        })),
        catchError((payload: ApiError) =>
          of<GetContentFailure>({
            type: ContentActionTypes.GET_CONTENT_FAILURE,
            payload
          })
        )
      )
    )
  );
};

const preloadImageEpic: ContentEpic = (action$, state$) => {
  const getImages = () => {
    const { content, router } = state$.value;
    const match = matchPath<{ pageNo: string }>(router.location.pathname, {
      path: PATHS.CONTENT
    });

    let startIndex = 0;

    if (match && match.params.pageNo) {
      startIndex = Number(match.params.pageNo) - 1;
    }

    return content.imagesDetails
      .slice(startIndex, startIndex + 5)
      .filter(({ loaded, error }) => !loaded && !error);
  };

  return action$.pipe(
    ofType<Actions>(ContentActionTypes.GET_CONTENT_SUCCESS, LOCATION_CHANGE),
    switchMap(() =>
      from(getImages()).pipe(
        concatMap(({ src, index }) =>
          from(loadImage(src)).pipe(
            map<Response$LoadImage, PreloadImageSuccess>(image => ({
              type: ContentActionTypes.PRELOAD_IMAGE_SUCCESS,
              payload: {
                index,
                loaded: true,
                ...image
              }
            })),
            catchError(() =>
              of<PreloadImageFailure>({
                type: ContentActionTypes.PRELOAD_IMAGE_FAILURE,
                payload: {
                  src,
                  index,
                  error: true
                }
              })
            )
          )
        ),
        takeUntil(action$.pipe(ofType<Actions>(LOCATION_CHANGE)))
      )
    )
  );
};

export default [getContentEpic, preloadImageEpic];
