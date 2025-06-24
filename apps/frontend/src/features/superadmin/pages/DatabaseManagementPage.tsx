// apps/frontend/src/features/superadmin/pages/DatabaseManagementPage.tsx

import { useState } from 'react';
import {
  Card, Tabs, Typography, Button, Space, Form, Input,
  Table, Popconfirm, message, Progress,
  Select, Col, Row, Tooltip, Modal, Upload, Divider,
  Alert, DatePicker, Statistic, Tag,
  Checkbox
} from 'antd';
import type { UploadProps, UploadFile } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  CloudUploadOutlined, CloudDownloadOutlined,
  DatabaseOutlined, WarningOutlined, CheckCircleOutlined,
  SyncOutlined, FileZipOutlined,
  SettingOutlined, SearchOutlined,
  InboxOutlined,
  UploadOutlined,
  FileExcelOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;

// --- MOCK DATA ---
// Database health metrics
const dbHealthMetrics = [
  { key: 'cpu', name: 'CPU Usage', value: 24, status: 'normal' },
  { key: 'memory', name: 'Memory Usage', value: 67, status: 'normal' },
  { key: 'disk', name: 'Disk Usage', value: 82, status: 'warning' },
  { key: 'connections', name: 'Active Connections', value: 48, status: 'normal' },
  { key: 'queries', name: 'Slow Queries (24h)', value: 3, status: 'warning' },
];

// Database collections stats
const collectionStats = [
  { key: '1', name: 'users', documents: 185230, size: 42.7, avgDocSize: 0.23, indexes: 4, indexSize: 1.2 },
  { key: '2', name: 'schools', documents: 152, size: 0.8, avgDocSize: 5.26, indexes: 3, indexSize: 0.3 },
  { key: '3', name: 'assessments', documents: 1245789, size: 356.2, avgDocSize: 0.29, indexes: 6, indexSize: 12.4 },
  { key: '4', name: 'attendance', documents: 3567892, size: 421.5, avgDocSize: 0.12, indexes: 5, indexSize: 18.6 },
  { key: '5', name: 'curriculum', documents: 8752, size: 15.3, avgDocSize: 1.75, indexes: 4, indexSize: 1.8 },
];

// Backup history
const backupHistory = [
  { key: '1', date: '2025-06-23 02:00:00', size: '1.2 GB', status: 'Success', type: 'Automated', location: 'Google Cloud Storage' },
  { key: '2', date: '2025-06-22 02:00:00', size: '1.2 GB', status: 'Success', type: 'Automated', location: 'Google Cloud Storage' },
  { key: '3', date: '2025-06-21 02:00:00', size: '1.1 GB', status: 'Success', type: 'Automated', location: 'Google Cloud Storage' },
  { key: '4', date: '2025-06-20 14:35:12', size: '1.1 GB', status: 'Success', type: 'Manual', location: 'Google Cloud Storage' },
  { key: '5', date: '2025-06-20 02:00:00', size: '1.1 GB', status: 'Failed', type: 'Automated', location: 'Google Cloud Storage' },
];

// Data integrity issues
const dataIntegrityIssues = [
  { key: '1', collection: 'users', issue: 'Missing required fields', count: 12, severity: 'high', lastChecked: '2025-06-23 12:30:45' },
  { key: '2', collection: 'assessments', issue: 'Orphaned records', count: 156, severity: 'medium', lastChecked: '2025-06-23 12:30:45' },
  { key: '3', collection: 'schools', issue: 'Duplicate entries', count: 2, severity: 'high', lastChecked: '2025-06-23 12:30:45' },
  { key: '4', collection: 'attendance', issue: 'Invalid date formats', count: 23, severity: 'low', lastChecked: '2025-06-23 12:30:45' },
];

// Learning areas data (kept for curriculum tab)
const learningAreasData = [
  { key: '1', name: 'Mathematics', code: 'MATH' },
  { key: '2', name: 'English', code: 'ENG' },
  { key: '3', name: 'Science & Technology', code: 'SCI-TECH' },
  { key: '4', name: 'Kiswahili', code: 'KIS' },
  { key: '5', name: 'Creative Arts', code: 'C-ARTS' },
];

