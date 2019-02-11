import axios, { AxiosRequestConfig } from 'axios';
import cheerio from 'cheerio';

const iconv = require('iconv');
const chineseConv = require('chinese-conv');

interface ResponseHeader {
  'content-type': string;
}

export const createAxiosInstance = (options: AxiosRequestConfig) =>
  axios.create({
    responseType: 'arraybuffer',
    transformResponse: [
      (data: any, responseHeader: ResponseHeader) => {
        const matches = responseHeader['content-type'].match(
          /charset=([^&| |;]+)/g
        );
        const encoding = matches
          ? matches[0].split('=')[1].toUpperCase()
          : 'UTF-8';
        const converter = new iconv.Iconv(encoding, 'UTF-8//TRANSLIT//IGNORE');

        let html = converter.convert(data).toString();
        html = chineseConv.tify(html);
        html = cheerio.load(html);

        return html;
      }
    ],
    ...options
  });

// return api as AxiosInstance;
