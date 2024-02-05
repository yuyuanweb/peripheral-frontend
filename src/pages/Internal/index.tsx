import { getApplyRecordsUsingGet } from '@/services/backend/applyRecordsController';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Select } from 'antd';
import React, { useRef } from 'react';

/**
 * 申请查看页面
 *
 * @constructor
 */
const InternalPage: React.FC = () => {
  const actionRef = useRef<ActionType>();

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.ApplyRecords>[] = [
    {
      title: '序号',
      valueType: 'indexBorder', // 自定义的indexBorder类型
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '周边名称',
      dataIndex: 'peripheralName',
      valueType: 'text',
    },
    {
      title: '申请理由',
      dataIndex: 'content',
      valueType: 'textarea',
    },
    {
      title: '审核反馈',
      dataIndex: 'reason',
      valueType: 'textarea',
    },
    {
      title: '申请时间',
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
          status: 'Default',
        },
        1: {
          text: '审核中',
          status: 'Processing',
        },
        2: {
          text: '通过审核',
          status: 'Success',
        },
        3: {
          text: '审核不通过',
          status: 'Error',
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
  ];
  return (
    <PageContainer>
      <ProTable<API.ApplyRecords>
        headerTitle={'展示表格'}
        search={false} // 禁用搜索栏
        actionRef={actionRef}
        rowKey="key"
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await getApplyRecordsUsingGet();

          return {
            success: code === 0,
            data: data || [],
            // total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
};
export default InternalPage;
