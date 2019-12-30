import { ApiError } from '../typings';

export function isAxiosErrorLike(obj: any): obj is Exclude<ApiError, Error> {
  return !!obj.response;
}

export function getErrorMessage(error: ApiError): string {
  if (isAxiosErrorLike(error)) {
    return error.response.statusText;
  }

  return error.message;
}
