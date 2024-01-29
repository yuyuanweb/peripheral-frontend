// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** callback GET /api/zsxq/notify */
export async function callbackUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseobject>('/api/zsxq/notify', {
    method: 'GET',
    ...(options || {}),
  });
}
