import axios, { AxiosRequestConfig } from 'axios';
import {
  cacheAdapterEnhancer,
  throttleAdapterEnhancer
} from 'axios-extensions';
import cheerio from 'cheerio';
import delayAdapterEnhancer from '../utils/delayAdapterEnhancer';

const chineseConv = require('chinese-conv'); // tslint:disable-line

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
    delay: 1000,
    adapter: delayAdapterEnhancer(
      throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter!))
    ),
    ...options
  });
