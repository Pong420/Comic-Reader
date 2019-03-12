import { AxiosAdapter, AxiosRequestConfig } from 'axios';

const delay = (ms: number) => new Promise(_ => setTimeout(_, ms));

export type Options = {
  delay?: number;
};

export default function delayAdapterEnhancer(
  adapter: AxiosAdapter
): AxiosAdapter {
  return async (config: AxiosRequestConfig & Options) => {
    if (typeof config.delay !== 'undefined') {
      await delay(config.delay);
    }

    return adapter(config);
  };
}
