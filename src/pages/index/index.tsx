import { applyApplyRecordsUsingPost } from '@/services/backend/applyRecordsController';
import { listPeripheralInfoVoByPageUsingPost } from '@/services/backend/peripheralInfoController';
import { ActionType, PageContainer } from '@ant-design/pro-components';
import { Avatar, Button, Card, Col, Divider, List, message, Row } from 'antd';

import React, { useEffect, useRef, useState } from 'react';
const Index: React.FC = () => {
  // 使用 useState 和泛型来定义组件内的状态
  // 加载状态
  const [loading, setLoading] = useState(false);
  // 列表数据
  const [list, setList] = useState<API.PeripheralInfoVO[]>([]);
  // 总数
  const [total, setTotal] = useState<number>(0);

  const actionRef = useRef<ActionType>();

  const handleApply = async (row: API.ApplyRecords) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await applyApplyRecordsUsingPost({
        peripheralId: row.id as any,
      });
      hide();
      message.success('删除成功');
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };

  // 定义异步加载数据的函数
  const loadData = async (current = 1, pageSize = 5) => {
    // 开始加载数据，设置 loading 状态为 true
    setLoading(true);
    try {
      // 调用接口获取数据
      const res = await listPeripheralInfoVoByPageUsingPost({
        current,
        pageSize,
      });
      // 将请求返回的数据设置到列表数据状态中
      setList(res?.data?.records ?? []);
      // 将请求返回的总数设置到总数状态中
      setTotal(res?.data?.total ?? 0);
      // 捕获请求失败的错误信息
    } catch (error: any) {
      // 请求失败时提示错误信息
      message.error('请求失败，' + error.message);
    }
    // 数据加载成功或失败后，设置 loading 状态为 false
    setLoading(false);
  };

  useEffect(() => {
    // 页面加载完成后调用加载数据的函数
    loadData();
  }, []);

  // 按钮数组
  const buttonNames = [
    '钥匙扣',
    '搪瓷杯',
    '体恤',
    '手机支架',
    '抱枕',
    '立牌',
    '鼠标垫',
    '帆布袋',
    '公仔',
    '技术书籍',
  ];

  return (
    <PageContainer title="周边展示页面">
      <Row justify="center">
        <Col span={16}>
          <Card bordered={false}>
            {/* 循环渲染按钮 */}
            {buttonNames.map((buttonName, index) => (
              <Button key={index} style={{ marginTop: 12, marginRight: 18 }}>
                {buttonName}
              </Button>
            ))}
          </Card>
        </Col>
      </Row>
      <Divider />
      <List
        className="my-list"
        // 设置 loading 属性，表示数据是否正在加载中
        loading={loading}
        itemLayout="horizontal"
        // 将列表数据作为数据源传递给 List 组件
        dataSource={list}
        // 渲染每个列表项
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key={'list-loadmore-edit'} href={item.purchaseLink}>
                查看购买链接
              </a>,
              // initialState.currentUser && initialState.currentUser.userRole === 'internal' && (
              //   <a key={'list-loadmore-apply'} onClick={() => handleApply(item.id)}>
              //     申请周边
              //   </a>
              // ),
            ]}
          >
            <List.Item.Meta
              //
              title={<a>{item.name}</a>}
              avatar={<Avatar src={item.cover} size={128} shape="square" />}
              description={
                <div>
                  {item.stock !== null && <p>库存为：{item.stock} 件</p>}
                  {item.price !== null && <p>价格为：{item.price / 100} 元</p>}
                  <p>所属分类：{item.type}</p>
                </div>
              }
            />
          </List.Item>
        )}
        // 分页配置
        pagination={{
          // 自定义显示总数
          // eslint-disable-next-line @typescript-eslint/no-shadow
          showTotal(total: number) {
            return '总数：' + total;
          },
          // 每页显示条数
          pageSize: 5,
          // 总数，从状态中获取
          total,
          // 切换页面触发的回调函数
          onChange(page, pageSize) {
            // 加载对应页面的数据
            loadData(page, pageSize);
          },
        }}
      />
    </PageContainer>
  );
};

export default Index;
