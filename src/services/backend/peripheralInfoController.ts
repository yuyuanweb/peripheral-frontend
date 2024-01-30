// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addPeripheralInfo POST /api/peripheralInfo/add */
export async function addPeripheralInfoUsingPost(
  body: API.PeripheralInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/peripheralInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deletePeripheralInfo POST /api/peripheralInfo/delete */
export async function deletePeripheralInfoUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/peripheralInfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getPeripheralInfoById GET /api/peripheralInfo/get */
export async function getPeripheralInfoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPeripheralInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePeripheralInfo>('/api/peripheralInfo/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listPeripheralInfo POST /api/peripheralInfo/list */
export async function listPeripheralInfoUsingPost(
  body: API.PeripheralInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListPeripheralInfo>('/api/peripheralInfo/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listPeripheralInfoByPage POST /api/peripheralInfo/list/page */
export async function listPeripheralInfoByPageUsingPost(
  body: API.PeripheralInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePeripheralInfo>('/api/peripheralInfo/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listPeripheralInfoVOByPage POST /api/peripheralInfo/list/page/vo */
export async function listPeripheralInfoVoByPageUsingPost(
  body: API.PeripheralInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePeripheralInfoVO>('/api/peripheralInfo/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updatePeripheralInfo POST /api/peripheralInfo/update */
export async function updatePeripheralInfoUsingPost(
  body: API.PeripheralInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/peripheralInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
