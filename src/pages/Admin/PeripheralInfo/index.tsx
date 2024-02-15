import FileUploader from '@/components/FileUploader';
import CreateModal from '@/pages/Admin/PeripheralInfo/components/CreateModal';
import UpdateModal from '@/pages/Admin/PeripheralInfo/components/UpdateModal';
import {
  deletePeripheralInfoUsingPost,
  listPeripheralInfoByPageUsingPost,
} from '@/services/backend/peripheralInfoController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProForm,
  ProFormCheckbox,
  ProFormSwitch,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Select, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';

/**
 * 周边管理页面
 *
 * @constructor
 */
const UserAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.PeripheralInfo>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.PeripheralInfo) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deletePeripheralInfoUsingPost({
        id: row.id as any,
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

  function fileUpload(url: string) {
    // console.log(res);
    // 上传接口
    console.log('图片地址：', url);
  }

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.PeripheralInfo>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '周边名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '周边图片',
      dataIndex: 'cover',
      valueType: 'image',
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
      renderFormItem: (_, record) => {
        console.log(_, record);

        return (
          <FileUploader onSuccess={fileUpload} biz={'user_avatar'}>
            上传图片
          </FileUploader>
        );
      },
    },
    {
      title: '价格(分）',
      dataIndex: 'price',
      valueType: 'text',
    },
    {
      title: '库存',
      dataIndex: 'stock',
      valueType: 'text',
    },
    {
      title: '所属分类',
      dataIndex: 'type',
      valueType: 'text',
      width: 100,
    },
    {
      title: '购买链接',
      dataIndex: 'purchaseLink',
      valueType: 'text',
      width: 60,
      hideInSearch: true,
    },
    {
      title: '进货链接',
      dataIndex: 'replenishLink',
      valueType: 'text',
      width: 60,
      hideInSearch: true,
    },
    {
      title: '权限',
      dataIndex: 'permission',
      valueType: 'jsonCode',
      hideInSearch: true,
      renderFormItem: () => {
        // console.log(record, _, 'permission');
        return (
          <ProForm.Group>
            <ProFormSwitch
              name={['permission', 'publicView']}
              label="是否启用敏感字段限制"
              checkedChildren="启用"
              unCheckedChildren="关闭"
            />
            <ProFormCheckbox.Group
              name={['permission', 'sensitiveFields']}
              label="选择敏感字段"
              options={[
                { label: '价格', value: 'price' },
                { label: '库存', value: 'stock' },
              ]}
            />
          </ProForm.Group>
        );
      },
    },
    {
      title: '是否公开',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '不公开',
        },
        1: {
          text: '公开',
        },
      },
      renderFormItem: (_, record) => {
        // console.log(record, _, 'record');
        return (
          <Select
            defaultValue={record.value}
            options={[
              {
                label: '不公开',
                value: 0,
              },
              {
                label: '公开',
                value: 1,
              },
            ]}
          />
        );
      },
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      sorter: (a, b) => {
        let aTime = new Date(a.createTime).getTime();
        let bTime = new Date(b.createTime).getTime();
        console.log('a', a);
        return aTime - bTime;
      },
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      sorter: (a, b) => {
        let aTime = new Date(a.updateTime).getTime();
        let bTime = new Date(b.updateTime).getTime();
        console.log('a', a);
        return aTime - bTime;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link type="danger" onClick={() => handleDelete(record)}>
            删除
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.PeripheralInfo>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data, code } = await listPeripheralInfoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.PeripheralInfoQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
      />
      <CreateModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
      <UpdateModal
        visible={updateModalVisible}
        columns={columns}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default UserAdminPage;
