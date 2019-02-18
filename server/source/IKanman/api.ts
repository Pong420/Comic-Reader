import { createAxiosInstance } from '../../axios.config';

export const api = createAxiosInstance({
  baseURL: 'https://tw.manhuagui.com',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
  }
});
