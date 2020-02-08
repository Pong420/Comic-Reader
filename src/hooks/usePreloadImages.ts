import { useEffect, useState, useMemo, useRef } from 'react';
import { from, of, Subscription } from 'rxjs';
import { concatMap, filter, map, catchError } from 'rxjs/operators';
import {
  Response$LoadImage,
  Schema$ImageDetail,
  Schema$ComicContent
} from '../typings';

// TODO: review

interface Props {
  comicID: string;
  pageNo: number;
}

const loadImage = async (src: string) =>
  new Promise<Response$LoadImage>(async (resolve, reject) => {
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

export function usePreloadImages({ comicID, pageNo }: Props) {
  const [imagesDetail, setimagesDetail] = useState<Schema$ImageDetail[]>([]);

  const subscription = useRef(new Subscription());

  const { preloadImage, clearPreloadImage } = useMemo(() => {
    const preloadImage = ({ images }: Schema$ComicContent) => {
      setimagesDetail(
        images.map((src, index) => ({
          index,
          src,
          loaded: false,
          error: false
        }))
      );
    };

    const clearPreloadImage = () => setimagesDetail([]);

    return { preloadImage, clearPreloadImage };
  }, []);

  const startIndex = pageNo - 1;
  const images = useMemo(
    () => imagesDetail.slice(startIndex, startIndex + 5 + 1),
    [startIndex, imagesDetail]
  );

  useEffect(() => {
    subscription.current = from(images)
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
      .subscribe(image => {
        setimagesDetail(curr => [
          ...curr.slice(0, image.index),
          image,
          ...curr.slice(image.index + 1)
        ]);
      });

    return () => {
      subscription.current.unsubscribe();
    };
  }, [images]);

  useEffect(() => {
    if (comicID) {
      return () => setimagesDetail([]);
    }
  }, [comicID]);

  return { imagesDetail, preloadImage, clearPreloadImage };
}
