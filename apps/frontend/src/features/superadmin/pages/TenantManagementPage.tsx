// features/superadmin/pages/TenantManagementPage.tsx
import { useState } from 'react';
import { Card, Table, Typography, Button, Space, Tag, Input, message, Modal, Form, Select, Divider, Row, Col, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CheckCircleOutlined, PauseCircleOutlined, PlayCircleOutlined, PlusOutlined, BankOutlined } from '@ant-design/icons';
import { kenyaCounties, getSubcountiesForCounty, getWardsForSubcounty, SubCounty, Ward } from '../../../data/kenya-locations';

const { Title } = Typography;

// --- MOCK DATA ---
const schoolsData = [
  { key: '1', name: 'Nairobi Primary School', code: 'NPS-001', admin: 'H.T. Mwangi', students: 1250, status: 'Active' },
  { key: '2', name: 'Mombasa Academy', code: 'MA-001', admin: 'H.T. Ali', students: 850, status: 'Active' },
  { key: '3', name: 'Kisumu Day School', code: 'KDS-001', admin: 'H.T. Omondi', students: 1100, status: 'Suspended' },
  { key: '4', name: 'Nakuru Hills Academy', code: 'NHA-001', admin: 'H.T. Cherono', students: 0, status: 'Pending Approval' },
];

