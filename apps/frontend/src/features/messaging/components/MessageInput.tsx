// apps/frontend/src/features/messaging/components/MessageInput.tsx
import React, { useState, useRef } from 'react';
import { Input, Button, Tooltip, Upload, Popover, theme } from 'antd';
import { 
  SendOutlined, 
  SmileOutlined, 
  PaperClipOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  FileWordOutlined
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const { token } = theme.useToken();
  const [message, setMessage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const inputRef = useRef<any>(null);

  const handleSend = () => {
    if (message.trim() || fileList.length > 0) {
      // In a real app, we would handle file uploads separately
      // For now, we'll just send the message text
      onSendMessage(message.trim());
      setMessage('');
      setFileList([]);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setEmojiPickerVisible(false);
    inputRef.current?.focus();
  };

  const handleFileChange = (info: any) => {
    setFileList(info.fileList);
  };

  const uploadProps = {
    name: 'file',
    multiple: true,
    fileList,
    onChange: handleFileChange,
    beforeUpload: () => false, // Prevent auto upload
    showUploadList: false,
  };

  const renderAttachmentsList = () => {
    if (fileList.length === 0) return null;

    return (
      <div style={{ padding: '8px 12px', backgroundColor: token.colorBgElevated, borderRadius: 8, marginBottom: 8 }}>
        {fileList.map(file => {
          // Determine icon based on file type
          let icon = <PaperClipOutlined />;
          if (file.type?.includes('image')) {
            icon = <FileImageOutlined style={{ color: token.colorInfo }} />;
          } else if (file.type?.includes('pdf')) {
            icon = <FilePdfOutlined style={{ color: token.colorError }} />;
          } else if (file.type?.includes('excel') || file.type?.includes('sheet')) {
            icon = <FileExcelOutlined style={{ color: token.colorSuccess }} />;
          } else if (file.type?.includes('word') || file.type?.includes('document')) {
            icon = <FileWordOutlined style={{ color: token.colorPrimary }} />;
          }

          return (
            <div key={file.uid} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              {icon}
              <span style={{ marginLeft: 8, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {file.name}
              </span>
              <Button 
                type="text" 
                size="small" 
                onClick={() => {
                  setFileList(fileList.filter(item => item.uid !== file.uid));
                }}
              >
                ×
              </Button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ padding: '12px 16px', borderTop: `1px solid ${token.colorBorderSecondary}` }}>
      {renderAttachmentsList()}
      
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Popover
          content={
            <div style={{ padding: '10px', display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '5px' }}>
              {['😊', '😂', '👍', '❤️', '👏', '🙏', '🎉', '👋', '😎', '🤔', '😢', '😡', '🤩', '😴', '🥳', '😷'].map(emoji => (
                <Button 
                  key={emoji} 
                  type="text" 
                  onClick={() => handleEmojiClick(emoji)}
                  style={{ margin: '2px', fontSize: '16px' }}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          }
          trigger="click"
          open={emojiPickerVisible}
          onOpenChange={setEmojiPickerVisible}
          placement="topRight"
        >
          <Button 
            type="text" 
            icon={<SmileOutlined />} 
            style={{ marginRight: 8, color: token.colorTextSecondary }}
          />
        </Popover>
        
        <Upload {...uploadProps}>
          <Button 
            type="text" 
            icon={<PaperClipOutlined />} 
            style={{ marginRight: 8, color: token.colorTextSecondary }}
          />
        </Upload>
        
        <Input.TextArea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          style={{ flex: 1, padding: '8px 12px', borderRadius: 20 }}
        />
        
        <Tooltip title="Send message">
          <Button
            type="primary"
            shape="circle"
            icon={<SendOutlined />}
            onClick={handleSend}
            style={{ marginLeft: 8 }}
            disabled={!message.trim() && fileList.length === 0}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default MessageInput;
