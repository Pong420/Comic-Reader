import React, { useRef, useLayoutEffect, useState } from 'react';

export interface ImageProsp {
  active: number;
  images: string[];
  [key: string]: any;
}

interface ImageStatus {
  src: string;
  loaded: boolean;
  error: boolean;
}

export function Images({ active, images, ...props }: ImageProsp) {
  const scrollRef = useRef(null);
  const [imagesDetail, setImagesDetail] = useState<ImageStatus[]>(
    images.map(src => ({
      src,
      loaded: false,
      error: false
    }))
  );

  function updateArr(index: number, val: any) {
    setImagesDetail([
      ...imagesDetail.slice(0, index),
      {
        ...imagesDetail[index],
        ...val
      },
      ...imagesDetail.slice(index + 1, imagesDetail.length)
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

    onLoad(active + 1);
  }, [active]);

  return (
    <div className="images" ref={scrollRef} {...props}>
      <div className="image-loading">撈緊...</div>
      {imagesDetail.map(({ src, loaded, error }, index) => {
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

// function* preload(images: ImageStatus[]) {
//   for (let i = 0; i < images.length; i++) {
//     const { src, loaded } = images[i];
//     const promise = loaded
//       ? Promise.resolve(i)
//       : delay(1000).then(() => loadImage(src).then(() => i));

//     yield promise;
//   }
// }

// function loadImage(src: string) {
//   return new Promise((resolve, reject) => {
//     const imgEl = new Image();
//     imgEl.src = src;
//     imgEl.onload = resolve;
//     imgEl.onerror = reject;
//   });
// }

// // https://blog.bloomca.me/2017/12/04/how-to-cancel-your-promise.html
// // this is a core function which will run our async code
// // and provide cancellation method
// function runWithCancel(fn, ...args) {
//   const gen = fn(...args);
//   let cancelled;
//   let cancel;
//   const promise = new Promise((resolve, reject) => {
//     // define cancel function to return it from our fn
//     cancel = () => {
//       cancelled = true;
//       reject({ reason: 'cancelled' });
//     };

//     onFulfilled();

//     function onFulfilled(res?) {
//       if (!cancelled) {
//         let result;
//         try {
//           result = gen.next(res);
//         } catch (e) {
//           return reject(e);
//         }
//         next(result);

//         return null;
//       }
//     }

//     function onRejected(err) {
//       let result;
//       try {
//         result = gen.throw(err);
//       } catch (e) {
//         return reject(e);
//       }
//       next(result);
//     }

//     function next({ done, value }) {
//       if (done) {
//         return resolve(value);
//       }
//       // we assume we always receive promises, so no type checks
//       return value.then(onFulfilled, onRejected);
//     }
//   });

//   return { promise, cancel };
// }
