import { listPeripheralInfoVoByPageUsingPost } from '@/services/backend/peripheralInfoController';
import { ActionType, PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Avatar, Button, Card, Divider, Form, Input, List, message, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { buttonNames } from './constants';
import './index.less';

const Home: React.FC = () => {
  // 使用 useState 和泛型来定义组件内的状态
  // 加载状态
  const [loading, setLoading] = useState(false);
  // 列表数据
  const [list, setList] = useState<API.PeripheralInfoVO[]>([]);
  // 总数
  const [total, setTotal] = useState<number>(0);
  // 当前点击tab
  const [curTab, setCurTab] = useState(0);
  const [open, setOpen] = useState(false);

  const { initialState } = useModel('@@initialState');

  function changeTab(index: number) {
    setCurTab(index);
  }
  const actionRef = useRef<ActionType>();

  const handleApply = async (row: API.ApplyRecords) => {
    // const hide = message.loading('正在删除');
    // if (!row) return true;
    // try {
    //   await applyApplyRecordsUsingPost({ peripheralId: row.id });
    //   hide();
    //   message.success('删除成功');
    //   actionRef?.current?.reload();
    //   return true;
    // } catch (error: any) {
    //   hide();
    //   message.error('删除失败，' + error.message);
    //   return false;
    // }
    setOpen(true);
  };

  // 定义异步加载数据的函数
  const loadData = async (current = 1, pageSize = 5) => {
    // 开始加载数据，设置 loading 状态为 true
    console.log('正在加载数据');
    setLoading(true);
    try {
      // 调用接口获取数据
      const res = await listPeripheralInfoVoByPageUsingPost({
        current,
        pageSize,
        type: curTab === 0 ? '' : buttonNames[curTab],
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
  }, [curTab]);

  return (
    <PageContainer title="周边展示页面">
      <Card className="peripheral-tab" bordered={false}>
        {/* 循环渲染按钮 */}
        {buttonNames.map((buttonName, index) => (
          <Button
            type={index === curTab ? 'primary' : 'default'}
            key={index}
            style={{ marginTop: 12, marginRight: 18 }}
            onClick={() => changeTab(index)}
          >
            {buttonName}
          </Button>
        ))}
      </Card>
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
              <a className="buy-link" key={'list-loadmore-edit'} href={item.purchaseLink}>
                查看购买链接
              </a>,
              initialState?.currentUser && initialState.currentUser.userRole === 'internal' && (
                <a key={'list-loadmore-apply'} onClick={() => handleApply(item)}>
                  申请周边
                </a>
              ),
            ]}
            className="peripheral-item"
          >
            <List.Item.Meta
              style={{ margin: '10px 20px' }}
              title={<a>{item.name}</a>}
              avatar={<Avatar src={item.cover} size={128} shape="square" />}
              description={
                <div>
                  {item.stock !== null && <p>库存为：{item.stock} 件</p>}
                  {item.price !== null && <p>价格为：{(item.price || 0) / 100} 元</p>}
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
      <Modal
        title="Modal"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        okText="确认"
        cancelText="取消"
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          {/* 
          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Home;
