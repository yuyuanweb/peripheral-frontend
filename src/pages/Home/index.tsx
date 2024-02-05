import { applyApplyRecordsUsingPost } from '@/services/backend/applyRecordsController';
import { listPeripheralInfoVoByPageUsingPost } from '@/services/backend/peripheralInfoController';
import { useModel } from '@umijs/max';
import { Form, Input, message, Modal, Pagination, Skeleton } from 'antd';
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
  const [selectedId, setSelectedId] = useState(0);
  // const [applyStatusMap, setApplyStatusMap] = useState({});
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();

  const handleApplyClick = (id: any) => {
    setSelectedId(id);
    setOpen(true);
  };

  function changeTab(index: number) {
    setCurTab(index);
  }

  const handleApply = async (content: any) => {
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
      return true;
    } catch (error: any) {
      hide();
      message.error('申请失败，' + error.message);
      return false;
    }
  };

  // 定义异步加载数据的函数
  const loadData = async (current = 1, pageSize = 10) => {
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

  function confirm() {
    const content = form.getFieldValue('content');
    setOpen(false);
    if (!content) {
      message.error('请输入审批意见');
      return;
    }
    handleApply(content);
  }

  useEffect(() => {
    // 当curTab发生变化时，才重新执行加载数据的函数
    loadData();
  }, [curTab]);

  return (
    <div className="page" title="周边展示页面">
      <div className=" bg-white p-5 rounded-md">
        <div className="flex gap-5 flex-wrap">
          {buttonNames.map((buttonName, index) => (
            <div
              onClick={() => changeTab(index)}
              key={index}
              className={`border-[1px] px-5 py-2 border-solid hover:opacity-80 cursor-pointer border-gray-200  text-center ${
                curTab === index ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {buttonName}
            </div>
          ))}
        </div>
      </div>
      {/* 渲染内容 */}
      <div className="grid py-5 gap-3 grid-cols-2 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 mt-5">
        {loading
          ? new Array(8)
              .fill(1)
              .map((_, index) => (
                <Skeleton className=" bg-white p-5 rounded-xl" active key={index} />
              ))
          : list.map((item) => (
              <div
                key={item.id}
                className="shadow-md m-2 bg-white rounded-md overflow-hidden flex flex-col"
              >
                <img
                  draggable="false"
                  src={item.cover}
                  alt={item.name}
                  className="hover:opacity-80 cursor-pointer w-full flex-1 object-cover max-h-80"
                />
                <div className="desc w-full flex-1 flex flex-col gap-3 h-28 justify-between">
                  <div className="flex justify-between items-baseline w-full pt-4 pb-1 px-2">
                    <div>
                      <p>{item.name}</p>
                      {item.stock && (
                        <span className="text-gray-400 text-sm">剩余库存：{item.stock || 12}</span>
                      )}
                    </div>
                    <p className="price text-red-500 text-xl">
                      {item.price !== null && '¥' + item.price / 100}
                    </p>
                  </div>
                  {initialState?.currentUser &&
                    (initialState.currentUser.userRole === 'internal' ||
                      initialState.currentUser.userRole === 'admin') && (
                      <button
                        onClick={() => handleApplyClick(item.id)}
                        type="button"
                        className=" p-2 bg-blue-500 border-none cursor-pointer rounded-sm hover:opacity-80 text-white w-full"
                      >
                        申请周边
                      </button>
                    )}
                </div>
              </div>
            ))}
      </div>
      <div className="page py-5">
        <Pagination total={total} onChange={(page, pageSize) => loadData(page, pageSize)} />
      </div>
      {/* 模态框申请 */}
      <Modal
        title="周边申请"
        open={open}
        onOk={() => confirm()}
        onCancel={() => setOpen(false)}
        okText="确认"
        cancelText="取消"
      >
        <Form
          name="basic"
          form={form}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={(values) => handleApply(values.content)}
          autoComplete="off"
        >
          <Form.Item
            label="申请理由"
            name="content"
            rules={[{ required: true, message: '请填写申请内容' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Home;
