import CreateModal from '@/pages/Admin/ApplyRecords/components/CreateModal';
import UpdateModal from '@/pages/Admin/ApplyRecords/components/UpdateModal';
import {
  approveApplyRecordsUsingPost,
  deleteApplyRecordsUsingPost,
  listApplyRecordsByPageUsingPost,
} from '@/services/backend/applyRecordsController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Select, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';

/**
 * 用户管理页面
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
  const [currentRow, setCurrentRow] = useState<API.User>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.ApplyRecords) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteApplyRecordsUsingPost({
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

  //审批通过
  const handleApproval = async (row: API.ApplyRecords) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await approveApplyRecordsUsingPost({
        approved: true,
        id: row.id as any,
      });
      hide();
      message.success('审核成功');
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('审核失败，' + error.message);
      return false;
    }
  };

  //审核不通过
  const handleNotApproval = async (row: API.ApplyRecords) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await approveApplyRecordsUsingPost({
        approved: false,
        id: row.id as any,
      });
      hide();
      message.success('审核成功');
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('审核失败，' + error.message);
      return false;
    }
  };
  /**
   * 表格列配置
   */
  const columns: ProColumns<API.ApplyRecords>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '周边ID',
      dataIndex: 'peripheralId',
      valueType: 'text',
    },
    {
      title: '周边名称',
      dataIndex: 'peripheralName',
      valueType: 'text',
    },
    {
      title: '申请人ID',
      dataIndex: 'applicantId',
      valueType: 'text',
    },
    {
      title: '申请人用户名',
      dataIndex: 'applicantUserName',
      valueType: 'text',
    },
    {
      title: '申请理由',
      dataIndex: 'content',
      valueType: 'textarea',
    },
    {
      title: '申请时间',
      sorter: true,
      dataIndex: 'applicationTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '申请状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '未申请',
        },
        1: {
          text: '审核中',
        },
        2: {
          text: '通过审核',
        },
        3: {
          text: '审核不通过',
        },
      },
      renderFormItem: (_, record) => {
        console.log(record, _, 'record');

        return (
          <Select
            defaultValue={record.value}
            options={[
              {
                label: '未申请',
                value: 0,
              },
              {
                label: '审核中',
                value: 1,
              },
              {
                label: '通过审核',
                value: 2,
              },
              {
                label: '审核不通过',
                value: 3,
              },
            ]}
          />
        );
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
          {/* 审批通过按钮 */}
          {record.status === 1 && (
            <Typography.Link
              onClick={() => {
                // 处理审批操作
                handleApproval(record);
              }}
            >
              通过
            </Typography.Link>
          )}
          {/* 审批不通过按钮 */}
          {record.status === 1 && (
            <Typography.Link
              onClick={() => {
                // 处理审批不通过操作
                handleNotApproval(record);
              }}
            >
              不通过
            </Typography.Link>
          )}
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.ApplyRecords>
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

          const { data, code } = await listApplyRecordsByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.UserQueryRequest);

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
