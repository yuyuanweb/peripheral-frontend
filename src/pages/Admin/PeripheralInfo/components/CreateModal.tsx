import { addPeripheralInfoUsingPost } from '@/services/backend/peripheralInfoController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';

interface Props {
  visible: boolean;
  columns: ProColumns<API.PeripheralInfo>[];
  onSubmit: (values: API.PeripheralInfoAddRequest) => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.PeripheralInfoAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    // 处理 JSON 数据
    const formattedFields = {
      ...fields,

      permission: fields.permission
        ? JSON.stringify({
            publicView: fields.permission.publicView,
            sensitiveFields: fields.permission.sensitiveFields,
          })
        : null,
    };

    await addPeripheralInfoUsingPost(formattedFields);
    hide();
    message.success('创建成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('创建失败，' + error.message);
    return false;
  }
};

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onSubmit, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title={'创建'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (values: API.PeripheralInfoAddRequest) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default CreateModal;
