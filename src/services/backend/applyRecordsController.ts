// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addApplyRecords POST /api/applyRecords/add */
export async function addApplyRecordsUsingPost(
  body: API.ApplyRecordsAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/applyRecords/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** applyApplyRecords POST /api/applyRecords/apply */
export async function applyApplyRecordsUsingPost(
  body: API.ApplyRecordsApplyRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/applyRecords/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** approveApplyRecords POST /api/applyRecords/approve */
export async function approveApplyRecordsUsingPost(
  body: API.ApplyRecordsApproveRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/applyRecords/approve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteApplyRecords POST /api/applyRecords/delete */
export async function deleteApplyRecordsUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/applyRecords/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getApplyRecordsById GET /api/applyRecords/get */
export async function getApplyRecordsByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getApplyRecordsByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseApplyRecords>('/api/applyRecords/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getAllStatus POST /api/applyRecords/getAllStatus */
export async function getAllStatusUsingPost(
  body: API.ApplyStatusRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseMaplong>('/api/applyRecords/getAllStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getApplyRecords GET /api/applyRecords/getApplyRecords */
export async function getApplyRecordsUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListApplyRecords>('/api/applyRecords/getApplyRecords', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getStatus GET /api/applyRecords/getStatus */
export async function getStatusUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStatusUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseint>('/api/applyRecords/getStatus', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listApplyRecords POST /api/applyRecords/list */
export async function listApplyRecordsUsingPost(
  body: API.ApplyRecordsQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListApplyRecords>('/api/applyRecords/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listApplyRecordsByPage POST /api/applyRecords/list/page */
export async function listApplyRecordsByPageUsingPost(
  body: API.ApplyRecordsQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageApplyRecords>('/api/applyRecords/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateApplyRecords POST /api/applyRecords/update */
export async function updateApplyRecordsUsingPost(
  body: API.ApplyRecordsUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/applyRecords/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
