import * as axios from 'axios';

declare module 'axios-extensions';

declare module 'axios' {
  interface AxiosRequestConfig {
    cache?: boolean;
    delay?: number;
  }
}
