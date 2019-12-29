import { useEffect, useState, useCallback, useMemo } from 'react';
import { from, of } from 'rxjs';
import { concatMap, filter, map, catchError } from 'rxjs/operators';
import {
  Response$LoadImage,
  Schema$ImageDetail,
  Schema$ComicContent
} from '../typings';

interface Props {
  pageNo: number;
}

const loadImage = (src: string) =>
  new Promise<Response$LoadImage>((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () =>
      resolve({
        src,
        width: image.width,
        height: image.height
      });
    image.onerror = reject;
  });

export function usePreloadImages({ pageNo }: Props) {
  const [imageDetails, setImageDetails] = useState<Schema$ImageDetail[]>([]);

  const preloadImage = useCallback(
    ({ images }: Schema$ComicContent) =>
      setImageDetails(
        images.map((src, index) => ({
          index,
          src,
          loaded: false,
          error: false
        }))
      ),
    []
  );

  const startIndex = pageNo - 1;
  const images = useMemo(
    () => imageDetails.slice(startIndex, startIndex + 5 + 1),
    [startIndex, imageDetails]
  );

  useEffect(() => {
    const subscription = from(images)
      .pipe(
        filter(({ loaded, error }) => !loaded && !error),
        concatMap(({ src, index, ...rest }) =>
          from(loadImage(src)).pipe(
            map(image => ({
              ...rest,
              ...image,
              index,
              loaded: true
            })),
            catchError(() => of({ ...rest, src, index, error: true }))
          )
        )
      )
      .subscribe(image =>
        setImageDetails(curr => [
          ...curr.slice(0, image.index),
          image,
          ...curr.slice(image.index + 1)
        ])
      );

    return () => {
      subscription.unsubscribe();
    };
  }, [images]);

  return [imageDetails, preloadImage] as const;
}
