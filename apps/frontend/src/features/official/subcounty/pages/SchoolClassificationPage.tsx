// apps/frontend/src/features/official/subcounty/pages/SchoolClassificationPage.tsx
import { useState } from 'react';
import { Card, Table, Typography, Button, Space, Tag, Select, message, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SaveOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Search } = Input;

// --- MOCK DATA ---
const schoolData = [
  { key: '1', name: 'Nairobi Primary School', code: 'NPS-001', classification: 'General' },
  { key: '2', name: 'Westlands STEM Academy', code: 'WSA-001', classification: 'STEM' },
  { key: '3', name: 'Lavington Arts & Media School', code: 'LAMS-001', classification: 'Arts and Sports' },
  { key: '4', name: 'Kasarani Technical Junior School', code: 'KTJS-001', classification: 'STEM' },
  { key: '5', name: 'Starehe Social Sciences Center', code: 'SSSC-001', classification: 'Social Sciences' },
  { key: '6', name: 'Makini School', code: 'MKN-001', classification: 'General' },
];

const classificationOptions = ['General', 'STEM', 'Arts and Sports', 'Social Sciences'];

const SchoolClassificationPage = () => {
    const [schools, setSchools] = useState(schoolData);
    const [editingKey, setEditingKey] = useState<string>('');
    const [filteredSchools, setFilteredSchools] = useState(schoolData);

    const isEditing = (record: { key: string }) => record.key === editingKey;

    const edit = (record: { key: string }) => {
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };
    
    const save = (key: string) => {
        const newData = [...schools];
        const index = newData.findIndex((item) => key === item.key);
        // In a real app, you would get the new value from a form or state
        // Here we will just simulate a change and save
        message.success(`Classification for school ${newData[index].name} saved successfully.`);
        setEditingKey('');
        // TODO: API call to update the classification
    };

    const handleClassificationChange = (value: string, key: string) => {
        const newData = schools.map(item => 
            item.key === key ? { ...item, classification: value } : item
        );
        setSchools(newData);
        setFilteredSchools(newData); // Also update filtered data
    };

    const handleSearch = (value: string) => {
      const filtered = schools.filter(school => 
        school.name.toLowerCase().includes(value.toLowerCase()) || 
        school.code.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSchools(filtered);
    }

    const columns: ColumnsType<any> = [
        { title: 'School Name', dataIndex: 'name', key: 'name' },
        { title: 'School Code', dataIndex: 'code', key: 'code' },
        { 
            title: 'Classification',
            dataIndex: 'classification', 
            key: 'classification',
            filters: classificationOptions.map(c => ({text: c, value: c})),
            onFilter: (value, record) => record.classification.includes(value as string),
            render: (classification, record) => {
                const editable = isEditing(record);
                if (editable) {
                    return (
                        <Select 
                            defaultValue={classification} 
                            style={{width: '100%'}} 
                            onChange={(value) => handleClassificationChange(value, record.key)}
                        >
                            {classificationOptions.map(opt => <Select.Option key={opt} value={opt}>{opt}</Select.Option>)}
                        </Select>
                    );
                }
                return <Tag color="blue">{classification}</Tag>;
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space>
                        <Button onClick={() => save(record.key)} type="primary" size="small" icon={<SaveOutlined />}>Save</Button>
                        <a onClick={cancel}>Cancel</a>
                    </Space>
                ) : (
                    <Button type="primary" ghost disabled={editingKey !== ''} size="small" onClick={() => edit(record)}>Change Classification</Button>
                );
            },
        },
    ];

    return (
        <div>
            <Title level={2}>School Classification</Title>
            <Paragraph type="secondary">Categorize schools within the sub-county based on their primary academic pathways. This is crucial for senior school placement.</Paragraph>
            <Card>
              <Search
                placeholder="Search by school name or code..."
                onSearch={handleSearch}
                style={{ marginBottom: 16, width: 300 }}
              />
              <Table 
                columns={columns} 
                dataSource={filteredSchools} 
                bordered
              />
            </Card>
        </div>
    );
};

export default SchoolClassificationPage;