// Sample assessment data structure
const sampleAssessmentData = [
  {
    id: '1',
    grade: 'Grade 1',
    learningArea: 'Mathematics',
    theme: 'School',
    strand: 'Numbers',
    substrand: 'Addition',
    rubric: 'Ability to add single-digit numbers correctly',
    assessmentDate: '2025-06-20',
    studentsAssessed: 28,
    averageScore: 85
  },
  {
    id: '2',
    grade: 'Grade 2',
    learningArea: 'English',
    theme: 'School',
    strand: 'Reading',
    substrand: 'Fluency',
    rubric: 'Ability to read a grade-appropriate text with the target letter-sound combinations at the right speed',
    assessmentDate: '2025-06-21',
    studentsAssessed: 32,
    averageScore: 78
  },
  {
    id: '3',
    grade: 'Grade 3',
    learningArea: 'Kiswahili',
    theme: 'Activities in the Home',
    strand: 'Listening and Speaking',
    substrand: 'Pronunciation and Vocabulary',
    rubric: 'Ability to use vocabulary related to the theme to communicate in various contexts',
    assessmentDate: '2025-06-22',
    studentsAssessed: 30,
    averageScore: 82
  }
];

// Grade levels for curriculum upload
const gradeOptions = [
  { value: 'pp1', label: 'Pre-Primary 1' },
  { value: 'pp2', label: 'Pre-Primary 2' },
  { value: 'grade1', label: 'Grade 1' },
  { value: 'grade2', label: 'Grade 2' },
  { value: 'grade3', label: 'Grade 3' },
  { value: 'grade4', label: 'Grade 4' },
  { value: 'grade5', label: 'Grade 5' },
  { value: 'grade6', label: 'Grade 6' },
];

