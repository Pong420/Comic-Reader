import { Observable, from, Observer, of } from 'rxjs';
import { takeUntil, mergeMap, catchError, concatMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import {
  ContentActionTypes,
  ContentActions,
  ImageActionTypes,
  ImageActions,
  PreloadImage
} from '../actions';
import { ImageDetail } from '../../typings';
import { RootState } from '../reducers';

const NO_OF_IMAGES_PRELOAD = 5;

function loadImage(details: ImageDetail): Observable<ImageDetail> {
  return Observable.create(async (observer: Observer<ImageDetail>) => {
    const imgEl = new Image();

    imgEl.src = details.src;
    imgEl.onload = () => {
      observer.next({
        ...details,
        loaded: true,
        dimensions: [imgEl.width, imgEl.height]
      });
    };

    imgEl.onerror = () => {
      observer.error({
        ...details,
        error: true
      });
    };
  });
}

type CombinedActions = ImageActions | ContentActions;

const preloadImageEpic: Epic<CombinedActions, CombinedActions, RootState> = (
  action$,
  state$
) => {
  return action$.pipe(
    ofType<CombinedActions, PreloadImage>(ImageActionTypes.PRELOAD_IMAGES),
    mergeMap(({ payload: startIndex }) => {
      const imagesForPreload = state$.value.images.imagesDetail
        .slice(startIndex, startIndex + NO_OF_IMAGES_PRELOAD)
        .filter(({ loaded, error }) => !loaded && !error);

      return from(imagesForPreload).pipe(
        concatMap(detail =>
          loadImage(detail).pipe(
            mergeMap(payload =>
              of<ImageActions>({
                type: ImageActionTypes.LOAD_IMAGE_SUCCESS,
                payload
              })
            ),
            takeUntil(
              action$.pipe(ofType(ImageActionTypes.LOAD_IMAGE_SUCCESS))
            ),
            catchError(payload =>
              of<ImageActions>({
                type: ImageActionTypes.LOAD_IMAGE_FAIL,
                payload
              })
            )
          )
        ),
        takeUntil(
          action$.pipe(
            ofType<CombinedActions>(
              ImageActionTypes.PRELOAD_IMAGES,
              ContentActionTypes.GET_CONTENT_CANCELED
            )
          )
        )
      );
    })
  );
};

export default [preloadImageEpic];
