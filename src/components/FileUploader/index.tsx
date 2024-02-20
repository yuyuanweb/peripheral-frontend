import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React from 'react';

import { uploadFileUsingPost } from '@/services/backend/fileController';
import { commonErrorTip } from '@/utils/utils';
import type { UploadFile, UploadProps } from 'antd/es';
import './index.less';

function beforeUpload(file: File) {
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('文件大小不能超过 10MB!');
  }
  return isLt10M;
}

// 规定组件接收的属性
interface Props {
  biz: string;
  onChange?: (value: string) => void;
  // 回调函数
  onSuccess: (res: string) => void;
  value?: string;
}

/**
 *
 * @param props
 * @returns
 */

const FileUploader: React.FC<Props> = (props) => {
  const { biz, value = '', onChange, onSuccess } = props;
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList?.(newFileList);
  };

  /**
   * 自实现上传
   * @param fileObj
   * @return {Promise<void>}
   */
  const doUpload = async (fileObj: any) => {
    try {
      const res = await uploadFileUsingPost(
        {
          biz,
        },
        {},
        fileObj.file,
      );
      fileObj.onSuccess(res.data);
      onSuccess?.(res.data || '');
      onChange?.(res.data || '');
    } catch (e: any) {
      commonErrorTip('上传失败，', e);
      fileObj.onError(e);
    }
  };

  return (
    <Upload
      className="file-uploader"
      maxCount={1}
      accept=".png,.jpg,.jpeg"
      fileList={fileList}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={doUpload}
    >
      <Button icon={<UploadOutlined />}>点击上传周边图片</Button>
    </Upload>
  );
};

export default FileUploader;
