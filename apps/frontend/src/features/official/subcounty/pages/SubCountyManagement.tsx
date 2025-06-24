// apps/frontend/src/features/official/subcounty/pages/SubCountyManagementPage.tsx
import { useState } from 'react';
import { Card, Table, Typography, Button, Space, Tag, Tabs, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// --- MOCK DATA ---
const pendingTransfers = [
  { key: 't1', subject: 'John Doe (Student)', fromSchool: 'Westlands Primary', toSchool: 'Lavington Primary', type: 'Student Transfer', reason: 'Parent Relocation', status: 'Pending Director Approval' },
  { key: 't2', subject: 'Susan Wanjiku (Teacher)', fromSchool: 'Kasarani Academy', toSchool: 'Nairobi Primary', type: 'Teacher Transfer', reason: 'Personal Request', status: 'Pending Director Approval' },
  { key: 't3', subject: 'Mary Smith (Student)', fromSchool: 'Rift Valley Junior', toSchool: 'Nakuru Hills Academy', type: 'Student Transfer', reason: 'Medical Reasons', status: 'Approved by Director' },
];

const pendingBursaries = [
    { key: 'b1', student: 'Asha Kimani', school: 'Nairobi Primary School', fund: 'Sub-County Education Fund', amount: 10000, status: 'Recommended by School' },
    { key: 'b2', student: 'Brian Omondi', school: 'Westlands Primary', fund: 'CDF Bursary', amount: 15000, status: 'Recommended by School' },
    { key: 'b3', student: 'Fatima Yusuf', school: 'Lavington Primary', fund: 'County Scholarship Fund', amount: 25000, status: 'Approved' },
];

const SubCountyManagementPage = () => {
    const [transfers, setTransfers] = useState(pendingTransfers);
    const [bursaries, setBursaries] = useState(pendingBursaries);

    const handleAction = (key: string, list: any[], setter: Function, action: 'approved' | 'rejected') => {
        const item = list.find(i => i.key === key);
        message.success(`Request for "${item.subject || item.student}" has been ${action}.`);
        setter(list.filter(i => i.key !== key));
        // TODO: API call here
    };

    const transferColumns: ColumnsType<any> = [
        { title: 'Subject of Transfer', dataIndex: 'subject', key: 'subject' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'From', dataIndex: 'fromSchool', key: 'fromSchool' },
        { title: 'To', dataIndex: 'toSchool', key: 'toSchool' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => <Tag color={status.includes('Pending') ? 'gold' : 'green'}>{status}</Tag> },
        {
            title: 'Actions', key: 'actions', render: (_, record) => record.status.includes('Pending') ? (
                <Space>
                    <Button type="primary" ghost size="small" icon={<CheckCircleOutlined />} onClick={() => handleAction(record.key, transfers, setTransfers, 'approved')}>Approve</Button>
                    <Button danger size="small" icon={<CloseCircleOutlined />} onClick={() => handleAction(record.key, transfers, setTransfers, 'rejected')}>Reject</Button>
                </Space>
            ) : null,
        },
    ];
    
    const bursaryColumns: ColumnsType<any> = [
        { title: 'Student Name', dataIndex: 'student', key: 'student' },
        { title: 'School', dataIndex: 'school', key: 'school' },
        { title: 'Funding Source', dataIndex: 'fund', key: 'fund' },
        { title: 'Amount (KES)', dataIndex: 'amount', key: 'amount', render: (val) => val.toLocaleString() },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => <Tag color={status.includes('Recommended') ? 'processing' : 'success'}>{status}</Tag> },
        {
            title: 'Actions', key: 'actions', render: (_, record) => record.status.includes('Recommended') ? (
                <Space>
                    <Button type="primary" ghost size="small" icon={<CheckCircleOutlined />} onClick={() => handleAction(record.key, bursaries, setBursaries, 'approved')}>Approve</Button>
                    <Button danger size="small" icon={<CloseCircleOutlined />} onClick={() => handleAction(record.key, bursaries, setBursaries, 'rejected')}>Reject</Button>
                </Space>
            ) : null,
        },
    ];

    return (
        <div>
            <Title level={2}>Management Tasks</Title>
            <Paragraph type="secondary">Approve inter-school transfers and oversee bursary allocations within your sub-county.</Paragraph>
            <Card>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab={`Transfer Requests (${transfers.filter(t => t.status.includes('Pending')).length})`} key="1">
                        <Table columns={transferColumns} dataSource={transfers} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={`Bursary Approvals (${bursaries.filter(b => b.status.includes('Recommended')).length})`} key="2">
                        <Table columns={bursaryColumns} dataSource={bursaries} />
                    </Tabs.TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

export default SubCountyManagementPage;