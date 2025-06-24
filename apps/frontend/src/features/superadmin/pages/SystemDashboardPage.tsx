// apps/frontend/src/features/superadmin/pages/SystemDashboardPage.tsx
import { Card, Col, Row, Statistic, Typography, List, Tag, Avatar, Button, Spin, Alert } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
    AppstoreAddOutlined, TeamOutlined, CheckCircleOutlined, 
    ExclamationCircleOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const { Title, Text, Paragraph } = Typography;

// --- MOCK DATA (Retaining your relevant data points) ---
const signupData = [
    { month: 'Jun', signups: 5 }, { month: 'Jul', signups: 8 },
    { month: 'Aug', signups: 12 }, { month: 'Sep', signups: 25 },
    { month: 'Oct', signups: 18 }, { month: 'Nov', signups: 32 },
];

const recentActivity = [
    { key: '1', text: 'New school "Nakuru Hills Academy" registered and is awaiting approval.', type: 'Approval', link: '/tenant-management' },
    { key: '2', text: 'Subscription for "Mombasa Primary" is due to expire in 7 days.', type: 'Billing', link: '#' },
    { key: '3', text: 'API health check reported high latency.', type: 'System', link: '#' },
];

const SystemDashboardPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate data loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
                <Alert 
                    style={{ marginTop: 20 }}
                    message="Loading Super Admin Dashboard..."
                    type="info"
                />
            </div>
        );
    }

    return (
        <div style={{ background: '#f8f9fa', padding: '24px', borderRadius: '8px', minHeight: '100vh' }}>
            <Title level={2} style={{ margin: 0, fontWeight: 600 }}>Super Administrator Dashboard</Title>
            <Paragraph type="secondary">An overview of the entire OLP Monitor platform's health and growth.</Paragraph>
            
            <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false}>
                        <Statistic 
                            title={<Text type="secondary">Total Schools (Tenants)</Text>} 
                            value={152} 
                            prefix={<AppstoreAddOutlined />} 
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false}>
                        <Statistic 
                            title={<Text type="secondary">Active Subscriptions</Text>}
                            value={148} 
                            prefix={<CheckCircleOutlined />} 
                            valueStyle={{color: '#3f8600'}} 
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false}>
                        <Statistic 
                            title={<Text type="secondary">Total Platform Users</Text>}
                            value={185230} 
                            prefix={<TeamOutlined />} 
                            formatter={(value) => value.toLocaleString()}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false}>
                        <Statistic 
                            title={<Text type="secondary">Monthly Recurring Revenue (MRR)</Text>}
                            value={7400000} 
                            prefix="KES " 
                            precision={0}
                            valueStyle={{color: '#00529B'}} 
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
                <Col xs={24} lg={16}>
                    <Card title={<Title level={4} style={{margin:0}}>New School Sign-ups</Title>} bordered={false}>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={signupData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" stroke="#888"/>
                                <YAxis stroke="#888" />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <Tooltip />
                                <Area type="monotone" dataKey="signups" stroke="#8884d8" strokeWidth={2} fill="url(#colorSignups)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title={<Title level={4} style={{margin:0}}>Recent Activity & Alerts</Title>} bordered={false}>
                        <List
                            dataSource={recentActivity}
                            renderItem={item => (
                                <List.Item actions={[<Button type="link" onClick={() => navigate(item.link)}>View</Button>]}>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar 
                                                icon={item.type === 'Approval' ? <ExclamationCircleOutlined /> : <CheckCircleOutlined />} 
                                                style={{backgroundColor: item.type === 'Approval' ? '#fffbe6' : '#f6ffed', color: item.type === 'Approval' ? '#faad14' : '#52c41a'}}
                                            />
                                        }
                                        title={<a onClick={() => navigate(item.link)}>{item.text}</a>}
                                        description={<Tag>{item.type}</Tag>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default SystemDashboardPage;