const DatabaseManagementPage = () => {
  const [backupForm] = Form.useForm();
  const [curriculumUploadForm] = Form.useForm();
  const [isBackupModalVisible, setIsBackupModalVisible] = useState(false);
  const [isRestoreModalVisible, setIsRestoreModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // Health monitoring simulated data
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleString());

  // Collection stats columns
  const collectionColumns: ColumnsType<any> = [
    { title: 'Collection Name', dataIndex: 'name', key: 'name' },
    { title: 'Documents', dataIndex: 'documents', key: 'documents', render: val => val.toLocaleString() },
    { title: 'Size (MB)', dataIndex: 'size', key: 'size' },
    { title: 'Avg Doc Size (KB)', dataIndex: 'avgDocSize', key: 'avgDocSize' },
    { title: 'Indexes', dataIndex: 'indexes', key: 'indexes' },
    { title: 'Index Size (MB)', dataIndex: 'indexSize', key: 'indexSize' },
    { 
      title: 'Actions', 
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<SearchOutlined />}>Analyze</Button>
          <Button size="small" icon={<SettingOutlined />}>Optimize</Button>
        </Space>
      )
    }
  ];

  // Backup history columns
  const backupColumns: ColumnsType<any> = [
    { title: 'Date & Time', dataIndex: 'date', key: 'date' },
    { title: 'Size', dataIndex: 'size', key: 'size' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: status => {
        if (status === 'Success') return <Tag color="success" icon={<CheckCircleOutlined />}>{status}</Tag>;
        return <Tag color="error" icon={<WarningOutlined />}>{status}</Tag>;
      }
    },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Storage Location', dataIndex: 'location', key: 'location' },
    { 
      title: 'Actions', 
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<CloudDownloadOutlined />} disabled={record.status !== 'Success'}>Restore</Button>
          <Button size="small" icon={<FileZipOutlined />} disabled={record.status !== 'Success'}>Download</Button>
        </Space>
      )
    }
  ];

  // Data integrity issues columns
  const integrityColumns: ColumnsType<any> = [
    { title: 'Collection', dataIndex: 'collection', key: 'collection' },
    { title: 'Issue', dataIndex: 'issue', key: 'issue' },
    { title: 'Count', dataIndex: 'count', key: 'count' },
    { 
      title: 'Severity', 
      dataIndex: 'severity', 
      key: 'severity',
      render: severity => {
        if (severity === 'high') return <Tag color="error">High</Tag>;
        if (severity === 'medium') return <Tag color="warning">Medium</Tag>;
        return <Tag color="default">Low</Tag>;
      }
    },
    { title: 'Last Checked', dataIndex: 'lastChecked', key: 'lastChecked' },
    { 
      title: 'Actions', 
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small" type="primary">Fix Issues</Button>
          <Button size="small">Ignore</Button>
        </Space>
      )
    }
  ];

  // Handle refresh database stats
  const handleRefreshStats = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      setLastRefreshed(new Date().toLocaleString());
      message.success('Database statistics refreshed successfully');
    }, 1500);
  };

  // Handle backup database
  const handleBackupDatabase = (values: any) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsBackupModalVisible(false);
      message.success('Database backup initiated successfully');
      backupForm.resetFields();
    }, 2000);
  };

  // Handle restore database
  const handleRestoreDatabase = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsRestoreModalVisible(false);
      message.success('Database restore initiated successfully');
    }, 2000);
  };

  // Handle data integrity check
  const handleIntegrityCheck = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      message.success('Data integrity check completed');
    }, 2000);
  };

  // No longer needed after removing curriculum tab

  // Handle curriculum file upload
  const handleCurriculumUpload = (values: any) => {
    if (fileList.length === 0) {
      message.error('Please select an Excel file to upload');
      return;
    }
    
    setUploadLoading(true);
    
    // Simulate API call to upload curriculum
    setTimeout(() => {
      setUploadLoading(false);
      setUploadSuccess(true);
      message.success(`Curriculum for ${values.grade} - ${values.learningArea} uploaded successfully. Teachers can now access this curriculum for student assessments.`);
      
      // Reset form and file list after successful upload
      setTimeout(() => {
        curriculumUploadForm.resetFields();
        setFileList([]);
        setUploadSuccess(false);
      }, 3000);
    }, 2000);
  };

  // Handle file change for curriculum upload
  const handleFileChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];
    
    // Only keep the last file
    newFileList = newFileList.slice(-1);
    
    // Only accept .xlsx files
    newFileList = newFileList.filter(file => {
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        return true;
      }
      if (newFileList.length > 0 && file === newFileList[0]) {
        message.error('Only Excel (.xlsx) files are allowed');
      }
      return false;
    });
    
    setFileList(newFileList);
  };

  // Handle file removal
  const handleFileRemove = () => {
    setFileList([]);
    return true;
  };

  return (
    <div>
      <Title level={2}>Database Management System</Title>
      <Paragraph type="secondary">
        Monitor database health, manage backups, and ensure data integrity across the OLP Monitor platform.
      </Paragraph>
      
      <Card>
        <Tabs 
          defaultActiveKey="1" 
          type="card" 
          activeKey={activeTab}
          onChange={setActiveTab}
        >
          {/* Tab 1: Database Health Monitoring */}
          <Tabs.TabPane tab={<span><DatabaseOutlined /> Database Health</span>} key="1">
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={24}>
                <Card type="inner" title="Database Health Overview">
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Space style={{ marginBottom: 16 }}>
                        <Button 
                          type="primary" 
                          icon={<SyncOutlined spin={refreshing} />} 
                          onClick={handleRefreshStats}
                          loading={refreshing}
                        >
                          Refresh Stats
                        </Button>
                        <Text type="secondary">Last refreshed: {lastRefreshed}</Text>
                      </Space>
                    </Col>
                    
                    {dbHealthMetrics.map(metric => (
                      <Col xs={24} sm={12} md={8} lg={6} key={metric.key}>
                        <Card size="small">
                          <Statistic 
                            title={metric.name} 
                            value={metric.value} 
                            suffix={metric.key === 'cpu' || metric.key === 'memory' || metric.key === 'disk' ? '%' : ''}
                            valueStyle={{ color: metric.status === 'warning' ? '#faad14' : '#3f8600' }}
                          />
                          <Progress 
                            percent={metric.key === 'cpu' || metric.key === 'memory' || metric.key === 'disk' ? metric.value : (metric.value / 100) * 100} 
                            status={metric.status === 'warning' ? 'exception' : 'success'} 
                            showInfo={false}
                            strokeWidth={5}
                          />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col>
              
              <Col span={24}>
                <Card type="inner" title="Collection Statistics">
                  <Table 
                    columns={collectionColumns} 
                    dataSource={collectionStats} 
                    size="middle" 
                    pagination={false}
                  />
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>
          
          {/* Tab 2: Backup & Restore */}
          <Tabs.TabPane tab={<span><CloudDownloadOutlined /> Backup & Restore</span>} key="2">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card type="inner" title="Database Backup & Restore">
                  <Space>
                    <Button 
                      type="primary" 
                      icon={<CloudUploadOutlined />} 
                      onClick={() => setIsBackupModalVisible(true)}
                    >
                      Create New Backup
                    </Button>
                    <Button 
                      icon={<CloudDownloadOutlined />} 
                      onClick={() => setIsRestoreModalVisible(true)}
                    >
                      Restore from Backup
                    </Button>
                  </Space>
                  
                  <Divider />
                  
                  <Title level={5}>Backup History</Title>
                  <Table 
                    columns={backupColumns} 
                    dataSource={backupHistory} 
                    size="middle"
                  />
                </Card>
              </Col>
            </Row>
            
            {/* Backup Modal */}
            <Modal
              title="Create Database Backup"
              visible={isBackupModalVisible}
              onCancel={() => setIsBackupModalVisible(false)}
              footer={null}
              confirmLoading={isLoading}
            >
              <Form form={backupForm} layout="vertical" onFinish={handleBackupDatabase}>
                <Form.Item name="description" label="Backup Description" rules={[{ required: true }]}>
                  <Input placeholder="Enter a description for this backup" />
                </Form.Item>
                <Form.Item name="location" label="Storage Location" rules={[{ required: true }]}>
                  <Select defaultValue="gcs">
                    <Select.Option value="gcs">Google Cloud Storage</Select.Option>
                    <Select.Option value="s3">Amazon S3</Select.Option>
                    <Select.Option value="azure">Azure Blob Storage</Select.Option>
                    <Select.Option value="local">Local Storage</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="compressionLevel" label="Compression Level">
                  <Select defaultValue="medium">
                    <Select.Option value="low">Low (Faster, Larger Size)</Select.Option>
                    <Select.Option value="medium">Medium (Balanced)</Select.Option>
                    <Select.Option value="high">High (Slower, Smaller Size)</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={() => setIsBackupModalVisible(false)}>Cancel</Button>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                      Start Backup
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Modal>
            
            {/* Restore Modal */}
            <Modal
              title="Restore Database from Backup"
              visible={isRestoreModalVisible}
              onCancel={() => setIsRestoreModalVisible(false)}
              footer={null}
              confirmLoading={isLoading}
            >
              <Alert
                message="Warning: Database Restore"
                description="Restoring from a backup will replace the current database with the selected backup. This action cannot be undone."
                type="warning"
                showIcon
                style={{ marginBottom: 16 }}
              />
              <Form layout="vertical" onFinish={handleRestoreDatabase}>
                <Form.Item name="backupId" label="Select Backup" rules={[{ required: true }]}>
                  <Select placeholder="Select a backup to restore from">
                    {backupHistory.filter(b => b.status === 'Success').map(backup => (
                      <Select.Option key={backup.key} value={backup.key}>
                        {backup.date} ({backup.size})
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="confirmRestore" valuePropName="checked" rules={[
                  { 
                    validator: (_, value) => 
                      value ? Promise.resolve() : Promise.reject(new Error('You must confirm this action'))
                  }
                ]}>
                  <Checkbox>I understand this will overwrite the current database</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={() => setIsRestoreModalVisible(false)}>Cancel</Button>
                    <Button type="primary" danger htmlType="submit" loading={isLoading}>
                      Restore Database
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Modal>
          </Tabs.TabPane>
          
          {/* Tab 3: Data Integrity */}
          <Tabs.TabPane tab={<span><CheckCircleOutlined /> Data Integrity</span>} key="3">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card type="inner" title="Data Integrity Checks">
                  <Space style={{ marginBottom: 16 }}>
                    <Button 
                      type="primary" 
                      icon={<SearchOutlined />} 
                      onClick={handleIntegrityCheck}
                      loading={isLoading}
                    >
                      Run Integrity Check
                    </Button>
                    <RangePicker />
                    <Button>View History</Button>
                  </Space>
                  
                  <Alert
                    message="Data Integrity Issues Detected"
                    description="The system has detected some data integrity issues that require attention."
                    type="warning"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />
                  
                  <Table 
                    columns={integrityColumns} 
                    dataSource={dataIntegrityIssues} 
                    size="middle"
                  />
                </Card>
              </Col>
              
              <Col span={24}>
                <Card type="inner" title="Automated Integrity Checks">
                  <Form layout="vertical">
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Schedule Integrity Checks">
                          <Select defaultValue="daily">
                            <Select.Option value="hourly">Hourly</Select.Option>
                            <Select.Option value="daily">Daily</Select.Option>
                            <Select.Option value="weekly">Weekly</Select.Option>
                            <Select.Option value="monthly">Monthly</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Notification Threshold">
                          <Select defaultValue="all">
                            <Select.Option value="all">All Issues</Select.Option>
                            <Select.Option value="high">High Severity Only</Select.Option>
                            <Select.Option value="medium">Medium & High Severity</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Button type="primary">Save Settings</Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>
          


          {/* Tab 4: Curriculum Upload */}
          <Tabs.TabPane tab={<span><FileExcelOutlined /> Curriculum Upload</span>} key="4">
            <Title level={4}>Upload Curriculum</Title>
            <Paragraph type="secondary">
              Upload curriculum data in Excel (.xlsx) format. Select grade level and learning area before uploading.
              The Excel file should contain columns for Theme, Strand, Substrand, and Rubrics.
            </Paragraph>
            
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card type="inner" title="Upload Curriculum Excel File">
                  <Form
                    form={curriculumUploadForm}
                    layout="vertical"
                    onFinish={handleCurriculumUpload}
                  >
                    <Form.Item
                      name="grade"
                      label="Grade Level"
                      rules={[{ required: true, message: 'Please select grade level' }]}
                    >
                      <Select placeholder="Select grade level">
                        {gradeOptions.map(grade => (
                          <Select.Option key={grade.value} value={grade.value}>
                            {grade.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    
                    <Form.Item
                      name="learningArea"
                      label="Learning Area"
                      rules={[{ required: true, message: 'Please select learning area' }]}
                    >
                      <Select placeholder="Select learning area">
                        {learningAreasData.map(area => (
                          <Select.Option key={area.key} value={area.name}>
                            {area.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    
                    <Form.Item
                      name="file"
                      label="Curriculum Excel File"
                      rules={[{ required: true, message: 'Please upload an Excel file' }]}
                    >
                      <Upload
                        accept=".xlsx"
                        fileList={fileList}
                        onChange={handleFileChange}
                        onRemove={handleFileRemove}
                        beforeUpload={() => false} // Prevent auto upload
                        maxCount={1}
                      >
                        <Button icon={<UploadOutlined />} disabled={fileList.length > 0 || uploadLoading}>
                          Select Excel File
                        </Button>
                      </Upload>
                    </Form.Item>
                    
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        icon={<CloudUploadOutlined />}
                        loading={uploadLoading}
                        disabled={fileList.length === 0}
                      >
                        Upload Curriculum
                      </Button>
                    </Form.Item>
                    
                    {uploadSuccess && (
                      <Alert
                        message="Upload Successful"
                        description="The curriculum data has been successfully uploaded and processed."
                        type="success"
                        showIcon
                      />
                    )}
                  </Form>
                </Card>
              </Col>
              
              <Col xs={24} md={12}>
                <Card type="inner" title="Upload Instructions">
                  <Title level={5}>Excel File Format Requirements:</Title>
                  <ul>
                    <li>File must be in .xlsx format</li>
                    <li>The file must contain the following columns:
                      <ul>
                        <li><strong>Theme</strong>: The main theme or category</li>
                        <li><strong>Strand</strong>: Subject strand</li>
                        <li><strong>Substrand</strong>: Specific substrand</li>
                        <li><strong>Rubrics</strong>: Assessment rubrics</li>
                      </ul>
                    </li>
                    <li>Each row represents one curriculum item</li>
                    <li>The first row should contain column headers</li>
                  </ul>
                  
                  <Divider />
                  
                  <Title level={5}>Sample Format:</Title>
                  <img 
                    src="/curriculum-sample.png" 
                    alt="Curriculum Excel Sample Format" 
                    style={{ maxWidth: '100%', border: '1px solid #eee' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.style.display = 'none';
                      const parent = target.parentNode;
                      if (parent) {
                        const text = document.createElement('p');
                        text.innerText = 'Sample image not available';
                        parent.appendChild(text);
                      }
                    }}
                  />
                  
                  <Divider />
                  
                  <Alert
                    message="Teacher Access"
                    description="Once uploaded, this curriculum will be accessible to teachers for student assessment. Teachers can assess students' understanding per learning area, theme, strand, substrand, and rubric."
                    type="info"
                    showIcon
                  />
                </Card>
              </Col>
              
              <Col span={24}>
                <Card type="inner" title="Recent Curriculum Uploads">
                  <Table
                    columns={[
                      { title: 'Date', dataIndex: 'date', key: 'date' },
                      { title: 'Grade', dataIndex: 'grade', key: 'grade' },
                      { title: 'Learning Area', dataIndex: 'learningArea', key: 'learningArea' },
                      { title: 'Uploaded By', dataIndex: 'uploadedBy', key: 'uploadedBy' },
                      { title: 'Items Count', dataIndex: 'itemsCount', key: 'itemsCount' },
                      {
                        title: 'Status',
                        dataIndex: 'status',
                        key: 'status',
                        render: (status) => (
                          <Tag color={status === 'Success' ? 'success' : 'error'}>
                            {status}
                          </Tag>
                        )
                      },
                      {
                        title: 'Actions',
                        key: 'actions',
                        render: () => (
                          <Space>
                            <Button size="small" icon={<FileExcelOutlined />}>Download</Button>
                            <Button size="small" danger icon={<DeleteOutlined />}>Delete</Button>
                          </Space>
                        )
                      }
                    ]}
                    dataSource={[
                      {
                        key: '1',
                        date: '2025-06-22 14:30',
                        grade: 'Grade 3',
                        learningArea: 'Mathematics',
                        uploadedBy: 'Admin User',
                        itemsCount: 45,
                        status: 'Success'
                      },
                      {
                        key: '2',
                        date: '2025-06-21 10:15',
                        grade: 'Grade 2',
                        learningArea: 'English',
                        uploadedBy: 'Admin User',
                        itemsCount: 38,
                        status: 'Success'
                      },
                      {
                        key: '3',
                        date: '2025-06-20 16:45',
                        grade: 'Grade 1',
                        learningArea: 'Kiswahili',
                        uploadedBy: 'Admin User',
                        itemsCount: 0,
                        status: 'Failed'
                      }
                    ]}
                    size="middle"
                  />
                </Card>
              </Col>
              
              <Col span={24}>
                <Card type="inner" title="Teacher Assessment Data">
                  <Alert
                    message="Assessment Access"
                    description="This section shows how teachers are using the uploaded curriculum for student assessments. Teachers can assess student understanding across all curriculum components."
                    type="info"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />
                  
                  <Table
                    columns={[
                      { title: 'Grade', dataIndex: 'grade', key: 'grade' },
                      { title: 'Learning Area', dataIndex: 'learningArea', key: 'learningArea' },
                      { title: 'Theme', dataIndex: 'theme', key: 'theme' },
                      { title: 'Strand', dataIndex: 'strand', key: 'strand' },
                      { title: 'Substrand', dataIndex: 'substrand', key: 'substrand' },
                      { 
                        title: 'Rubric', 
                        dataIndex: 'rubric', 
                        key: 'rubric',
                        ellipsis: { showTitle: false },
                        render: (rubric) => (
                          <Tooltip title={rubric}>
                            {rubric.length > 40 ? `${rubric.substring(0, 40)}...` : rubric}
                          </Tooltip>
                        )
                      },
                      { title: 'Assessment Date', dataIndex: 'assessmentDate', key: 'assessmentDate' },
                      { title: 'Students Assessed', dataIndex: 'studentsAssessed', key: 'studentsAssessed' },
                      { 
                        title: 'Avg. Score', 
                        dataIndex: 'averageScore', 
                        key: 'averageScore',
                        render: (score) => (
                          <Progress 
                            percent={score} 
                            size="small" 
                            status={score < 60 ? 'exception' : 'success'}
                            format={(percent) => `${percent}%`}
                          />
                        )
                      },
                    ]}
                    dataSource={sampleAssessmentData}
                    size="middle"
                    expandable={{
                      expandedRowRender: (record) => (
                        <p style={{ margin: 0 }}>
                          Teachers can use this curriculum item to assess student understanding of {record.rubric} 
                          in the {record.substrand} substrand of {record.strand}.
                        </p>
                      ),
                    }}
                  />
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>
          
          {/* Tab 5: Data Archiving */}
          <Tabs.TabPane tab={<span><InboxOutlined /> Data Archiving</span>} key="5">
            <Title level={4}>System Data Management</Title>
            <Paragraph>Perform system-level data operations. These actions are irreversible and should be performed with caution.</Paragraph>
            <Card type="inner">
              <Space direction="vertical" size="large">
                  <div>
                    <Text strong>Transition Learners to Next Level</Text><br/>
                    <Text type="secondary">This will promote all students in a grade to the next grade (e.g., Grade 1 to Grade 2) at the end of an academic year.</Text><br/>
                    <Button style={{marginTop: 8}} onClick={() => message.info('This would trigger the year-end promotion process.')}>Start Grade Transition</Button>
                  </div>
                  <div>
                    <Text strong>Archive Old Data</Text><br/>
                    <Text type="secondary">Archive academic and financial records older than 7 years to improve system performance.</Text><br/>
                     <Popconfirm title="This will archive old records permanently. Are you sure?">
                        <Button danger style={{marginTop: 8}}>Archive 7-Year-Old Records</Button>
                     </Popconfirm>
                  </div>
              </Space>
            </Card>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default DatabaseManagementPage;