const TenantManagementPage = () => {
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [registerForm] = Form.useForm();
  const [schoolsDataState, setSchoolsDataState] = useState(schoolsData);
  const [loading, setLoading] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [selectedSubcounty, setSelectedSubcounty] = useState<string | null>(null);
  const [subcounties, setSubcounties] = useState<SubCounty[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const handleApprove = (record: any) => {
    const updatedData = schoolsDataState.map(school => 
      school.key === record.key ? { ...school, status: 'Active' } : school
    );
    setSchoolsDataState(updatedData);
    message.success(`School "${record.name}" has been approved and activated.`);
  };
  
  const handleSuspend = (record: any) => {
    const updatedData = schoolsDataState.map(school => 
      school.key === record.key ? { ...school, status: 'Suspended' } : school
    );
    setSchoolsDataState(updatedData);
    message.warning(`School "${record.name}" has been suspended.`);
  };
  
  const handleReactivate = (record: any) => {
    const updatedData = schoolsDataState.map(school => 
      school.key === record.key ? { ...school, status: 'Active' } : school
    );
    setSchoolsDataState(updatedData);
    message.info(`School "${record.name}" has been reactivated.`);
  };

  const showRegisterModal = () => {
    setIsRegisterModalVisible(true);
    // Reset form and selections when opening the modal
    registerForm.resetFields();
    setSelectedCounty(null);
    setSelectedSubcounty(null);
    setSubcounties([]);
    setWards([]);
  };

  const handleRegisterCancel = () => {
    registerForm.resetFields();
    setIsRegisterModalVisible(false);
  };

  // Handle county selection change
  const handleCountyChange = (value: string) => {
    setSelectedCounty(value);
    setSelectedSubcounty(null);
    setWards([]);
    registerForm.setFieldsValue({ subcounty: undefined, ward: undefined });
    
    const countySubcounties = getSubcountiesForCounty(value);
    setSubcounties(countySubcounties);
  };
  
  // Handle subcounty selection change
  const handleSubcountyChange = (value: string) => {
    setSelectedSubcounty(value);
    registerForm.setFieldsValue({ ward: undefined });
    
    if (selectedCounty) {
      const subcountyWards = getWardsForSubcounty(selectedCounty, value);
      setWards(subcountyWards);
    }
  };

  const handleRegisterSubmit = (values: any) => {
    setLoading(true);
    
    // Simulate API call to register new school
    setTimeout(() => {
      // Generate a unique key for the new school
      const newKey = (Math.max(...schoolsDataState.map(s => parseInt(s.key))) + 1).toString();
      
      // Generate a school code based on name
      const nameInitials = values.name
        .split(' ')
        .map((word: string) => word.charAt(0))
        .join('')
        .toUpperCase();
      const code = `${nameInitials}-${newKey.padStart(3, '0')}`;
      
      // Create new school object
      const newSchool = {
        key: newKey,
        name: values.name,
        code: code,
        admin: values.headteacherName,
        students: values.initialStudentCount || 0,
        status: 'Pending Approval',
        county: values.county,
        subcounty: values.subcounty,
        level: values.level,
        contactEmail: values.contactEmail,
        contactPhone: values.contactPhone,
        address: values.address,
        postalCode: values.postalCode,
        teacherCount: values.teacherCount || 0,
        deputyCount: values.deputyCount || 0,
        financeAdminCount: values.financeAdminCount || 0,
        yearFounded: values.yearFounded,
        schoolType: values.schoolType,
        registrationDate: new Date().toISOString().split('T')[0]
      };
      
      // Add new school to the data
      setSchoolsDataState([...schoolsDataState, newSchool]);
      
      setLoading(false);
      setIsRegisterModalVisible(false);
      registerForm.resetFields();
      message.success(`School "${values.name}" has been registered and is pending approval.`);
    }, 1500);
  };

  const columns: ColumnsType<any> = [
    { title: 'School Name', dataIndex: 'name' },
    { title: 'School Code', dataIndex: 'code' },
    { title: 'Headteacher', dataIndex: 'admin' },
    { title: 'Active Students', dataIndex: 'students' },
    { title: 'Status', dataIndex: 'status', render: (status: string) => {
        let color = 'processing';
        if (status === 'Active') color = 'success';
        if (status === 'Suspended') color = 'error';
        return <Tag color={color}>{status}</Tag>;
    }},
    {
      title: 'Action',
      render: (_, record) => (
        <Space>
          {record.status === 'Pending Approval' && <Button type="primary" ghost size="small" onClick={() => handleApprove(record)}><CheckCircleOutlined /> Approve</Button>}
          {record.status === 'Active' && <Button danger size="small" onClick={() => handleSuspend(record)}><PauseCircleOutlined /> Suspend</Button>}
          {record.status === 'Suspended' && <Button size="small" onClick={() => handleReactivate(record)}><PlayCircleOutlined /> Reactivate</Button>}
        </Space>
      )
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2}>School (Tenant) Management</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={showRegisterModal}
        >
          Register New School
        </Button>
      </div>
      
      <Card>
        <Input.Search placeholder="Search by School Name or Code" style={{ marginBottom: 16 }} />
        <Table 
          columns={columns} 
          dataSource={schoolsDataState} 
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ padding: '0 48px' }}>
                <Row gutter={24}>
                  <Col span={8}>
                    <p><strong>County:</strong> {kenyaCounties.find(c => c.id === record.county)?.name || record.county || 'Not specified'}</p>
                    <p><strong>Sub-County:</strong> {
                      record.county && record.subcounty ? 
                      getSubcountiesForCounty(record.county).find(sc => sc.id === record.subcounty)?.name || 
                      record.subcounty : 'Not specified'
                    }</p>
                    <p><strong>Ward:</strong> {
                      record.county && record.subcounty && record.ward ? 
                      getWardsForSubcounty(record.county, record.subcounty).find(w => w.id === record.ward)?.name || 
                      record.ward : 'Not specified'
                    }</p>
                    <p><strong>Address:</strong> {record.address || 'Not specified'}</p>
                    <p><strong>Postal Code:</strong> {record.postalCode || 'Not specified'}</p>
                  </Col>
                  <Col span={8}>
                    <p><strong>School Level:</strong> {record.level || 'Not specified'}</p>
                    <p><strong>School Type:</strong> {record.schoolType || 'Not specified'}</p>
                    <p><strong>Year Founded:</strong> {record.yearFounded || 'Not specified'}</p>
                    <p><strong>Contact Email:</strong> {record.contactEmail || 'Not specified'}</p>
                    <p><strong>Contact Phone:</strong> {record.contactPhone || 'Not specified'}</p>
                  </Col>
                  <Col span={8}>
                    <p><strong>Teachers:</strong> {record.teacherCount || 0}</p>
                    <p><strong>Deputy Headteachers:</strong> {record.deputyCount || 0}</p>
                    <p><strong>Finance Admins:</strong> {record.financeAdminCount || 0}</p>
                    <p><strong>Registration Date:</strong> {record.registrationDate || 'Not available'}</p>
                  </Col>
                </Row>
              </div>
            ),
          }}
        />
      </Card>
      
      {/* Register New School Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BankOutlined style={{ marginRight: 8 }} />
            Register New School
          </div>
        }
        open={isRegisterModalVisible}
        onCancel={handleRegisterCancel}
        footer={null}
        width={700}
      >
        <Form
          form={registerForm}
          layout="vertical"
          onFinish={handleRegisterSubmit}
        >
          <Divider orientation="left">Basic Information</Divider>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="School Name"
                rules={[{ required: true, message: 'Please enter the school name' }]}
              >
                <Input placeholder="Enter full school name" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="county"
                label="County"
                rules={[{ required: true, message: 'Please select a county' }]}
              >
                <Select 
                  placeholder="Select county"
                  onChange={handleCountyChange}
                  showSearch
                  optionFilterProp="children"
                >
                  {kenyaCounties.map(county => (
                    <Select.Option key={county.id} value={county.id}>
                      {county.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="subcounty"
                label="Sub-County"
                rules={[{ required: true, message: 'Please select a sub-county' }]}
              >
                <Select 
                  placeholder="Select sub-county" 
                  disabled={!selectedCounty}
                  onChange={handleSubcountyChange}
                  showSearch
                  optionFilterProp="children"
                >
                  {subcounties.map(subcounty => (
                    <Select.Option key={subcounty.id} value={subcounty.id}>
                      {subcounty.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="ward"
                label="Ward"
                rules={[{ required: true, message: 'Please select a ward' }]}
              >
                <Select 
                  placeholder="Select ward" 
                  disabled={!selectedSubcounty}
                  showSearch
                  optionFilterProp="children"
                >
                  {wards.map(ward => (
                    <Select.Option key={ward.id} value={ward.id}>
                      {ward.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="level"
                label="School Level"
                rules={[{ required: true, message: 'Please select school level' }]}
              >
                <Select placeholder="Select school level">
                  <Select.Option value="Pre-School">Pre-School</Select.Option>
                  <Select.Option value="Lower Primary">Lower Primary (Grade 1-3)</Select.Option>
                  <Select.Option value="Middle School">Middle School (Grade 4-6)</Select.Option>
                  <Select.Option value="Junior High">Junior High (Grade 7-9)</Select.Option>
                  <Select.Option value="Complete Basic">Complete Basic Education (Pre-School to Junior High)</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="schoolType"
                label="School Type"
                rules={[{ required: true, message: 'Please select school type' }]}
              >
                <Select placeholder="Select school type">
                  <Select.Option value="Public">Public</Select.Option>
                  <Select.Option value="Private">Private</Select.Option>
                  <Select.Option value="Faith-Based">Faith-Based</Select.Option>
                  <Select.Option value="Special Needs">Special Needs</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="yearFounded"
                label="Year Founded"
              >
                <Input placeholder="e.g. 1985" />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider orientation="left">Address Information</Divider>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="address"
                label="Physical Address"
                rules={[{ required: true, message: 'Please enter school address' }]}
              >
                <Input placeholder="e.g. 123 Education Road" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="postalCode"
                label="Postal Code"
              >
                <Input placeholder="e.g. 00100" />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider orientation="left">Contact Information</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="contactEmail"
                label="Contact Email"
                rules={[
                  { required: true, message: 'Please enter contact email' },
                  { type: 'email', message: 'Please enter a valid email address' }
                ]}
              >
                <Input placeholder="school@example.com" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="contactPhone"
                label="Contact Phone"
                rules={[{ required: true, message: 'Please enter contact phone number' }]}
              >
                <Input placeholder="+254 XXX XXX XXX" />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider orientation="left">Staff & Student Information</Divider>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="initialStudentCount"
                label="Active Students"
                rules={[{ required: true, message: 'Please enter student count' }]}
              >
                <Input type="number" min={0} placeholder="e.g. 500" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="teacherCount"
                label="Teachers"
                rules={[{ required: true, message: 'Please enter teacher count' }]}
              >
                <Input type="number" min={0} placeholder="e.g. 25" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="deputyCount"
                label="Deputy Headteachers"
                rules={[{ required: true, message: 'Please enter count' }]}
              >
                <Input type="number" min={0} placeholder="e.g. 2" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="financeAdminCount"
                label="Finance Admins"
                rules={[{ required: true, message: 'Please enter count' }]}
              >
                <Input type="number" min={0} placeholder="e.g. 1" />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider orientation="left">Administrator Information</Divider>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="headteacherName"
                label="Headteacher Name"
                rules={[{ required: true, message: 'Please enter headteacher name' }]}
              >
                <Input placeholder="Full name of headteacher" />
              </Form.Item>
            </Col>
          </Row>
          
          <Tooltip title="An email will be sent to the provided contact email with instructions for the headteacher to complete registration and set up their account.">
            <div style={{ marginBottom: 16 }}>
              <Tag color="blue">Note: Registration instructions will be sent to the provided email</Tag>
            </div>
          </Tooltip>
          
          <div style={{ textAlign: 'right' }}>
            <Button onClick={handleRegisterCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register School
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default TenantManagementPage;