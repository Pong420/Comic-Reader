interface RunWithCancel {
  promise: Promise<any>;
  cancel: () => void;
  isCancelled: () => boolean;
}

// https://blog.bloomca.me/2017/12/04/how-to-cancel-your-promise.html
// this is a core function which will run our async code
// and provide cancellation method
export function runWithCancel<T extends Function>(
  fn: T,
  ...args: ArgumentTypes<typeof fn>
): RunWithCancel {
  const gen = fn(...args);

  let cancelled: boolean = false;
  const cancel = () => {
    cancelled = true;
  };

  const promise = new Promise((resolve, reject) => {
    onFulfilled();

    function onFulfilled(res?: IteratorResult<any>) {
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

    function onRejected(err: Error) {
      let result;
      try {
        result = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(result);
    }

    function next({ done, value }: IteratorResult<any>) {
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
    isCancelled: () => cancelled
  };
}
