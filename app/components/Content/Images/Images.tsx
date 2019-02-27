import React, {
  useRef,
  useLayoutEffect,
  useEffect,
  KeyboardEvent
} from 'react';
import { useGetSet } from 'react-use';
import { runWithCancel } from '../../../utils/runWithCancel';

// TODO:
// - Error Handling

export interface ImageProsp {
  images: string[];
  activeIndex: number;
  onKeyDown: (evt: KeyboardEvent<HTMLDivElement>) => void;
}

interface ImageStatus {
  src: string;
  index: number;
  loaded: boolean;
  error: boolean;
}

type onLoad = (i: number) => void;
type onError = (i: number) => void;

type preload = (
  images: ImageStatus[],
  onLoad: onLoad,
  onError: onError
) => IterableIterator<Promise<void>>;

export function Images({ activeIndex, images, onKeyDown }: ImageProsp) {
  const scrollRef = useRef<HTMLDivElement>(null);
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
    scrollRef.current!.scrollTop = 0;
    scrollRef.current!.focus();
  }, [activeIndex]);

  useEffect(() => {
    const { cancel, isCancelled } = runWithCancel<preload>(
      preload,
      getImagesDetail().slice(activeIndex),
      i => {
        !isCancelled() && onLoad(i);
      },
      i => {
        !isCancelled() && onError(i);
      }
    );

    return cancel;
  }, [activeIndex]);

  return (
    <div className="images" ref={scrollRef} tabIndex={0} onKeyDown={onKeyDown}>
      <div className="image-loading">撈緊...</div>
      {getImagesDetail().map(({ src, loaded, error }, index) => {
        const hidden = index !== activeIndex;
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
