// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 支付成功回调通知处理 POST /api/product_order/notify/pay */
export async function parseOrderNotifyResultUsingPost(
  body: API.ProductOrderPaySucceedInfo,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsestring>('/api/product_order/notify/pay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
