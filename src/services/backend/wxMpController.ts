// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** check GET /api/wx_mp/ */
export async function checkUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/wx_mp/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** receiveMessage POST /api/wx_mp/ */
export async function receiveMessageUsingPost(options?: { [key: string]: any }) {
  return request<any>('/api/wx_mp/', {
    method: 'POST',
    ...(options || {}),
  });
}

/** getSign GET /api/wx_mp/getSign */
export async function getSignUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSignUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseWxJsapiSignature>('/api/wx_mp/getSign', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** setMenu GET /api/wx_mp/setMenu */
export async function setMenuUsingGet(options?: { [key: string]: any }) {
  return request<string>('/api/wx_mp/setMenu', {
    method: 'GET',
    ...(options || {}),
  });
}
