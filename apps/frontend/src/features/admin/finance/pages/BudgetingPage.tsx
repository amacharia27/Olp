// apps/frontend/src/features/admin/finance/pages/BudgetingPage.tsx
import { useState } from 'react';
import {
  Card, Table, Typography, Button, Space, InputNumber,
  Row, Col, message, Select, Tag,
  Statistic
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// --- MOCK DATA ---
// This would come from the expense categories and actual spending data from other parts of the app
const budgetData = [
  { key: '1', category: 'Salaries', budget: 3600000, actual: 3650000 },
  { key: '2', category: 'Utilities', budget: 200000, actual: 185000 },
  { key: '3', category: 'Supplies', budget: 150000, actual: 145000 },
  { key: '4', category: 'Maintenance', budget: 250000, actual: 310000 },
  { key: '5', category: 'Projects', budget: 1000000, actual: 0 },
  { key: '6', category: 'Other', budget: 50000, actual: 65000 },
];

const BudgetingPage = () => {
  const [dataSource, setDataSource] = useState(budgetData.map(d => ({ ...d, isEditing: false })));

  const handleEdit = (key: React.Key) => {
    const newData = [...dataSource];
    const target = newData.find(item => key === item.key);
    if (target) {
      target.isEditing = true;
      setDataSource(newData);
    }
  };

  const handleSave = (key: React.Key, newBudget: number) => {
    const newData = [...dataSource];
    const target = newData.find(item => key === item.key);
    if (target) {
      target.budget = newBudget;
      target.isEditing = false;
      setDataSource(newData);
      message.success(`Budget for "${target.category}" updated successfully!`);
      // TODO: API Call to save the new budget amount
    }
  };

  const columns: ColumnsType<any> = [
    { title: 'Expense Category', dataIndex: 'category', key: 'category', width: '30%' },
    {
      title: 'Budgeted Amount (KES)',
      dataIndex: 'budget',
      key: 'budget',
      width: '25%',
      render: (text, record) => {
        if (record.isEditing) {
          return (
            <InputNumber
              defaultValue={text}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/,\s?|(,*)/g, '')}
              onPressEnter={(e) => handleSave(record.key, (e.target as HTMLInputElement).value as any)}
              style={{ width: '100%' }}
            />
          );
        }
        return text.toLocaleString();
      }
    },
    {
      title: 'Actual Spent (KES)',
      dataIndex: 'actual',
      key: 'actual',
      width: '20%',
      render: (val) => val.toLocaleString()
    },
    {
      title: 'Variance',
      key: 'variance',
      width: '15%',
      render: (_, record) => {
        const variance = record.budget - record.actual;
        const overspent = variance < 0;
        return (
          <Tag color={overspent ? 'error' : 'success'}>
            {overspent ? `(Over) ${Math.abs(variance).toLocaleString()}` : `${variance.toLocaleString()}`}
          </Tag>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return record.isEditing ? (
          <Button
            type="primary"
            onClick={() => handleSave(record.key, record.budget)} // In a real app, you'd get the value from the input
            icon={<SaveOutlined />}
            size="small"
          >
            Save
          </Button>
        ) : (
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.key)}
            size="small"
          >
            Set Budget
          </Button>
        );
      }
    },
  ];

  const totalBudgeted = dataSource.reduce((sum, item) => sum + item.budget, 0);
  const totalActual = dataSource.reduce((sum, item) => sum + item.actual, 0);

  return (
    <div>
      <Title level={2}>Budgeting & Variance Analysis</Title>
      <Paragraph type="secondary">Set financial budgets for each expense category and track spending against your targets.</Paragraph>
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
          <Col>
            <Space>
              <Text>Viewing Budget For:</Text>
              <Select defaultValue="T1_2023" style={{ width: 200 }}>
                <Select.Option value="T1_2023">Term 1, 2023</Select.Option>
                <Select.Option value="YEAR_2023">Full Year 2023</Select.Option>
              </Select>
            </Space>
          </Col>
          <Col>
            <Space size="large">
              <Statistic title="Total Budgeted" value={totalBudgeted} prefix="KES" />
              <Statistic title="Total Actual Spending" value={totalActual} prefix="KES" valueStyle={{ color: totalActual > totalBudgeted ? '#cf1322' : '#3f8600' }} />
            </Space>
          </Col>
        </Row>
        
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}><Text strong>Overall Total</Text></Table.Summary.Cell>
              <Table.Summary.Cell index={1}><Text strong>{totalBudgeted.toLocaleString()}</Text></Table.Summary.Cell>
              <Table.Summary.Cell index={2}><Text strong>{totalActual.toLocaleString()}</Text></Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                <Tag color={totalBudgeted - totalActual < 0 ? 'error' : 'success'}>
                  <Text strong color="white">
                    {(totalBudgeted - totalActual).toLocaleString()}
                  </Text>
                </Tag>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4}></Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </Card>
    </div>
  );
};

export default BudgetingPage;