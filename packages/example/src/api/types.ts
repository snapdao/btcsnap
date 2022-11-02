export enum RequestType {
  Get = 'GET',
  Post = 'POST',
}

export enum PostDataFormat {
  Json = 'json',
  XWwwFormUrlEncoded = 'x-www-form-urlencoded',
}

export enum LoadingStatus {
  pending,
  success,
  failed,
}

export type apiResult<T> = {
  loadingStatus: LoadingStatus;
  result: T | {};
  error: Error | {};
};

export type RequestObject = {
  method: RequestType;
  headers: Record<string, any>;
  body?: Record<string, any>;
};
