import axios, { AxiosRequestConfig } from 'axios';
import cheerio from 'cheerio';

const chineseConv = require('chinese-conv');

export const createAxiosInstance = (options: AxiosRequestConfig) =>
  axios.create({
    responseType: 'text',
    transformResponse: [
      (response: string) => {
        const html = chineseConv.tify(response);

        return cheerio.load(html);
      }
    ],
    ...options
  });
