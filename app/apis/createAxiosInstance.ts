import axios, { AxiosRequestConfig } from 'axios';
import {
  cacheAdapterEnhancer,
  throttleAdapterEnhancer
} from 'axios-extensions';

import cheerio from 'cheerio';

const chineseConv = require('chinese-conv');

export const createAxiosInstance = (options: AxiosRequestConfig) =>
  axios.create({
    responseType: 'text',
    transformResponse: [
      (response: string | CheerioStatic) => {
        if (typeof response === 'string') {
          const html = chineseConv.tify(response);

          return cheerio.load(html);
        }

        return response;
      }
    ],
    adapter: throttleAdapterEnhancer(
      cacheAdapterEnhancer(axios.defaults.adapter)
    ),
    ...options
  });
