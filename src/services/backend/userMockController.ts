// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** userLoginMock POST /api/user/mock/login */
export async function userLoginMockUsingPost(
  body: API.UserLoginMockRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLoginUserVO>('/api/user/mock/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
