import detectPort from 'detect-port';

type PORT = number | string;

export const getFreePort = (port: PORT) => {
  return detectPortPromise(port);
};

export const detectPortPromise = (port: PORT) =>
  new Promise<PORT>((resolve, reject) =>
    detectPort(port, (err, _port: PORT) => {
      if (err) {
        reject(err);
      }

      if (port == _port) {
        resolve(port);
      } else {
        resolve(_port);
      }
    })
  );
