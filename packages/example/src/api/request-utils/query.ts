import { RequestObject, RequestType } from "../types";
import axios, { AxiosResponse } from "axios";
import { TIME_OUT } from "../constant";
import * as querystring from "querystring";
import { BACKEND_AUTH, BACKEND_DOMAIN } from "../../config";

const fetchResult = (
  url: string,
  {method, headers, body}: RequestObject,
): Promise<AxiosResponse> => {
  if (method === RequestType.Get) {
    return axios.get(url, {
      headers,
      params: body,
      timeout: TIME_OUT,
    });
  }
  const params = querystring.stringify(body);
  return axios.post(url, params, {
    headers,
    timeout: TIME_OUT,
  });
};

const objectKeysToCamelCase = (snake_case_object: Object): any => {
  if (Array.isArray(snake_case_object)) {
    return snake_case_object.map(value => objectKeysToCamelCase(value));
  }
  // Object
  return Object.fromEntries(Object.entries(snake_case_object).map(([key, value]) => {
    const camelCaseKey = key.replace(/[-|_]([a-z])/g, (g) => g[1].toUpperCase())
    if(typeof value === "object") {
      return [camelCaseKey, objectKeysToCamelCase(value)];
    }
    return [camelCaseKey, value];
  }));
};

export const query = async (
  endPoint: string,
  method: RequestType,
  headers: Record<string, string>,
  body?: Record<string, any>,
  mfp = ''
) => {
  const requestObj = {
    method,
    headers: {
      ...headers,
      Authorization: BACKEND_AUTH,
      xfp: mfp || "e3b0c442"
    },
    body,
  }
  try {
    const url = `${BACKEND_DOMAIN}${endPoint}`
    const response = await fetchResult(url, requestObj);
    const value = response.data;
    if (value.success) {
      return objectKeysToCamelCase(value.result);
    }
    throw value;
  } catch (e: any) {
    if (e?.code === 'ECONNABORTED') {
      throw "timeout";
    }
    throw e;
  }
};