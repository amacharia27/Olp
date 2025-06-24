import { useState, useEffect } from 'react';
import {
  Card, Col, Row, Typography, Button, Space, Statistic, Tag,
  Alert, Divider, Table, message, DatePicker, Modal, Input, Radio,
  Descriptions, Spin
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  CrownOutlined, CalendarOutlined, TeamOutlined, WalletOutlined,
  CheckCircleOutlined, FilePdfOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import api from '@/services/api';
import { IApiResponse } from '@olp-monitor/shared-types';
import { generatePaymentHistoryReport } from '@/utils/pdfGenerator';

const { Title, Text, Paragraph } = Typography;

// This mock data can be removed if the API provides it, or kept for UI structure
const paymentMethods = [
  {
    key: 'M-Pesa', name: 'M-Pesa Paybill', instructions: { 'Paybill No.': '123456', 'Account No.': 'NPS-001' }
  },
  {
    key: 'Bank', name: 'Bank Deposit', instructions: { 'Bank Name': 'Equity Bank Kenya', 'Account Name': 'OLP Monitor Solutions', 'Account No.': '0123456789012' }
  },
  {
    key: 'Card', name: 'Credit/Debit Card', instructions: null
  }
];

const SubscriptionManagementPage = () => {
  // --- STATE MANAGEMENT ---
  const [loading, setLoading] = useState(true);
  const [subData, setSubData] = useState<any>(null);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
  const [preferredMethod, setPreferredMethod] = useState('M-Pesa');
  const [mpesaPhoneNumber, setMpesaPhoneNumber] = useState('');

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        setLoading(true);
        const response = await api.get<IApiResponse<any>>('/schools/my-school/subscription');
        if (response.data.success) {
          setSubData(response.data.data.subscriptionInfo);
          // Using mock payment history until its API endpoint is built
          const mockHistory = [
            { key: '1', date: '2023-09-01', amount: 62000, method: 'M-Pesa', transactionId: 'RKI456ABCDE', status: 'Completed' },
            { key: '2', date: '2023-05-01', amount: 61500, method: 'M-Pesa', transactionId: 'RFI123XYZAB', status: 'Completed' },
          ];
          setPaymentHistory(mockHistory);
        } else {
          message.error(response.data.message || "Failed to load subscription details.");
        }
      } catch (error) {
        message.error("An error occurred while fetching subscription details.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptionData();
  }, []);

  // --- CALCULATIONS ---
  const costPerStudent = 50;
  const nextInvoiceAmount = (subData?.activeStudentCount || 0) * costPerStudent;
  const nextDueDate = subData ? dayjs(subData.subscriptionExpiresAt).format('MMMM D, YYYY') : 'N/A';
  const schoolName = subData?.name || 'Your School';

  // --- HANDLERS ---
  const handlePaymentRequest = async () => {
    if (preferredMethod === 'M-Pesa') {
        if (!mpesaPhoneNumber || mpesaPhoneNumber.length < 9) {
          message.error("Please enter a valid 9-digit phone number.");
          return;
        }
        Modal.confirm({
          title: 'Confirm Payment Request',
          icon: <WalletOutlined />,
          content: `A payment prompt for KES ${nextInvoiceAmount.toLocaleString()} will be sent to +254${mpesaPhoneNumber}. Continue?`,
          okText: "Yes, Send Prompt",
          async onOk() {
            const key = 'stk_push';
            message.loading({ content: 'Sending payment prompt...', key });
            try {
              const response = await api.post('/schools/my-school/initiate-payment', {
                phoneNumber: mpesaPhoneNumber,
                amount: nextInvoiceAmount,
              });
              if(response.data.success) {
                message.success({ content: response.data.message, key, duration: 10 });
              }
            } catch (error: any) {
              message.error({ content: error.response?.data?.message || 'Failed to send prompt.', key });
            }
          }
        });
    } else {
        message.info("Online card payments are coming soon!");
    }
  };

  const handleGenerateReport = () => {
    let filteredData = paymentHistory;
    if (dateRange && dateRange[0] && dateRange[1]) {
        const [startDate, endDate] = dateRange;
        filteredData = paymentHistory.filter(item => {
            const paymentDate = dayjs(item.date);
            const start = dayjs(startDate).startOf('day');
            const end = dayjs(endDate).endOf('day');
            return paymentDate.isAfter(start) && paymentDate.isBefore(end) || 
                   paymentDate.isSame(start, 'day') || 
                   paymentDate.isSame(end, 'day');
        });
        if (filteredData.length === 0) {
            message.warning("No payment records found in the selected date range.");
            return;
        }
    }
    generatePaymentHistoryReport(filteredData, schoolName);
  };

  // --- TABLE COLUMNS ---
  const paymentHistoryColumns: ColumnsType<any> = [
    { title: 'Payment Date', dataIndex: 'date', key: 'date' },
    { title: 'Amount (KES)', dataIndex: 'amount', key: 'amount', render: (val) => val.toLocaleString() },
    { title: 'Payment Method', dataIndex: 'method', key: 'method' },
    { title: 'Transaction ID', dataIndex: 'transactionId', key: 'transactionId' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => <Tag icon={<CheckCircleOutlined />} color="success">{status}</Tag> },
  ];

  if (loading) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }} />;
  }

  return (
    <div>
      <Title level={2}>Subscription & Billing</Title>
      <Paragraph type="secondary">Manage your school's subscription plan and view payment history.</Paragraph>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card>
            <Title level={4}>Current Plan Details</Title>
            <Row gutter={16}>
              <Col span={12}><Statistic title="Plan" value="Standard Plan" prefix={<CrownOutlined />} /></Col>
              <Col span={12}><Statistic title="Status" valueRender={() => <Tag color={subData?.subscriptionStatus === 'Active' ? 'green' : 'red'}>{subData?.subscriptionStatus}</Tag>} /></Col>
              <Col span={12} style={{marginTop: 24}}><Statistic title="Active Students" value={subData?.activeStudentCount || 0} prefix={<TeamOutlined />} /></Col>
              <Col span={12} style={{marginTop: 24}}><Statistic title="Subscription Expires On" value={nextDueDate} prefix={<CalendarOutlined />} /></Col>
            </Row>
          </Card>

          <Card title="Payment Methods" style={{ marginTop: 24 }}>
            <Paragraph type="secondary">Select your school's preferred payment method for subscription renewals.</Paragraph>
            <Radio.Group onChange={(e) => setPreferredMethod(e.target.value)} value={preferredMethod} optionType="button" buttonStyle="solid">
              {paymentMethods.map(method => (<Radio.Button key={method.key} value={method.key}>{method.name}</Radio.Button>))}
            </Radio.Group>
          </Card>
      
          <Card title="Payment History" style={{ marginTop: 24 }} extra={<Button type="primary" ghost icon={<FilePdfOutlined />} onClick={handleGenerateReport}>Generate Report</Button>}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <DatePicker.RangePicker onChange={(dates) => setDateRange(dates as any)} />
              <Table columns={paymentHistoryColumns} dataSource={paymentHistory} pagination={{ pageSize: 5 }} />
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Make a Payment">
            <Space direction="vertical" size="large" style={{width: '100%'}}>
              <Statistic title="Next Billing Amount" value={nextInvoiceAmount} prefix="KES" valueStyle={{ fontSize: '36px' }} />
              <Text type="secondary">Based on {subData?.activeStudentCount || 0} active students @ KES {costPerStudent}/student.</Text>
              <Alert message={`Payment Due: ${nextDueDate}`} type="info" showIcon />
              <Divider />
              
              <Title level={5}>Pay using: {paymentMethods.find(p => p.key === preferredMethod)?.name}</Title>
              
              {preferredMethod === 'M-Pesa' && (
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Text>Enter the M-Pesa registered phone number to receive a payment prompt.</Text>
                  <Input addonBefore="+254" placeholder="712345678" size="large" value={mpesaPhoneNumber} onChange={(e) => setMpesaPhoneNumber(e.target.value)} />
                  <Button type="primary" icon={<WalletOutlined />} size="large" style={{width: '100%'}} onClick={handlePaymentRequest}>Request Payment Prompt</Button>
                </Space>
              )}
              
              {preferredMethod === 'Bank' && (
                <Descriptions bordered column={1}>
                  {Object.entries(paymentMethods.find(p => p.key === 'Bank')?.instructions || {}).map(([key, value]) => (<Descriptions.Item key={key} label={key}>{value}</Descriptions.Item>))}
                </Descriptions>
              )}

              {preferredMethod === 'Card' && (
                <Button type="primary" icon={<WalletOutlined />} size="large" style={{width: '100%'}} onClick={handlePaymentRequest}>Pay Now with Card</Button>
              )}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SubscriptionManagementPage;