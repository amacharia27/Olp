import { useState } from 'react';
import { Card, Table, Typography, Button, Space, Tag, Tabs, List, Avatar, message, Input, Modal, Form, InputNumber, Row, Col, Descriptions } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, UserOutlined } from '@ant-design/icons';

interface TransferRequest {
  key: string;
  studentName: string;
  studentId: string;
  fromSchool: string;
  toSchool: string;
  type: 'Incoming' | 'Outgoing';
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface Student {
  key: string;
  studentId: string;
  name: string;
  class: string;
  parentName: string;
  status: string;
}

interface ApprovalItem {
  key: string;
  name: string;
  role: string;
  date: string;
  email?: string;
  requestedClass?: string;
}

const { Title, Text } = Typography;

// --- MOCK DATA ---
const allStudentsData: Student[] = [
  { key: '1', studentId: 'ST-00123', name: 'Asha Kimani', class: 'Grade 6', parentName: 'Jane Kimani', status: 'Active' },
  { key: '2', studentId: 'ST-00124', name: 'Brian Omondi', class: 'Grade 6', parentName: 'Mary Omondi', status: 'Active' },
  { key: '3', studentId: 'ST-00125', name: 'Fatima Yusuf', class: 'Grade 6', parentName: 'Ali Yusuf', status: 'Suspended' },
  { key: '4', studentId: 'ST-00201', name: 'David Mwangi', class: 'Grade 5', parentName: 'Grace Mwangi', status: 'Active' },
  { key: '5', studentId: 'ST-00202', name: 'Christine Achieng', class: 'Grade 5', parentName: 'Joseph Achieng', status: 'Active' },
  { key: '6', studentId: 'ST-00301', name: 'Samuel Leteipa', class: 'Grade 4', parentName: 'Naserian Leteipa', status: 'Active' },
  { key: '7', studentId: 'ST-00302', name: 'Grace Wanjiru', class: 'Grade 4', parentName: 'Peter Wanjiru', status: 'Active' },
];

const transferRequests: TransferRequest[] = [
  { 
    key: '1', 
    studentName: 'Jane Doe', 
    studentId: 'ST-00150', 
    fromSchool: 'Nakuru Junior Academy', 
    toSchool: 'Nairobi Primary School', 
    type: 'Incoming', 
    reason: 'Parent relocation.', 
    status: 'Pending' 
  },
];

const pendingStudents: ApprovalItem[] = [
  { key: 's1', name: 'Mary Wambui', role: 'Student', requestedClass: 'Grade 4', date: '2023-10-26' },
  { key: 's2', name: 'John Kamau (Parent of Mary Wambui)', role: 'Parent', date: '2023-10-26' },
];

const pendingStaff: ApprovalItem[] = [
  { key: 't1', name: 'Esther Nekesa', role: 'Teacher', email: 'enekesa@example.com', date: '2023-10-25' },
];

// --- Reusable Approval List Component ---
const ApprovalList = ({ 
  title, 
  data, 
  onApprove, 
  onReject 
}: { 
  title: string, 
  data: ApprovalItem[], 
  onApprove: (item: ApprovalItem) => void, 
  onReject: (item: ApprovalItem) => void 
}) => (
  <List
    header={<Title level={5}>{title}</Title>}
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
      <List.Item
        actions={[
          <Button icon={<CheckCircleOutlined />} type="primary" ghost size="small" onClick={() => onApprove(item)}>Approve</Button>,
          <Button icon={<CloseCircleOutlined />} danger size="small" onClick={() => onReject(item)}>Reject</Button>,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar icon={<UserOutlined />} />}
          title={<Text strong>{item.name}</Text>}
          description={
            item.role === 'Student' ? 
            `Role: ${item.role} | Requested Class: ${item.requestedClass}` :
            `Role: ${item.role} | Email: ${item.email || 'N/A'}`
          }
        />
        <Text type="secondary">Requested on: {item.date}</Text>
      </List.Item>
    )}
  />
);

