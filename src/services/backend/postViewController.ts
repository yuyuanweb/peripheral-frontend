// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** doPostView POST /api/post_view/ */
export async function doPostViewUsingPost(
  body: API.PostViewAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseint>('/api/post_view/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
