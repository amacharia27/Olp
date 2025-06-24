// apps/frontend/src/pages/ProfilePage.tsx
import { Card, Typography, Avatar, Tag, Button, Row, Col, Tabs, Divider, Statistic, Progress, message, Upload, Modal, Input } from 'antd';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import { UserOutlined, EditOutlined, CameraOutlined, MailOutlined, PhoneOutlined, HomeOutlined, CalendarOutlined, TrophyOutlined, BookOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/store/auth.store';
import { useState } from 'react';
import { UserRole } from '@olp-monitor/shared-types';

const { Title, Paragraph, Text } = Typography;

const ProfilePage = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('1');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '+254 712 345 678', // Default phone number since it's not in user object
    address: 'Nairobi, Kenya',
  });

  // Determine if the user is an official (not associated with a school)
  const isOfficial = user && [
    UserRole.NATIONAL_OFFICIAL,
    UserRole.COUNTY_OFFICIAL,
    UserRole.SUB_COUNTY_OFFICIAL
  ].includes(user.role);

  // Mock data that would normally be joined from other collections
  const userDetails = {
    ...user,
    className: !isOfficial ? 'Grade 6 - Eagle' : undefined,
    schoolName: !isOfficial ? 'Nairobi Primary School' : undefined,
    admissionDate: !isOfficial ? '2018-01-10' : '2022-05-15',
    phone: '+254 712 345 678',
    address: 'Nairobi, Kenya',
    attendance: !isOfficial ? 95 : undefined,
    performance: !isOfficial ? 87 : undefined,
    achievements: [
      { title: 'Science Fair Winner', date: 'March 2023', description: 'First place in county science competition' },
      { title: 'Perfect Attendance', date: 'Term 1, 2023', description: '100% attendance record' },
      { title: 'Math Olympiad Finalist', date: 'May 2022', description: 'Top 5 in national competition' },
    ],
    subjects: [
      { name: 'Mathematics', grade: 'A', progress: 92 },
      { name: 'English', grade: 'A-', progress: 88 },
      { name: 'Science', grade: 'B+', progress: 85 },
      { name: 'Social Studies', grade: 'A', progress: 90 },
    ],
  };

  const handleEditProfile = () => {
    setIsEditModalVisible(true);
  };

  const handleEditFormChange = (field: string, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // In a real app, this would make an API call to update the user profile
    message.success('Profile updated successfully!');
    setIsEditModalVisible(false);
  };

  const handleUploadPhoto = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  return (
    <div className="profile-page">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card className="profile-card" bordered={false} style={{ textAlign: 'center', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
              <Avatar 
                size={150} 
                icon={<UserOutlined />} 
                style={{ 
                  backgroundColor: '#1890ff',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }} 
              />
              <Upload
                name="avatar"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={handleUploadPhoto}
              >
                <Button 
                  type="primary" 
                  shape="circle" 
                  icon={<CameraOutlined />} 
                  size="small"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                />
              </Upload>
            </div>
            
            <Title level={3} style={{ margin: '8px 0' }}>{`${user?.firstName} ${user?.lastName}`}</Title>
            <Tag color="blue" style={{ marginBottom: '16px', padding: '0 12px', height: '24px', lineHeight: '24px' }}>{user?.role}</Tag>
            
            <div style={{ textAlign: 'left', marginTop: '24px' }}>
              <p><MailOutlined style={{ marginRight: '8px' }} /> {userDetails.email || 'N/A'}</p>
              <p><PhoneOutlined style={{ marginRight: '8px' }} /> {userDetails.phone}</p>
              <p><HomeOutlined style={{ marginRight: '8px' }} /> {userDetails.address}</p>
              <p><CalendarOutlined style={{ marginRight: '8px' }} /> Joined: {userDetails.admissionDate}</p>
            </div>
            
            <Divider style={{ margin: '16px 0' }} />
            
            {!isOfficial && (
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic 
                    title="Attendance" 
                    value={userDetails.attendance || 0} 
                    suffix="%" 
                    valueStyle={{ color: (userDetails.attendance || 0) > 90 ? '#3f8600' : '#faad14' }} 
                  />
                </Col>
                <Col span={12}>
                  <Statistic 
                    title="Performance" 
                    value={userDetails.performance || 0} 
                    suffix="%" 
                    valueStyle={{ color: (userDetails.performance || 0) > 85 ? '#3f8600' : '#faad14' }} 
                  />
                </Col>
              </Row>
            )}
            
            <Button 
              type="primary" 
              icon={<EditOutlined />} 
              style={{ marginTop: '24px', width: '100%' }} 
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
          </Card>
        </Col>
        
        <Col xs={24} md={16}>
          <Card bordered={false} style={{ borderRadius: '12px' }}>
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              items={[
                {
                  key: '1',
                  label: 'Academic Information',
                  children: (
                    <div>
                      <Row gutter={[16, 16]}>
                        <Col span={24}>
                          {!isOfficial ? (
                            <Card title="School Information" size="small" bordered={false} style={{ background: '#f9f9f9' }}>
                              <p><strong>School:</strong> {userDetails.schoolName}</p>
                              <p><strong>Class:</strong> {userDetails.className}</p>
                              <p><strong>Admission Date:</strong> {userDetails.admissionDate}</p>
                              <p><strong>Student ID:</strong> {user?.userNumber || 'N/A'}</p>
                            </Card>
                          ) : (
                            <Card title="Official Information" size="small" bordered={false} style={{ background: '#f9f9f9' }}>
                              <p><strong>Role:</strong> {user?.role}</p>
                              <p><strong>Official ID:</strong> {user?.userNumber || 'N/A'}</p>
                              <p><strong>Appointment Date:</strong> {userDetails.admissionDate}</p>
                            </Card>
                          )}
                        </Col>
                        
                        <Col span={24}>
                          <Title level={5}>Subject Performance</Title>
                          {userDetails.subjects.map((subject, index) => (
                            <div key={index} style={{ marginBottom: '16px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <Text strong>{subject.name}</Text>
                                <Text type="secondary">Grade: {subject.grade}</Text>
                              </div>
                              <Progress 
                                percent={subject.progress} 
                                strokeColor={{
                                  '0%': '#108ee9',
                                  '100%': '#87d068',
                                }}
                                size="small"
                              />
                            </div>
                          ))}
                        </Col>
                      </Row>
                    </div>
                  ),
                },
                {
                  key: '2',
                  label: 'Achievements',
                  children: (
                    <div>
                      {userDetails.achievements.map((achievement, index) => (
                        <Card 
                          key={index} 
                          size="small" 
                          style={{ marginBottom: '16px', borderLeft: '4px solid #1890ff' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <TrophyOutlined style={{ fontSize: '24px', color: '#faad14', marginRight: '16px', marginTop: '4px' }} />
                            <div>
                              <Text strong>{achievement.title}</Text>
                              <div>
                                <Text type="secondary">{achievement.date}</Text>
                              </div>
                              <Paragraph style={{ marginTop: '8px' }}>{achievement.description}</Paragraph>
                            </div>
                          </div>
                        </Card>
                      ))}
                      
                      <Button type="dashed" block icon={<BookOutlined />}>
                        View All Achievements
                      </Button>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
      
      {/* Edit Profile Modal */}
      <Modal
        title="Edit Profile"
        open={isEditModalVisible}
        onOk={handleSaveProfile}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Save Changes"
      >
        <div style={{ marginBottom: '16px' }}>
          <Text strong>First Name</Text>
          <Input 
            value={editForm.firstName} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditFormChange('firstName', e.target.value)} 
            style={{ marginTop: '8px' }} 
          />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <Text strong>Last Name</Text>
          <Input 
            value={editForm.lastName} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditFormChange('lastName', e.target.value)} 
            style={{ marginTop: '8px' }} 
          />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <Text strong>Email</Text>
          <Input 
            value={editForm.email} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditFormChange('email', e.target.value)} 
            style={{ marginTop: '8px' }} 
          />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <Text strong>Phone</Text>
          <Input 
            value={editForm.phone} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditFormChange('phone', e.target.value)} 
            style={{ marginTop: '8px' }} 
          />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <Text strong>Address</Text>
          <Input 
            value={editForm.address} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditFormChange('address', e.target.value)} 
            style={{ marginTop: '8px' }} 
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;