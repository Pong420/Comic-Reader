import axios, { AxiosRequestConfig } from 'axios';
import {
  cacheAdapterEnhancer,
  throttleAdapterEnhancer
} from 'axios-extensions';
import cheerio from 'cheerio';

const chineseConv = require('chinese-conv'); // tslint:disable-line

export const createAxiosInstance = (options: AxiosRequestConfig) =>
  axios.create({
    headers: {
      'Cache-Control': 'no-cache'
    },
    responseType: 'text',
    transformResponse: [
      (response: string | CheerioStatic) => {
        if (typeof response === 'string') {
          const html: string = chineseConv.tify(response);

          return cheerio.load(html, { decodeEntities: false });
        }

        return response;
      }
    ],
    adapter: throttleAdapterEnhancer(
      cacheAdapterEnhancer(axios.defaults.adapter!)
    ),
    ...options
  });
