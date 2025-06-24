// apps/frontend/src/features/shared/components/DocumentUploader.tsx
import React, { useState } from 'react';
import { Upload, Button, message, Modal, List, Typography, Space, Tooltip } from 'antd';
import { UploadOutlined, FileOutlined, FilePdfOutlined, FileImageOutlined, FileExcelOutlined, FileWordOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Text, Title } = Typography;

export interface DocumentUploaderProps {
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedFileTypes?: string[];
  initialFileList?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
  title?: string;
  description?: string;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  maxFiles = 5,
  maxSize = 5, // 5MB
  acceptedFileTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx', '.xls', '.xlsx'],
  initialFileList = [],
  onChange,
  title = 'Upload Documents',
  description = 'Upload supporting documents for your application'
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>(initialFileList);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewTitle, setPreviewTitle] = useState<string>('');

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (onChange) {
      onChange(newFileList);
    }
  };

  const beforeUpload = (file: File) => {
    // Check file size
    const isLessThanMaxSize = file.size / 1024 / 1024 < maxSize;
    if (!isLessThanMaxSize) {
      message.error(`File must be smaller than ${maxSize}MB!`);
      return Upload.LIST_IGNORE;
    }

    // Check file type
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    const isAcceptedType = acceptedFileTypes.includes(fileExtension);
    if (!isAcceptedType) {
      message.error(`You can only upload ${acceptedFileTypes.join(', ')} files!`);
      return Upload.LIST_IGNORE;
    }

    // Check max files
    if (fileList.length >= maxFiles) {
      message.error(`You can only upload a maximum of ${maxFiles} files!`);
      return Upload.LIST_IGNORE;
    }

    return false; // Prevent automatic upload
  };

  const getIconByFileType = (file: UploadFile) => {
    const fileName = file.name?.toLowerCase() || '';
    if (fileName.endsWith('.pdf')) return <FilePdfOutlined style={{ color: '#ff4d4f' }} />;
    if (fileName.match(/\.(jpg|jpeg|png|gif)$/)) return <FileImageOutlined style={{ color: '#1890ff' }} />;
    if (fileName.match(/\.(doc|docx)$/)) return <FileWordOutlined style={{ color: '#2f54eb' }} />;
    if (fileName.match(/\.(xls|xlsx)$/)) return <FileExcelOutlined style={{ color: '#52c41a' }} />;
    return <FileOutlined />;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleRemove = (file: UploadFile) => {
    const newFileList = fileList.filter(item => item.uid !== file.uid);
    setFileList(newFileList);
    if (onChange) {
      onChange(newFileList);
    }
  };

  return (
    <div className="document-uploader">
      <Title level={4}>{title}</Title>
      <Text type="secondary">{description}</Text>
      
      <div style={{ marginTop: 16, marginBottom: 16 }}>
        <Upload
          fileList={fileList}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          onPreview={handlePreview}
          multiple
          customRequest={({ onSuccess }) => {
            setTimeout(() => {
              onSuccess!("ok");
            }, 0);
          }}
        >
          <Button 
            icon={<UploadOutlined />} 
            disabled={fileList.length >= maxFiles}
          >
            Select Files
          </Button>
          <Text type="secondary" style={{ marginLeft: 8 }}>
            {fileList.length} / {maxFiles} files
          </Text>
        </Upload>
      </div>

      {fileList.length > 0 && (
        <List
          itemLayout="horizontal"
          dataSource={fileList}
          renderItem={file => (
            <List.Item
              actions={[
                <Tooltip title="Preview">
                  <Button 
                    icon={<EyeOutlined />} 
                    size="small" 
                    onClick={() => handlePreview(file)}
                    disabled={!file.url && !file.preview}
                  />
                </Tooltip>,
                <Tooltip title="Remove">
                  <Button 
                    icon={<DeleteOutlined />} 
                    size="small" 
                    danger
                    onClick={() => handleRemove(file)}
                  />
                </Tooltip>
              ]}
            >
              <List.Item.Meta
                avatar={getIconByFileType(file)}
                title={file.name}
                description={`${(file.size ? (file.size / 1024 / 1024).toFixed(2) : '?')} MB`}
              />
            </List.Item>
          )}
        />
      )}

      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default DocumentUploader;
