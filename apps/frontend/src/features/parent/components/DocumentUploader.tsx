// apps/frontend/src/features/parent/components/DocumentUploader.tsx
import React, { useState } from 'react';
import { Upload, Button, message, Modal, Typography } from 'antd';
import { UploadOutlined, FileOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Text, Title } = Typography;

interface DocumentUploaderProps {
  title: string;
  description?: string;
  maxFiles?: number;
  acceptedFileTypes?: string;
  required?: boolean;
  onFilesChange?: (files: UploadFile[]) => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  title,
  description,
  maxFiles = 5,
  acceptedFileTypes = '.pdf,.jpg,.jpeg,.png',
  required = false,
  onFilesChange,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    // Filter out files that exceed the maxFiles limit
    const limitedFileList = newFileList.slice(0, maxFiles);
    
    // If the file list has changed, notify the parent component
    if (JSON.stringify(limitedFileList) !== JSON.stringify(fileList)) {
      setFileList(limitedFileList);
      if (onFilesChange) {
        onFilesChange(limitedFileList);
      }
    }
  };

  const uploadProps: UploadProps = {
    onPreview: handlePreview,
    onChange: handleChange,
    fileList,
    beforeUpload: (file) => {
      // Check file type
      const isAcceptedType = acceptedFileTypes
        .split(',')
        .some(type => file.name.toLowerCase().endsWith(type.replace('.', '').toLowerCase()));
      
      if (!isAcceptedType) {
        message.error(`${file.name} is not an accepted file type. Please upload ${acceptedFileTypes} files.`);
        return Upload.LIST_IGNORE;
      }
      
      // Check file size (limit to 5MB)
      const isLessThan5MB = file.size / 1024 / 1024 < 5;
      if (!isLessThan5MB) {
        message.error('File must be smaller than 5MB!');
        return Upload.LIST_IGNORE;
      }
      
      // Return false to prevent auto upload
      return false;
    },
    multiple: true,
    listType: "picture",
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <Title level={5}>
        {title} {required && <Text type="danger">*</Text>}
      </Title>
      {description && <Text type="secondary">{description}</Text>}
      
      <div style={{ marginTop: 16 }}>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Select Files</Button>
        </Upload>
        <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
          Accepted file types: {acceptedFileTypes.replace(/\./g, '')} (Max {maxFiles} files, 5MB each)
        </Text>
      </div>

      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        {previewImage.endsWith('.pdf') ? (
          <div style={{ textAlign: 'center' }}>
            <FileOutlined style={{ fontSize: 64 }} />
            <p>PDF preview not available. Please download to view.</p>
          </div>
        ) : (
          <img alt="preview" style={{ width: '100%' }} src={previewImage} />
        )}
      </Modal>
    </div>
  );
};

// Helper function to convert file to base64 for preview
const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export default DocumentUploader;