const StudentAdministrationPage = () => {
  const [transfers, setTransfers] = useState(transferRequests);
  const [studentsToApprove, setStudentsToApprove] = useState(pendingStudents);
  const [staffToApprove, setStaffToApprove] = useState(pendingStaff);

  // --- Handlers for Transfer Tab ---
  const handleTransferAction = (key: string, action: 'approve' | 'reject') => {
    message.success(`Transfer request has been ${action}d.`);
    setTransfers(transfers.filter(t => t.key !== key));
    // TODO: API call to approve/reject transfer
  };

  // --- Handlers for Approval Tabs ---
  const handleApprove = (item: any) => {
    message.success(`User "${item.name}" has been approved and activated.`);
    if (item.role === 'Student' || item.role === 'Parent') {
      setStudentsToApprove(studentsToApprove.filter(s => s.key !== item.key));
    } else {
      setStaffToApprove(staffToApprove.filter(s => s.key !== item.key));
    }
    // TODO: API call to set user's isActive=true
  };

  const handleReject = (item: any) => {
    message.error(`Registration for "${item.name}" has been rejected.`);
    if (item.role === 'Student' || item.role === 'Parent') {
      setStudentsToApprove(studentsToApprove.filter(s => s.key !== item.key));
    } else {
      setStaffToApprove(staffToApprove.filter(s => s.key !== item.key));
    }
    // TODO: API call to delete the pending user record
  };
  // ADD these inside the StudentAdministrationPage component, after the other useState hooks

  const [isStudentModalVisible, setIsStudentModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [studentForm] = Form.useForm();

  const handleViewDetails = (student: any) => {
    setSelectedStudent(student);
    setIsEditing(false); // We are just viewing
    setIsStudentModalVisible(true);
  };

  const handleEditProfile = (student: any) => {
    setSelectedStudent(student);
    studentForm.setFieldsValue(student); // Pre-fill the form with student data
    setIsEditing(true); // We are editing
    setIsStudentModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsStudentModalVisible(false);
    setSelectedStudent(null);
  };

  const handleStudentFormSubmit = (values: any) => {
    console.log("Updated student data:", { ...selectedStudent, ...values });
    message.success(`Profile for ${selectedStudent.name} updated successfully!`);
    // TODO: API call to update student record
    // After API call, update the main table's state
    // setAllStudents(allStudents.map(s => s.key === selectedStudent.key ? { ...s, ...values } : s));
    setIsStudentModalVisible(false);
  };

  const transferColumns: ColumnsType<any> = [
    { title: 'Student Name', dataIndex: 'studentName' },
    { title: 'Type', dataIndex: 'type', render: (type: string) => <Tag color={type === 'Incoming' ? 'blue' : 'orange'}>{type}</Tag> },
    { title: 'From/To School', key: 'school', render: (_, r) => r.type === 'Incoming' ? r.fromSchool : r.toSchool },
    { title: 'Status', dataIndex: 'status', render: (status: string) => <Tag color={status === 'Pending' ? 'gold' : 'green'}>{status}</Tag> },
    {
      title: 'Action', key: 'action',
      render: (_, record) => (
        record.status === 'Pending' ? (
          <Space>
            <Button icon={<CheckCircleOutlined />} type="primary" ghost size="small" onClick={() => handleTransferAction(record.key, 'approve')}>Approve</Button>
            <Button icon={<CloseCircleOutlined />} danger size="small" onClick={() => handleTransferAction(record.key, 'reject')}>Reject</Button>
          </Space>
        ) : null
      ),
    },
  ];
  // ADD this inside the StudentAdministrationPage component
  const allStudentsColumns: ColumnsType<Student> = [
    { title: 'Student ID', dataIndex: 'studentId', key: 'studentId' },
    { title: 'Full Name', dataIndex: 'name', key: 'name' },
    { title: 'Class', dataIndex: 'class', key: 'class' },
    { title: 'Parent/Guardian', dataIndex: 'parentName', key: 'parentName' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => handleViewDetails(record)}>View Details</Button>
          <Button size="small" type="primary" ghost onClick={() => handleEditProfile(record)}>Edit Profile</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>User Administration</Title>
      
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={`Approve New Users (${studentsToApprove.length + staffToApprove.length})`} key="1">
          <Card>
            <ApprovalList
              title="Pending Students & Parents"
              data={studentsToApprove}
              onApprove={handleApprove}
              onReject={handleReject}
            />
            <ApprovalList
              title="Pending Staff"
              data={staffToApprove}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="All Students" key="2">
            <Card>
                <Input.Search 
                    placeholder="Search by Student Name or ID..." 
                    style={{ marginBottom: 16 }}
                    // onSearch={...}
                />
                <Table columns={allStudentsColumns} dataSource={allStudentsData} />
            </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab={`Transfer Requests (${transfers.length})`} key="3">
            <Card>
                <Table columns={transferColumns} dataSource={transfers} />
            </Card>
        </Tabs.TabPane>
      </Tabs>
      <Modal
        title={isEditing ? `Edit Profile: ${selectedStudent?.name}` : `Student Details: ${selectedStudent?.name}`}
        visible={isStudentModalVisible}
        onCancel={handleModalCancel}
        footer={null} // We will control the footer with the form
        width={600}
      >
        {selectedStudent && (
          isEditing ? (
            // --- EDIT FORM ---
            <Form form={studentForm} layout="vertical" onFinish={handleStudentFormSubmit} initialValues={selectedStudent}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="studentId" label="Student ID" rules={[{ required: true }]}>
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="class" label="Class" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="parentName" label="Parent/Guardian Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button onClick={handleModalCancel} style={{ marginRight: 8 }}>Cancel</Button>
                <Button type="primary" htmlType="submit">Save Changes</Button>
              </Form.Item>
            </Form>
          ) : (
            // --- VIEW DETAILS ---
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Student ID">{selectedStudent.studentId}</Descriptions.Item>
              <Descriptions.Item label="Full Name">{selectedStudent.name}</Descriptions.Item>
              <Descriptions.Item label="Class">{selectedStudent.class}</Descriptions.Item>
              <Descriptions.Item label="Parent/Guardian">{selectedStudent.parentName}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={selectedStudent.status === 'Active' ? 'green' : 'volcano'}>
                  {selectedStudent.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          )
        )}
      </Modal>
    </div>
  );
};

export default StudentAdministrationPage;