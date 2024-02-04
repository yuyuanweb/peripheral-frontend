import { applyApplyRecordsUsingPost } from '@/services/backend/applyRecordsController';
import { listPeripheralInfoVoByPageUsingPost } from '@/services/backend/peripheralInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Avatar, Button, Card, Divider, Form, Input, List, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
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
  const [selectedId, setSelectedId] = useState(null);
  // const [applyStatusMap, setApplyStatusMap] = useState({});
  const { initialState } = useModel('@@initialState');

  const handleApplyClick = (id: any) => {
    setSelectedId(id);
    setOpen(true);
  };

  function changeTab(index: number) {
    setCurTab(index);
  }
  // const actionRef = useRef<ActionType>();

  //返回id对应的status
  // const getStatus = (id: any) => {
  //   const status = applyStatusMap[id];
  //   return status;
  // };

  const handleApply = async (content: any) => {
    console.log(content);

    const hide = message.loading('正在申请');
    try {
      await applyApplyRecordsUsingPost({
        peripheralId: selectedId,
        content: content,
      });
      hide();
      message.success('申请成功');
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      loadData();
      setOpen(false);
      // 设置延迟时间（单位：毫秒）
      // const delayTime = 500; //

      // // 在延迟时间后执行刷新操作
      // setTimeout(() => {
      //   window.location.reload();
      // }, delayTime);

      return true;
    } catch (error: any) {
      hide();
      message.error('申请失败，' + error.message);
      return false;
    }
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
      // 获取申请状态信息

      // const peripheralIds = res?.data?.records.map((item) => item.id) || [];
      // if (initialState?.currentUser?.userRole === 'internal') {
      //   const applyStatusRes = await getAllStatusUsingPost({ ids: peripheralIds });
      //   console.log(applyStatusRes);

      //   setApplyStatusMap(applyStatusRes?.data || {});
      // }

      // 捕获请求失败的错误信息
    } catch (error: any) {
      // 请求失败时提示错误信息
      message.error('请求失败，' + error.message);
    }
    // 数据加载成功或失败后，设置 loading 状态为 false
    setLoading(false);
  };

  useEffect(() => {
    // 当curTab发生变化时，才重新执行加载数据的函数
    loadData();
  }, [curTab]);

  function renderAction(id: number) {
    // const status = getStatus(id);
    // switch (status) {
    //   case 1:
    //     return <div key={'list-loadmore-applied'}>已申请</div>;
    //   case 2:
    //     return <div key={'list-loadmore-approved'}>通过申请</div>;
    //   case 3:
    //     return (
    //       <a
    //         key={'list-loadmore-reapply'}
    //         onClick={() => handleApplyClick(id)}
    //         style={{ color: 'red' }}
    //       >
    //         重新申请
    //       </a>
    //     );
    //   default:
    //     return (
    //       <a key={'list-loadmore-apply'} onClick={() => handleApplyClick(id)}>
    //         申请周边
    //       </a>
    //     );
    // }
    return (
      <a key={'list-loadmore-apply'} onClick={() => handleApplyClick(id)}>
        申请周边
      </a>
    );
  }

  return (
    <PageContainer className="page" title="周边展示页面">
      <Card className="peripheral-tab" bordered={false} style={{ background: 'transparent' }}>
        {/* 循环渲染按钮 */}
        {buttonNames.map((buttonName, index) => (
          <Button
            type={index === curTab ? 'primary' : 'default'}
            key={index}
            style={{ marginTop: 12, marginRight: 24 }}
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
        style={{ maxWidth: '1200px', margin: '0 auto' }} // 让整个 List 居中
        itemLayout="horizontal"
        // 将列表数据作为数据源传递给 List 组件
        dataSource={list}
        // 渲染每个列表项
        renderItem={(item) => (
          <List.Item
            // style={{ backgroundColor: '#64d6ea' }}
            actions={[
              <a
                style={{ fontSize: 16 }}
                className="buy-link"
                key={'list-loadmore-edit'}
                href={item.purchaseLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                查看购买链接
              </a>,
              initialState?.currentUser &&
                initialState.currentUser.userRole === 'internal' &&
                renderAction(item.id),
            ]}
            className="peripheral-item"
          >
            <List.Item.Meta
              style={{ margin: '10px 20px', textAlign: 'center' }}
              title={<div style={{ fontSize: 20, color: 'violet' }}>{item.name}</div>}
              avatar={<Avatar src={item.cover} size={168} shape="square" />}
              description={
                <div style={{ fontSize: 16, color: 'blue' }}>
                  {item.stock !== null && (
                    <p style={{ marginBottom: 8 }}>库存为：{item.stock} 件</p>
                  )}
                  {item.price !== null && (
                    <p style={{ marginBottom: 8 }}>价格为：{(item.price || 0) / 100} 元</p>
                  )}
                  <p style={{ marginBottom: 0 }}>所属分类：{item.type}</p>
                </div>
              }
              className="peripheral-item-meta"
            />
          </List.Item>
        )}
        // 分页配置
        pagination={{
          // 自定义显示总数
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
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={(values) => handleApply(values.content)}
          autoComplete="off"
        >
          <Form.Item
            label="申请内容"
            name="content"
            rules={[{ required: true, message: '请填写申请内容' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交申请
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Home;
