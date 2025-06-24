import { useState } from 'react';
import {
  Typography, Card, Row, Col, Avatar, Badge, List, Tag, Progress,
  Button, Space, Divider, Statistic, Tabs, Timeline, Select, Input,
  Modal, Drawer, message, Form
} from 'antd';
import {
  CheckCircleOutlined, ClockCircleOutlined, UserOutlined, TeamOutlined,
  CalendarOutlined, FileTextOutlined, PlusOutlined,
  FilterOutlined, SortAscendingOutlined, InfoCircleOutlined, MailOutlined,
  StarOutlined, BarChartOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
  DownloadOutlined, FileExcelOutlined, FilePdfOutlined, PlusCircleOutlined
} from '@ant-design/icons';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

// Mock data for tasks
const tasks = [
  {
    id: 1,
    title: 'Review School Budget Proposals',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2025-06-30',
    assignee: 'John Doe',
    avatarColor: '#1890ff',
    completion: 65,
  },
  {
    id: 2,
    title: 'Approve Infrastructure Project Plans',
    priority: 'High',
    status: 'Pending',
    dueDate: '2025-07-05',
    assignee: 'Sarah Johnson',
    avatarColor: '#52c41a',
    completion: 30,
  },
  {
    id: 3,
    title: 'Coordinate Teacher Training Program',
    priority: 'Medium',
    status: 'Completed',
    dueDate: '2025-06-15',
    assignee: 'Michael Brown',
    avatarColor: '#722ed1',
    completion: 100,
  },
  {
    id: 4,
    title: 'Prepare Quarterly Performance Report',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2025-07-10',
    assignee: 'Emily Wilson',
    avatarColor: '#fa8c16',
    completion: 45,
  },
  {
    id: 5,
    title: 'Schedule School Inspection Visits',
    priority: 'Low',
    status: 'Pending',
    dueDate: '2025-07-15',
    assignee: 'David Clark',
    avatarColor: '#eb2f96',
    completion: 10,
  },
];

// Mock data for team members
const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Education Director',
    email: 'john.doe@county.gov',
    phone: '+254 712 345 678',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'online',
    tasksCompleted: 24,
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Infrastructure Manager',
    email: 'sarah.johnson@county.gov',
    phone: '+254 723 456 789',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    status: 'offline',
    tasksCompleted: 18,
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Finance Officer',
    email: 'michael.brown@county.gov',
    phone: '+254 734 567 890',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    status: 'online',
    tasksCompleted: 31,
    rating: 4.9,
  },
  {
    id: 4,
    name: 'Emily Wilson',
    role: 'Quality Assurance',
    email: 'emily.wilson@county.gov',
    phone: '+254 745 678 901',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    status: 'online',
    tasksCompleted: 15,
    rating: 4.2,
  },
  {
    id: 5,
    name: 'David Clark',
    role: 'Curriculum Specialist',
    email: 'david.clark@county.gov',
    phone: '+254 756 789 012',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    status: 'offline',
    tasksCompleted: 22,
    rating: 4.6,
  },
];

// Mock data for performance metrics
const performanceData = [
  { month: 'Jan', tasks: 18, completion: 85 },
  { month: 'Feb', tasks: 22, completion: 78 },
  { month: 'Mar', tasks: 25, completion: 92 },
  { month: 'Apr', tasks: 30, completion: 88 },
  { month: 'May', tasks: 28, completion: 95 },
  { month: 'Jun', tasks: 32, completion: 90 },
];

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    action: 'Task Completed',
    description: 'Quarterly budget review completed',
    user: 'Michael Brown',
    time: '2 hours ago',
  },
  {
    id: 2,
    action: 'New Task',
    description: 'School inspection schedule created',
    user: 'Sarah Johnson',
    time: '4 hours ago',
  },
  {
    id: 3,
    action: 'Task Updated',
    description: 'Infrastructure project timeline extended',
    user: 'John Doe',
    time: 'Yesterday',
  },
  {
    id: 4,
    action: 'Comment Added',
    description: 'Feedback on teacher training program',
    user: 'Emily Wilson',
    time: 'Yesterday',
  },
  {
    id: 5,
    action: 'Document Uploaded',
    description: 'New curriculum guidelines uploaded',
    user: 'David Clark',
    time: '2 days ago',
  },
];

