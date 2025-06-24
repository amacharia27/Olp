// apps/frontend/src/features/admin/shared/pages/TransferApplicationPage.tsx
import { useState } from 'react';
import {
  Typography,
  Form,
  Input,
  Select,
  Button,
  Card,
  Row,
  Col,
  Table,
  Tag,
  Space,
  message,
  Divider,
  Modal
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { confirm } = Modal;

interface TransferApplication {
  id: string;
  applicantId: string;
  applicantName: string;
  currentSchool: string;
  requestedSchool: string;
  county: string;
  subCounty: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'objected';
  dateSubmitted: string;
  approvalChain: {
    headteacher?: {
      status: 'pending' | 'approved' | 'rejected' | 'objected';
      comment?: string;
      date?: string;
    };
    subcounty?: {
      status: 'pending' | 'approved' | 'rejected' | 'objected';
      comment?: string;
      date?: string;
    };
    county?: {
      status: 'pending' | 'approved' | 'rejected' | 'objected';
      comment?: string;
      date?: string;
    };
  };
}

// Mock data for counties and sub-counties
const counties = [
  { value: 'nairobi', label: 'Nairobi' },
  { value: 'mombasa', label: 'Mombasa' },
  { value: 'kisumu', label: 'Kisumu' },
  { value: 'nakuru', label: 'Nakuru' },
];

const subCounties: Record<string, { value: string; label: string }[]> = {
  nairobi: [
    { value: 'westlands', label: 'Westlands' },
    { value: 'dagoretti', label: 'Dagoretti' },
    { value: 'embakasi', label: 'Embakasi' },
  ],
  mombasa: [
    { value: 'nyali', label: 'Nyali' },
    { value: 'kisauni', label: 'Kisauni' },
    { value: 'likoni', label: 'Likoni' },
  ],
  kisumu: [
    { value: 'kisumu_central', label: 'Kisumu Central' },
    { value: 'kisumu_east', label: 'Kisumu East' },
    { value: 'kisumu_west', label: 'Kisumu West' },
  ],
  nakuru: [
    { value: 'nakuru_east', label: 'Nakuru East' },
    { value: 'nakuru_west', label: 'Nakuru West' },
    { value: 'naivasha', label: 'Naivasha' },
  ],
};

// Mock data for schools
const schools: Record<string, { value: string; label: string }[]> = {
  westlands: [
    { value: 'school_1', label: 'Westlands Primary School' },
    { value: 'school_2', label: 'Parklands Secondary School' },
  ],
  dagoretti: [
    { value: 'school_3', label: 'Dagoretti High School' },
    { value: 'school_4', label: 'Mutuini Secondary School' },
  ],
  embakasi: [
    { value: 'school_5', label: 'Embakasi Girls High School' },
    { value: 'school_6', label: 'Utawala Academy' },
  ],
  nyali: [
    { value: 'school_7', label: 'Nyali Primary School' },
    { value: 'school_8', label: 'Light Academy Nyali' },
  ],
  kisauni: [
    { value: 'school_9', label: 'Kisauni Secondary School' },
    { value: 'school_10', label: 'Shanzu Teachers College' },
  ],
  likoni: [
    { value: 'school_11', label: 'Likoni Secondary School' },
    { value: 'school_12', label: 'Star of the Sea High School' },
  ],
  kisumu_central: [
    { value: 'school_13', label: 'Kisumu Boys High School' },
    { value: 'school_14', label: 'Kisumu Girls High School' },
  ],
  kisumu_east: [
    { value: 'school_15', label: 'Nyamasaria Primary School' },
    { value: 'school_16', label: 'Aga Khan Primary School' },
  ],
  kisumu_west: [
    { value: 'school_17', label: 'Ojolla Secondary School' },
    { value: 'school_18', label: 'St. Joseph Nyamasaria School' },
  ],
  nakuru_east: [
    { value: 'school_19', label: 'Nakuru East Secondary School' },
    { value: 'school_20', label: 'Nakuru Day Secondary School' },
  ],
  nakuru_west: [
    { value: 'school_21', label: 'Nakuru West Primary School' },
    { value: 'school_22', label: 'Kenyatta Primary School' },
  ],
  naivasha: [
    { value: 'school_23', label: 'Naivasha Girls Secondary School' },
    { value: 'school_24', label: 'Naivasha Boys High School' },
  ],
};

// Mock data for current user
const currentUser = {
  id: 'T-001',
  name: 'John Doe',
  role: 'teacher',
  school: 'school_1',
  schoolName: 'Westlands Primary School',
  county: 'nairobi',
  subCounty: 'westlands',
};

// Mock data for transfer applications
const mockTransferApplications: TransferApplication[] = [
  {
    id: 'TA-001',
    applicantId: 'T-001',
    applicantName: 'John Doe',
    currentSchool: 'Westlands Primary School',
    requestedSchool: 'Dagoretti High School',
    county: 'Nairobi',
    subCounty: 'Dagoretti',
    reason: 'Moving closer to home',
    status: 'pending',
    dateSubmitted: '2025-05-15',
    approvalChain: {
      headteacher: {
        status: 'approved',
        comment: 'Teacher has served well and deserves the transfer',
        date: '2025-05-20',
      },
      subcounty: {
        status: 'pending',
      },
    },
  },
  {
    id: 'TA-002',
    applicantId: 'T-001',
    applicantName: 'John Doe',
    currentSchool: 'Westlands Primary School',
    requestedSchool: 'Kisumu Boys High School',
    county: 'Kisumu',
    subCounty: 'Kisumu Central',
    reason: 'Family relocation',
    status: 'rejected',
    dateSubmitted: '2025-03-10',
    approvalChain: {
      headteacher: {
        status: 'approved',
        comment: 'Approved due to family circumstances',
        date: '2025-03-15',
      },
      subcounty: {
        status: 'rejected',
        comment: 'No vacancy in requested school',
        date: '2025-03-25',
      },
    },
  },
];

const TransferApplicationPage = () => {
  const [form] = Form.useForm();
  const [applications, setApplications] = useState<TransferApplication[]>(mockTransferApplications);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [selectedSubCounty, setSelectedSubCounty] = useState<string | null>(null);

  const handleCountyChange = (value: string) => {
    setSelectedCounty(value);
    setSelectedSubCounty(null);
    form.setFieldsValue({ subCounty: undefined, requestedSchool: undefined });
  };

  const handleSubCountyChange = (value: string) => {
    setSelectedSubCounty(value);
    form.setFieldsValue({ requestedSchool: undefined });
  };

  const handleSubmit = (values: any) => {
    // In a real application, this would be an API call
    const newApplication: TransferApplication = {
      id: `TA-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      applicantId: currentUser.id,
      applicantName: currentUser.name,
      currentSchool: currentUser.schoolName,
      requestedSchool: schools[values.subCounty].find(s => s.value === values.requestedSchool)?.label || '',
      county: counties.find(c => c.value === values.county)?.label || '',
      subCounty: subCounties[values.county].find(sc => sc.value === values.subCounty)?.label || '',
      reason: values.reason,
      status: 'pending',
      dateSubmitted: new Date().toISOString().split('T')[0],
      approvalChain: {
        headteacher: {
          status: 'pending',
        },
      },
    };

    setApplications([newApplication, ...applications]);
    message.success('Transfer application submitted successfully!');
    form.resetFields();
    setSelectedCounty(null);
    setSelectedSubCounty(null);
  };

  const handleCancelApplication = (applicationId: string) => {
    confirm({
      title: 'Are you sure you want to cancel this transfer application?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      onOk() {
        setApplications(applications.filter(app => app.id !== applicationId));
        message.success('Transfer application cancelled successfully!');
      },
    });
  };

  const columns: ColumnsType<TransferApplication> = [
    {
      title: 'Application ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Current School',
      dataIndex: 'currentSchool',
      key: 'currentSchool',
    },
    {
      title: 'Requested School',
      dataIndex: 'requestedSchool',
      key: 'requestedSchool',
    },
    {
      title: 'County',
      dataIndex: 'county',
      key: 'county',
    },
    {
      title: 'Sub-County',
      dataIndex: 'subCounty',
      key: 'subCounty',
    },
    {
      title: 'Date Submitted',
      dataIndex: 'dateSubmitted',
      key: 'dateSubmitted',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'default';
        if (status === 'approved') color = 'green';
        else if (status === 'rejected') color = 'red';
        else if (status === 'pending') color = 'gold';
        else if (status === 'objected') color = 'orange';
        
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.status === 'pending' && (
            <Button size="small" danger onClick={() => handleCancelApplication(record.id)}>
              Cancel
            </Button>
          )}
          <Button size="small" type="primary">
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Transfer Application</Title>
      <Row gutter={[16, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Apply for Transfer">
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="county"
                label="County"
                rules={[{ required: true, message: 'Please select a county' }]}
              >
                <Select
                  placeholder="Select county"
                  onChange={handleCountyChange}
                  options={counties}
                />
              </Form.Item>

              <Form.Item
                name="subCounty"
                label="Sub-County"
                rules={[{ required: true, message: 'Please select a sub-county' }]}
              >
                <Select
                  placeholder="Select sub-county"
                  disabled={!selectedCounty}
                  onChange={handleSubCountyChange}
                  options={selectedCounty ? subCounties[selectedCounty] : []}
                />
              </Form.Item>

              <Form.Item
                name="requestedSchool"
                label="Requested School"
                rules={[{ required: true, message: 'Please select a school' }]}
              >
                <Select
                  placeholder="Select school"
                  disabled={!selectedSubCounty}
                  options={selectedSubCounty ? schools[selectedSubCounty] : []}
                />
              </Form.Item>

              <Form.Item
                name="reason"
                label="Reason for Transfer"
                rules={[{ required: true, message: 'Please provide a reason for your transfer request' }]}
              >
                <TextArea rows={4} placeholder="Explain why you are requesting this transfer" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit Application
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Current School Information">
            <p><strong>Name:</strong> {currentUser.name}</p>
            <p><strong>Current School:</strong> {currentUser.schoolName}</p>
            <p><strong>County:</strong> {counties.find(c => c.value === currentUser.county)?.label}</p>
            <p><strong>Sub-County:</strong> {subCounties[currentUser.county]?.find(sc => sc.value === currentUser.subCounty)?.label}</p>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="My Transfer Applications">
            <Table 
              columns={columns} 
              dataSource={applications} 
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TransferApplicationPage;
