import { from, of } from 'rxjs';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import {
  ImageActionTypes,
  ImageActions,
  PreloadImage,
  preloadImage,
  loadImageSuccess
} from '../actions/images';
import { ImageDetail } from '../../../typing';

async function loadImage(details: ImageDetail) {
  return new Promise<ImageDetail>((resolve, reject) => {
    const imgEl = new Image();

    imgEl.src = details.src;
    imgEl.onload = () =>
      resolve({
        ...details,
        loaded: true
      });

    imgEl.onerror = () => {
      reject({
        ...details,
        error: true
      });
    };
  });
}

const preloadImageEpic: Epic<ImageActions> = action$ =>
  action$.pipe(
    ofType<ImageActions, PreloadImage>(ImageActionTypes.PRELOAD_IMAGE),
    mergeMap(action => {
      const { imagesDetail, startIndex } = action.payload;

      return from(loadImage(imagesDetail[startIndex])).pipe(
        mergeMap(detail => {
          imagesDetail[startIndex] = detail;

          const nextIndex = imagesDetail.findIndex(
            ({ loaded, error }) => !loaded && !error
          );
          const hasNext = !!imagesDetail[nextIndex];
          const res: any[] = [loadImageSuccess(detail)];
          hasNext && res.push(preloadImage(imagesDetail, nextIndex));
          return of(...res);
        }),
        takeUntil(action$.pipe(ofType(ImageActionTypes.PRELOAD_IMAGE_STOPPED)))
      );
    })
  );

export default [preloadImageEpic];
