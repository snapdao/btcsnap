import { RequestObject, RequestType } from '../types';
import axios, { AxiosResponse } from 'axios';
import { TIME_OUT } from '../constant';
import * as querystring from 'querystring';
import { SNAP_BACKEND_AUTH, SNAP_BACKEND_DOMAIN } from '../../config';
import { getPassword } from '../../services/LightningService/getUserInfo';
import { getAppStore } from '../../mobx';
import { LightningAppStatus } from '../../mobx/runtime';

const fetchResult = (
  url: string,
  { method, headers, body }: RequestObject,
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

export interface ErrorResponse {
  success: boolean
  error_code?: string;
  error_message?: string;
  error_description?: string;
}

const objectKeysToCamelCase = (snake_case: Record<string, any>): any => {
  if (
    typeof snake_case !== 'object' ||
    snake_case === null ||
    snake_case === undefined
  ) {
    return snake_case;
  }
  if (Array.isArray(snake_case)) {
    return snake_case.map((value) => objectKeysToCamelCase(value));
  }
  // Object
  return Object.fromEntries(
    Object.entries(snake_case).map(([key, value]) => {
      const camelCaseKey = key.replace(/[-|_]([a-z])/g, (g) =>
        g[1].toUpperCase(),
      );
      if (typeof value === 'object') {
        return [camelCaseKey, objectKeysToCamelCase(value)];
      }
      return [camelCaseKey, value];
    }),
  );
};

export const query = async (
  endPoint: string,
  method: RequestType,
  headers: Record<string, string>,
  body?: Record<string, any>,
) => {
  const requestObj = {
    method,
    headers: {
      Authorization: `Basic ${SNAP_BACKEND_AUTH}`,
      ...headers,
    },
    body,
  };
  try {
    const url = `${SNAP_BACKEND_DOMAIN}${endPoint}`;
    const response = await fetchResult(url, requestObj);
    const value = response.data;
    if (value.success) {
      return objectKeysToCamelCase(value.result);
    }
    throw value;
  } catch (e: any) {
    const statusCode = e.response?.status;
    if (e?.code === 'ECONNABORTED') {
      throw 'timeout';
    }
    if (statusCode === 401) {
      const { runtime: { lightningAppStatus, setLightningAppStatus } } = getAppStore();
      if (lightningAppStatus !== LightningAppStatus.Expired) {
        setLightningAppStatus(LightningAppStatus.Expired);
      }
      throw 'unauthorized';
    }
    throw e;
  }
};

export const queryWithCurrentUserInfo = async (
  endPoint: string,
  method: RequestType,
  headers: Record<string, string>,
  body: Record<string, any> = {},
) => {
  const {
    lightning: { current },
  } = getAppStore();
  const userId = body.user_id || current!.userId;
  const userPassword = await getPassword(userId);

  if (!userPassword) throw new Error('not found user password');
  const bodyWithUserInfo = {
    ...body,
    user_id: userId,
    user_password: userPassword,
  };
  return query(endPoint, method, headers, bodyWithUserInfo);
};
