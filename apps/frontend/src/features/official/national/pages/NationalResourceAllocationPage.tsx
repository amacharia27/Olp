// apps/frontend/src/features/official/national/pages/NationalResourceAllocationPage.tsx
import { Card, Col, Row, Statistic, Typography, Table, Tag, Input, Space, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TeamOutlined, DollarCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Search } = Input;

// --- MOCK DATA ---
const nationalResourceStats = {
    totalTeachers: 350000,
    nationalStudentTeacherRatio: 30.1, // avg students per teacher
    totalCapitation: 25000000000, // 25 Billion KES
};

const countyResourceData = [
  { key: '1', name: 'Nairobi', students: 185670, teachers: 6000, ratio: 30.9, capitationPerStudent: 2350, flag: null },
  { key: '2', name: 'Turkana', students: 89000, teachers: 1800, ratio: 49.4, capitationPerStudent: 2800, flag: 'High Student-Teacher Ratio' },
  { key: '3', name: 'Kiambu', students: 150000, teachers: 5500, ratio: 27.2, capitationPerStudent: 2400, flag: null },
  { key: '4', name: 'Wajir', students: 45000, teachers: 950, ratio: 47.3, capitationPerStudent: 2950, flag: 'High Student-Teacher Ratio' },
  { key: '5', name: 'Mombasa', students: 110000, teachers: 3800, ratio: 28.9, capitationPerStudent: 2500, flag: null },
  { key: '6', name: 'Mandera', students: 38000, teachers: 800, ratio: 47.5, capitationPerStudent: 3100, flag: 'High Student-Teacher Ratio' },
];

const NationalResourceAllocationPage = () => {
    // TODO: Add API calls and state management

    const columns: ColumnsType<any> = [
        { title: 'County', dataIndex: 'name', key: 'name', sorter: (a,b) => a.name.localeCompare(b.name) },
        { title: 'Total Students', dataIndex: 'students', key: 'students', render: val => val.toLocaleString(), sorter: (a,b) => a.students - b.students },
        { title: 'Total Teachers', dataIndex: 'teachers', key: 'teachers', render: val => val.toLocaleString(), sorter: (a,b) => a.teachers - b.teachers },
        { 
            title: 'Student-Teacher Ratio', 
            dataIndex: 'ratio', 
            key: 'ratio',
            sorter: (a,b) => a.ratio - b.ratio,
            render: (ratio) => {
                const color = ratio > 40 ? 'volcano' : ratio > 35 ? 'orange' : 'green';
                return <Tag color={color}>{ratio.toFixed(1)} : 1</Tag>
            }
        },
        { 
            title: (
                <Space>
                    Capitation per Student (KES) 
                    <Tooltip title="Estimated annual government funding allocated per student in this county.">
                        <InfoCircleOutlined />
                    </Tooltip>
                </Space>
            ), 
            dataIndex: 'capitationPerStudent', 
            key: 'capitationPerStudent',
            sorter: (a,b) => a.capitationPerStudent - b.capitationPerStudent,
            render: val => val.toLocaleString(),
        },
        { 
            title: 'Flagged Issues',
            dataIndex: 'flag', 
            key: 'flag',
            render: flag => flag ? <Tag color="red">{flag}</Tag> : <Tag color="gray">None</Tag>
        },
    ];

    return (
        <div>
            <Title level={2}>National Resource Allocation</Title>
            <Paragraph type="secondary">Analyze the distribution of teachers and financial resources across all counties to ensure equity.</Paragraph>
            
            <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={12} lg={6}>
                    <Card><Statistic title="Total Registered Teachers" value={nationalResourceStats.totalTeachers} prefix={<TeamOutlined />} formatter={(val) => val.toLocaleString()} /></Card>
                </Col>
                 <Col xs={24} sm={12} lg={6}>
                    <Card><Statistic title="National Student-Teacher Ratio" value={nationalResourceStats.nationalStudentTeacherRatio} suffix=": 1" precision={1} /></Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card><Statistic title="Total Annual Capitation" value={nationalResourceStats.totalCapitation} prefix="KES" formatter={(val) => (val as number / 1000000000).toFixed(1) + 'B'} /></Card>
                </Col>
            </Row>

            <Card title="Resource Distribution by County">
                <Search placeholder="Search by county name..." style={{ marginBottom: 16, width: 300 }} />
                <Table 
                    columns={columns} 
                    dataSource={countyResourceData}
                    bordered
                    />
            </Card>
        </div>
    );
};

export default NationalResourceAllocationPage;