const CountyManagement = () => {
  // State for task management
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  
  // State for team member management
  const [isTeamMemberDrawerVisible, setIsTeamMemberDrawerVisible] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<any>(null);
  
  // State for export functionality
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  
  // Handle task actions
  const viewTaskDetails = (task: any) => {
    setSelectedTask(task);
    setIsTaskModalVisible(true);
  };
  
  const handleAddTask = () => {
    setIsAddTaskModalVisible(true);
  };
  
  const handleTaskSubmit = () => {
    message.success('New task added successfully!');
    setIsAddTaskModalVisible(false);
  };
  
  const handleTaskUpdate = (taskId: number) => {
    message.success(`Task #${taskId} updated successfully!`);
    setIsTaskModalVisible(false);
  };
  
  // Handle team member actions
  const viewTeamMemberDetails = (member: any) => {
    setSelectedTeamMember(member);
    setIsTeamMemberDrawerVisible(true);
  };
  
  // Handle export actions
  const handleExport = () => {
    setIsExportModalVisible(true);
  };
  
  const handleExportFormat = (format: string) => {
    setIsExportModalVisible(false);
    message.success(`Exporting management data as ${format}`);
    // In a real implementation, you would use a library like xlsx or jspdf
  };
  const [activeTaskTab, setActiveTaskTab] = useState('1');
  
  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'processing';
      case 'Pending': return 'warning';
      default: return 'default';
    }
  };

  // Helper function to get priority color
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High': return '#f5222d';
      case 'Medium': return '#faad14';
      case 'Low': return '#52c41a';
      default: return '#1890ff';
    }
  };

  return (
    <div style={{ padding: '0 12px' }}>
      {/* Header with gradient background */}
      <div style={{ 
        background: 'linear-gradient(135deg, #722ed1 0%, #1890ff 100%)', 
        padding: '24px', 
        borderRadius: '8px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <Title level={2} style={{ color: 'white', margin: 0 }}>County Management Dashboard</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 0 }}>
          Manage tasks, team performance, and county education initiatives efficiently.
        </Paragraph>
        <Text style={{ color: 'rgba(255,255,255,0.65)' }}>
          <CalendarOutlined style={{ marginRight: 8 }} />
          Last updated: June 22, 2025
        </Text>
      </div>

      {/* Summary Statistics */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ height: '100%' }}>
            <Statistic 
              title={<Text strong>Total Tasks</Text>} 
              value={tasks.length} 
              prefix={<FileTextOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ height: '100%' }}>
            <Statistic 
              title={<Text strong>Completed Tasks</Text>} 
              value={tasks.filter(t => t.status === 'Completed').length} 
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ height: '100%' }}>
            <Statistic 
              title={<Text strong>Team Members</Text>} 
              value={teamMembers.length} 
              prefix={<TeamOutlined style={{ color: '#722ed1' }} />}
              valueStyle={{ color: '#722ed1' }} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{ height: '100%' }}>
            <Statistic 
              title={<Text strong>Completion Rate</Text>} 
              value={85} 
              suffix="%" 
              prefix={<BarChartOutlined style={{ color: '#fa8c16' }} />}
              valueStyle={{ color: '#fa8c16' }} 
            />
          </Card>
        </Col>
      </Row>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button 
          type="primary" 
          icon={<DownloadOutlined />} 
          onClick={handleExport}
        >
          Export Dashboard
        </Button>
      </div>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        {/* Left Column - Tasks Management */}
        <Col xs={24} lg={16}>
          <Card 
            title="Task Management" 
            extra={
              <Space>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={handleAddTask}
                >
                  Add Task
                </Button>
                <Button 
                  icon={<FilterOutlined />}
                  onClick={() => message.info('Filter functionality would be implemented here')}
                >
                  Filter
                </Button>
                <Button 
                  icon={<SortAscendingOutlined />}
                  onClick={() => message.info('Sort functionality would be implemented here')}
                >
                  Sort
                </Button>
              </Space>
            }
            style={{ marginBottom: 24 }}
            tabList={[
              { key: '1', tab: 'All Tasks' },
              { key: '2', tab: 'My Tasks' },
              { key: '3', tab: 'Completed' },
            ]}
            activeTabKey={activeTaskTab}
            onTabChange={key => setActiveTaskTab(key)}
          >
            <Space style={{ marginBottom: 16 }} size="middle" wrap>
              <Search placeholder="Search tasks" style={{ width: 250 }} />
              <Select defaultValue="all" style={{ width: 150 }}>
                <Select.Option value="all">All Priorities</Select.Option>
                <Select.Option value="high">High Priority</Select.Option>
                <Select.Option value="medium">Medium Priority</Select.Option>
                <Select.Option value="low">Low Priority</Select.Option>
              </Select>
              <Button icon={<FilterOutlined />}>Filter</Button>
              <Button icon={<SortAscendingOutlined />}>Sort</Button>
            </Space>

            <List
              itemLayout="horizontal"
              dataSource={tasks}
              renderItem={task => (
                <List.Item
                  actions={[
                    <Button 
                      key="view" 
                      type="text" 
                      icon={<EyeOutlined />} 
                      onClick={() => viewTaskDetails(task)}
                    >
                      View
                    </Button>,
                    <Button 
                      key="edit" 
                      type="text" 
                      icon={<EditOutlined />} 
                      onClick={() => {
                        setSelectedTask(task);
                        message.info(`Edit functionality for task: ${task.title}`);
                      }}
                    >
                      Edit
                    </Button>,
                    <Button 
                      key="delete" 
                      type="text" 
                      danger 
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        Modal.confirm({
                          title: 'Are you sure you want to delete this task?',
                          content: `Task: ${task.title}`,
                          okText: 'Yes',
                          okType: 'danger',
                          cancelText: 'No',
                          onOk() {
                            message.success(`Task "${task.title}" deleted successfully`);
                          },
                        });
                      }}
                    >
                      Delete
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ backgroundColor: task.avatarColor }}>
                        {task.assignee.charAt(0)}
                      </Avatar>
                    }
                    title={
                      <Space>
                        <Text strong>{task.title}</Text>
                        <Badge status={getStatusColor(task.status) as any} text={task.status} />
                        <Tag color={getPriorityColor(task.priority)}>{task.priority}</Tag>
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={2} style={{ width: '100%' }}>
                        <Space>
                          <UserOutlined /> {task.assignee}
                          <ClockCircleOutlined /> Due: {task.dueDate}
                        </Space>
                        <Progress percent={task.completion} size="small" status={task.completion === 100 ? 'success' : 'active'} />
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Performance Chart */}
          <Card title="Team Performance Metrics" style={{ marginBottom: 24 }}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Task Completion" key="1">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="tasks" stroke="#1890ff" activeDot={{ r: 8 }} name="Tasks Assigned" />
                    <Line type="monotone" dataKey="completion" stroke="#52c41a" name="Completion Rate (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </TabPane>
              <TabPane tab="Workload Distribution" key="2">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="tasks" stackId="1" stroke="#8884d8" fill="#8884d8" name="Tasks" />
                    <Area type="monotone" dataKey="completion" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Completion" />
                  </AreaChart>
                </ResponsiveContainer>
              </TabPane>
            </Tabs>
          </Card>
        </Col>

        {/* Right Column - Team & Activities */}
        <Col xs={24} lg={8}>
          {/* Team Members */}
          <Card 
            title="Team Members" 
            extra={<Button type="link" onClick={() => message.info('Navigating to full team members list')}>View All</Button>}
            style={{ marginBottom: 24 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={teamMembers}
              renderItem={member => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Badge dot status={member.status === 'online' ? 'success' : 'default'} offset={[-5, 32]}>
                        <Avatar 
                          src={member.avatar} 
                          size={40} 
                          style={{ cursor: 'pointer' }}
                          onClick={() => viewTeamMemberDetails(member)}
                        />
                      </Badge>
                    }
                    title={
                      <Space 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => viewTeamMemberDetails(member)}
                      >
                        <Text strong>{member.name}</Text>
                        <Tag color="blue">{member.role}</Tag>
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={2}>
                        <Text type="secondary"><MailOutlined /> {member.email}</Text>
                        <Space>
                          <Text type="secondary"><CheckCircleOutlined /> {member.tasksCompleted} tasks</Text>
                          <Text type="secondary"><StarOutlined /> {member.rating}</Text>
                        </Space>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Recent Activities */}
          <Card title="Recent Activities">
            <Timeline>
              {recentActivities.map(activity => (
                <Timeline.Item key={activity.id} color={activity.action === 'Task Completed' ? 'green' : 'blue'}>
                  <Text strong>{activity.action}</Text>
                  <br />
                  <Text>{activity.description}</Text>
                  <br />
                  <Text type="secondary">
                    <UserOutlined /> {activity.user} • <ClockCircleOutlined /> {activity.time}
                  </Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>

      <Divider style={{ margin: '24px 0' }} />
      <Paragraph type="secondary" style={{ textAlign: 'center' }}>
        <InfoCircleOutlined style={{ marginRight: 8 }} />
        Management dashboard data is updated daily. For real-time updates, please refresh the page.
      </Paragraph>
      
      {/* Task Details Modal */}
      <Modal
        title={selectedTask ? `Task Details: ${selectedTask.title}` : 'Task Details'}
        open={isTaskModalVisible}
        onCancel={() => setIsTaskModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsTaskModalVisible(false)}>
            Close
          </Button>,
          <Button 
            key="update" 
            type="primary" 
            onClick={() => handleTaskUpdate(selectedTask?.id)}
          >
            Update Status
          </Button>,
        ]}
        width={600}
      >
        {selectedTask && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card bordered={false}>
                  <Statistic 
                    title="Completion" 
                    value={selectedTask.completion} 
                    suffix="%"
                    valueStyle={{ 
                      color: selectedTask.completion === 100 ? '#52c41a' : 
                             selectedTask.completion > 50 ? '#1890ff' : '#faad14' 
                    }}
                  />
                  <Progress 
                    percent={selectedTask.completion} 
                    status={selectedTask.completion === 100 ? 'success' : 'active'}
                  />
                </Card>
              </Col>
            </Row>
            
            <Divider orientation="left">Task Information</Divider>
            <p><strong>Priority:</strong> <Tag color={getPriorityColor(selectedTask.priority)}>{selectedTask.priority}</Tag></p>
            <p><strong>Status:</strong> <Tag color={getStatusColor(selectedTask.status)}>{selectedTask.status}</Tag></p>
            <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
            <p><strong>Assignee:</strong> {selectedTask.assignee}</p>
            
            <Divider orientation="left">Actions</Divider>
            <Space>
              <Button 
                type="primary" 
                icon={<CheckCircleOutlined />}
                onClick={() => {
                  message.success(`Task marked as completed`);
                  setIsTaskModalVisible(false);
                }}
                disabled={selectedTask.status === 'Completed'}
              >
                Mark as Completed
              </Button>
              <Button 
                icon={<CalendarOutlined />}
                onClick={() => message.info('Extend deadline functionality would be implemented here')}
              >
                Extend Deadline
              </Button>
            </Space>
          </div>
        )}
      </Modal>
      
      {/* Add Task Modal */}
      <Modal
        title="Add New Task"
        open={isAddTaskModalVisible}
        onCancel={() => setIsAddTaskModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsAddTaskModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleTaskSubmit}>
            Add Task
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Task Title" required>
            <Input placeholder="Enter task title" />
          </Form.Item>
          <Form.Item label="Priority" required>
            <Select placeholder="Select priority" style={{ width: '100%' }}>
              <Select.Option value="High">High</Select.Option>
              <Select.Option value="Medium">Medium</Select.Option>
              <Select.Option value="Low">Low</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Assignee" required>
            <Select placeholder="Select team member" style={{ width: '100%' }}>
              {teamMembers.map(member => (
                <Select.Option key={member.id} value={member.name}>{member.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Due Date" required>
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
      
      {/* Team Member Details Drawer */}
      <Drawer
        title={selectedTeamMember ? `${selectedTeamMember.name} - ${selectedTeamMember.role}` : 'Team Member Details'}
        placement="right"
        onClose={() => setIsTeamMemberDrawerVisible(false)}
        open={isTeamMemberDrawerVisible}
        width={500}
      >
        {selectedTeamMember && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Avatar src={selectedTeamMember.avatar} size={100} />
              <div style={{ marginTop: 16 }}>
                <Tag color={selectedTeamMember.status === 'online' ? 'green' : 'default'}>
                  {selectedTeamMember.status === 'online' ? 'Online' : 'Offline'}
                </Tag>
              </div>
            </div>
            
            <Divider orientation="left">Contact Information</Divider>
            <p><MailOutlined /> <strong>Email:</strong> {selectedTeamMember.email}</p>
            <p><UserOutlined /> <strong>Phone:</strong> {selectedTeamMember.phone}</p>
            
            <Divider orientation="left">Performance</Divider>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic 
                  title="Tasks Completed" 
                  value={selectedTeamMember.tasksCompleted} 
                  prefix={<CheckCircleOutlined />}
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title="Rating" 
                  value={selectedTeamMember.rating} 
                  prefix={<StarOutlined />}
                  precision={1}
                />
              </Col>
            </Row>
            
            <Divider orientation="left">Actions</Divider>
            <Space>
              <Button 
                type="primary" 
                icon={<MailOutlined />}
                onClick={() => message.info(`Sending message to ${selectedTeamMember.name}`)}
              >
                Send Message
              </Button>
              <Button 
                icon={<PlusCircleOutlined />}
                onClick={() => message.info(`Assigning new task to ${selectedTeamMember.name}`)}
              >
                Assign Task
              </Button>
            </Space>
          </div>
        )}
      </Drawer>
      
      {/* Export Modal */}
      <Modal
        title="Export Management Dashboard"
        open={isExportModalVisible}
        onCancel={() => setIsExportModalVisible(false)}
        footer={null}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button 
            type="primary" 
            icon={<FileExcelOutlined />} 
            block 
            onClick={() => handleExportFormat('Excel')}
          >
            Export as Excel
          </Button>
          <Button 
            icon={<FilePdfOutlined />} 
            block 
            onClick={() => handleExportFormat('PDF')}
          >
            Export as PDF
          </Button>
        </Space>
      </Modal>
    </div>
  );
};

export default CountyManagement;
