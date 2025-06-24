import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Tabs, Typography, Progress, DatePicker, Select } from 'antd';
import {
  DollarOutlined,
  MoneyCollectOutlined,
  WalletOutlined,
  CheckCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  BarChartOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { TabsProps } from 'antd';

// Import components
import MetricCard from '../components/MetricCard';
import FinancialOverviewChart from '../components/FinancialOverviewChart';
import ExpenseBreakdownChart from '../components/ExpenseBreakdownChart';
import RevenueSources from '../components/RevenueSources';
import TransactionsTable from '../components/TransactionsTable';
import { useFinanceStore } from '@/store/finance.store';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Types
type Transaction = {
  key: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'completed' | 'pending' | 'failed';
  category: string;
};

type ChartDataItem = {
  type: string;
  value: number;
  month?: string;
};

// A more specific type for data that MUST include a month
type MonthlyChartDataItem = {
  type: string;
  value: number;
  month: string;
};

// Mock data
const recentTransactions: Transaction[] = [
    { key: '1', date: '2023-06-20', description: 'Tuition Fee - John Doe', amount: 25000, type: 'credit', status: 'completed', category: 'Tuition' },
    { key: '2', date: '2023-06-19', description: 'Library Fine - Jane Smith', amount: 500, type: 'credit', status: 'completed', category: 'Fines' },
    { key: '3', date: '2023-06-18', description: 'School Supplies', amount: 15000, type: 'debit', status: 'completed', category: 'Supplies' },
    { key: '4', date: '2023-06-17', description: 'Sports Equipment', amount: 35000, type: 'debit', status: 'pending', category: 'Equipment' },
    { key: '5', date: '2023-06-16', description: 'Field Trip Fee - Class 7', amount: 5000, type: 'credit', status: 'completed', category: 'Activities' },
    { key: '6', date: '2023-06-15', description: 'Staff Salaries', amount: 650000, type: 'debit', status: 'completed', category: 'Salaries' },
];

const expenseData: ChartDataItem[] = [
  { type: 'Salaries', value: 40000 },
  { type: 'Utilities', value: 12000 },
  { type: 'Supplies', value: 8000 },
  { type: 'Maintenance', value: 6000 },
  { type: 'Projects', value: 15000 },
  { type: 'Other', value: 5000 },
];

const revenueBySource: ChartDataItem[] = [
  { type: 'Tuition', value: 850000 },
  { type: 'Activities', value: 25000 },
  { type: 'Donations', value: 50000 },
  { type: 'Grants', value: 300000 },
];

const monthlyData: MonthlyChartDataItem[] = [
  { month: 'Jan', type: 'Revenue', value: 120000 },
  { month: 'Jan', type: 'Expenses', value: 80000 },
  { month: 'Feb', type: 'Revenue', value: 190000 },
  { month: 'Feb', type: 'Expenses', value: 120000 },
  { month: 'Mar', type: 'Revenue', value: 150000 },
  { month: 'Mar', type: 'Expenses', value: 90000 },
  { month: 'Apr', type: 'Revenue', value: 180000 },
  { month: 'Apr', type: 'Expenses', value: 110000 },
  { month: 'May', type: 'Revenue', value: 220000 },
  { month: 'May', type: 'Expenses', value: 150000 },
  { month: 'Jun', type: 'Revenue', value: 250000 },
  { month: 'Jun', type: 'Expenses', value: 180000 },
];

const FinanceDashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([dayjs().subtract(1, 'month'), dayjs()]);
    const [activeTab, setActiveTab] = useState('overview');
  const setFinancialSummary = useFinanceStore((state) => state.setFinancialSummary);

  const totalRevenue = revenueBySource.reduce((sum, item) => sum + item.value, 0);
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);
  const netBalance = totalRevenue - totalExpenses;
  const pendingPayments = recentTransactions.filter(t => t.status === 'pending').length;
  const collectionRate = 92.5;

  useEffect(() => {
    setFinancialSummary({
      totalRevenue,
      totalExpenses,
      netBalance,
      pendingPayments,
      collectionRate,
    });
  }, [totalRevenue, totalExpenses, netBalance, pendingPayments, collectionRate, setFinancialSummary]);



  const tabItems: TabsProps['items'] = [
    {
      key: 'overview',
      label: (
        <span>
          <BarChartOutlined /> Overview
        </span>
      ),
      children: (
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card title="Financial Overview" style={{ marginBottom: 16 }}>
                <FinancialOverviewChart data={monthlyData} />
            </Card>
            <Card title="Expense Breakdown">
                <ExpenseBreakdownChart data={expenseData} />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Quick Stats" style={{ marginBottom: 16 }}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>Collection Rate</Text>
                    <Progress
                      percent={collectionRate}
                      status={collectionRate > 90 ? 'success' : collectionRate > 70 ? 'normal' : 'exception'}
                      strokeColor="#722ed1"
                    />
                  </div>
                </Col>
                <Col span={24}>
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>Pending Payments</Text>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                      <Progress
                        percent={pendingPayments * 20} // Example logic
                        showInfo={false}
                        strokeColor="#faad14"
                        style={{ flex: 1, marginRight: 8 }}
                      />
                      <Text strong>{pendingPayments} payments</Text>
                    </div>
                  </div>
                </Col>
                <Col span={24}>
                    <RevenueSources data={revenueBySource} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: 'transactions',
      label: (
        <span>
          <TransactionOutlined /> Transactions
        </span>
      ),
      children: (
        <Card>
          <TransactionsTable data={recentTransactions} />
        </Card>
      ),
    },
  ];

  return (
    <div className="finance-dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={3} style={{ margin: 0 }}>Finance Dashboard</Title>
        <div>
          <RangePicker
            value={dateRange}
            onChange={(dates) => {
              if (dates && dates[0] && dates[1]) {
                setDateRange([dates[0], dates[1]]);
              }
            }}
            style={{ marginRight: 8 }}
            allowClear={false}
          />
          <Select defaultValue="all" style={{ width: 150 }}>
            <Option value="all">All Accounts</Option>
            <Option value="tuition">Tuition Fees</Option>
            <Option value="other">Other Income</Option>
          </Select>
        </div>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Total Revenue"
            value={totalRevenue}
            change={8.5}
            icon={<DollarOutlined />}
            color="#52c41a"
            prefix="KES "
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Total Expenses"
            value={totalExpenses}
            change={-3.2}
            icon={<MoneyCollectOutlined />}
            color="#f5222d"
            prefix="KES "
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Net Balance"
            value={netBalance}
            change={12.7}
            icon={netBalance >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            color={netBalance >= 0 ? '#52c41a' : '#f5222d'}
            prefix="KES "
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Collection Rate"
            value={collectionRate}
            change={2.5}
            icon={<CheckCircleOutlined />}
            color="#722ed1"
            suffix="%"
          />
        </Col>
      </Row>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
      />
    </div>
  );
};

export default FinanceDashboardPage;