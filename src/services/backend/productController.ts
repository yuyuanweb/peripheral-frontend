// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addProduct POST /api/product/add */
export async function addProductUsingPost(
  body: API.ProductAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/product/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteProduct POST /api/product/delete */
export async function deleteProductUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/product/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** genProductSign GET /api/product/gen/sign */
export async function genProductSignUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.genProductSignUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseProductSignResponse>('/api/product/gen/sign', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getProductById GET /api/product/get */
export async function getProductByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseProduct>('/api/product/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listProduct POST /api/product/list */
export async function listProductUsingPost(
  body: API.ProductQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListProduct>('/api/product/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listProductByPage POST /api/product/list/page */
export async function listProductByPageUsingPost(
  body: API.ProductQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageProduct>('/api/product/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listProductVOByPage POST /api/product/list/page/vo */
export async function listProductVoByPageUsingPost(
  body: API.ProductQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageProductVO>('/api/product/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateProduct POST /api/product/update */
export async function updateProductUsingPost(
  body: API.ProductUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/product/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
