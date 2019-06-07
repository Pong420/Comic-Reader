import { from, of, empty } from 'rxjs';
import {
  map,
  catchError,
  takeUntil,
  switchMap,
  withLatestFrom,
  concatMap
} from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getContentDataAPI } from '../../apis';
import {
  ContentActions,
  ContentActionTypes,
  GetContent,
  GetContentSuccess,
  GetContentFail,
  PreloadImageSuccess,
  PreloadImage
} from '../actions/content';
import {
  ApiError,
  Schema$ContentData,
  Response$LoadImage
} from '../../typings';
import { RootState } from '../reducers';

type ContentEpic = Epic<ContentActions, ContentActions, RootState>;

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
    ofType<ContentActions, GetContent>(ContentActionTypes.GET_CONTENT),
    switchMap(action =>
      from(getContentDataAPI(action.payload)).pipe(
        map<Schema$ContentData, GetContentSuccess>(payload => ({
          type: ContentActionTypes.GET_CONTENT_SUCCESS,
          payload
        })),
        catchError((payload: ApiError) =>
          of<GetContentFail>({
            type: ContentActionTypes.GET_CONTENT_FAIL,
            payload
          })
        ),
        takeUntil(action$.pipe(ofType(ContentActionTypes.GET_CONTENT_CANCELED)))
      )
    )
  );
};

const preloadImageEpic: ContentEpic = (action$, state$) => {
  const images$ = state$.pipe(map(({ content }) => content.imagesDetails));

  return action$.pipe(
    ofType<ContentActions, PreloadImage>(ContentActionTypes.PRELOAD_IMAGE),
    withLatestFrom(images$),
    concatMap(([{ payload }, images]) =>
      from(images.slice(payload, payload + 5)).pipe(
        concatMap(({ src, loaded }, _index) => {
          const index = payload + _index;

          if (loaded) {
            return empty();
          }

          return from(loadImage(src)).pipe(
            map<Response$LoadImage, PreloadImageSuccess>(image => ({
              type: ContentActionTypes.PRELOAD_IMAGE_SUCCESS,
              payload: {
                index,
                image: {
                  ...image,
                  loaded: true
                }
              }
            }))
          );
        }),
        takeUntil(
          action$.pipe(
            ofType(
              ContentActionTypes.PRELOAD_IMAGE,
              ContentActionTypes.GET_CONTENT_CANCELED
            )
          )
        )
      )
    )
  );
};

export default [getContentEpic, preloadImageEpic];
