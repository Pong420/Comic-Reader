import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { useGetSet } from 'react-use';

export interface ImageProsp {
  active: number;
  images: string[];
  [key: string]: any;
}

interface ImageStatus {
  src: string;
  index: number;
  loaded: boolean;
  error: boolean;
}

type onLoad = (i: number) => void;
type onError = (i: number) => void;
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;

type preload = (
  images: ImageStatus[],
  onLoad: onLoad,
  onError: onError
) => IterableIterator<Promise<void>>;

// TODO:
// - Code Review
// - Error Handling

export function Images({ active, images, ...props }: ImageProsp) {
  const scrollRef = useRef(null);
  const [getImagesDetail, setImagesDetail] = useGetSet<ImageStatus[]>(
    images.map((src, index) => ({
      index,
      src,
      loaded: false,
      error: false
    }))
  );

  function updateArr(index: number, val: any) {
    setImagesDetail([
      ...getImagesDetail().slice(0, index),
      {
        ...getImagesDetail()[index],
        ...val
      },
      ...getImagesDetail().slice(index + 1, getImagesDetail().length)
    ]);
  }

  function onLoad(index: number) {
    updateArr(index, {
      loaded: true
    });
  }

  function onError(index: number) {
    updateArr(index, {
      error: true
    });
  }

  useLayoutEffect(() => {
    scrollRef.current.scrollTop = 0;
    scrollRef.current.focus();
  }, [active]);

  useEffect(() => {
    const { cancel, isCanceled } = runWithCancel<preload>(
      preload,
      getImagesDetail().slice(active),
      i => !isCanceled() && onLoad(i),
      i => !isCanceled() && onError(i)
    );

    return cancel;
  }, [active]);

  return (
    <div className="images" ref={scrollRef} {...props}>
      <div className="image-loading">撈緊...</div>
      {getImagesDetail().map(({ src, loaded, error }, index) => {
        const hidden = index !== active;
        const imgSrc = loaded || !hidden ? src : '';

        if (error) {
          return <div className="image-error">張圖撈唔到，試下下一頁</div>;
        }

        return (
          <img
            key={index}
            src={imgSrc}
            hidden={hidden}
            onLoad={() => onLoad(index)}
            onError={() => imgSrc !== '' && onError(index)}
          />
        );
      })}
    </div>
  );
}

function* preload(images: ImageStatus[], onLoad: onLoad, onError: onError) {
  for (let i = 0; i < images.length; i++) {
    const { src, loaded, index } = images[i];
    const promise = loaded
      ? Promise.resolve(index)
      : loadImage(src).then(() => index);

    yield promise.then(onLoad).catch(() => {
      onError(index);
    });
  }
}

function loadImage(src: string) {
  return new Promise((resolve, reject) => {
    const imgEl = new Image();
    imgEl.src = src;
    imgEl.onload = resolve;
    imgEl.onerror = reject;
  });
}

// https://blog.bloomca.me/2017/12/04/how-to-cancel-your-promise.html
// this is a core function which will run our async code
// and provide cancellation method
function runWithCancel<T extends Function>(
  fn: T,
  ...args: ArgumentTypes<typeof fn>
) {
  const gen = fn(...args);

  let cancelled: boolean = false;
  let cancel: () => void;

  const promise = new Promise((resolve, reject) => {
    cancel = () => {
      cancelled = true;
    };

    onFulfilled();

    function onFulfilled(res?) {
      if (!cancelled) {
        let result;
        try {
          result = gen.next(res);
        } catch (e) {
          return reject(e);
        }
        next(result);

        return null;
      }
    }

    function onRejected(err) {
      let result;
      try {
        result = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(result);
    }

    function next({ done, value }) {
      if (done) {
        return resolve(value);
      }
      // we assume we always receive promises, so no type checks
      return value.then(onFulfilled, onRejected);
    }
  });

  return {
    promise,
    cancel,
    isCanceled: () => cancelled
  };
}
