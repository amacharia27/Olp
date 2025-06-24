// apps/frontend/src/features/admin/finance/pages/FinancialReportsPage.tsx
import {
    Card, Col, Row, Typography, Button, Space, List, Select, DatePicker, message
  } from 'antd';
  import {
    WalletOutlined, FilePdfOutlined, FileExcelOutlined, TeamOutlined, TransactionOutlined
  } from '@ant-design/icons';
  
  const { Title, Paragraph } = Typography;
  const { RangePicker } = DatePicker;
  
  // --- MOCK DATA ---
  const feeReports = [
    { key: 'fee_statement_all', title: 'Fee Statements for All Students', description: 'Generate individual fee statements for every active student. Useful for end-of-term communication.' },
    { key: 'fee_balance_summary', title: 'Fee Balance Summary Report', description: 'A list of all students with outstanding fee balances.' },
    { key: 'daily_collection_report', title: 'Daily Fee Collection Report', description: 'A detailed summary of all payments received on a specific day.' },
  ];
  
  const expenditureReports = [
    { key: 'exp_summary', title: 'Monthly Expenditure Summary', description: 'A categorized summary of all school expenses within a selected month.' },
    { key: 'vendor_payment_history', title: 'Vendor Payment History', description: 'Track all payments made to a specific vendor or contractor.' },
  ];
  
  const bursaryReports = [
      { key: 'bursary_disbursed', title: 'Bursaries Disbursed Report', description: 'A detailed report of all approved and disbursed bursaries and scholarships for a term.' },
  ];
  
  const FinancialReportsPage = () => {
  
    const handleGenerateReport = (reportTitle: string) => {
      message.loading({ content: `Generating "${reportTitle}"...`, key: 'gen' });
      
      // Simulate report generation
      setTimeout(() => {
        message.success({ content: `Report "${reportTitle}" has been downloaded successfully!`, key: 'gen', duration: 3 });
      }, 2000);
      
      // TODO: In a real app, this would be an API call that returns a file stream
    };
  
    const ReportCard = ({ title, icon, reports }: { title: string, icon: React.ReactNode, reports: any[] }) => (
      <Card title={<Space>{icon}{title}</Space>} style={{ height: '100%' }}>
        <List
          itemLayout="vertical"
          dataSource={reports}
          renderItem={item => (
            <List.Item
              actions={[
                <Button
                  key="gen_pdf"
                  icon={<FilePdfOutlined />}
                  onClick={() => handleGenerateReport(item.title)}
                >
                  Generate PDF
                </Button>,
                <Button
                  key="gen_csv"
                  icon={<FileExcelOutlined />}
                  onClick={() => handleGenerateReport(item.title)}
                >
                  Export CSV
                </Button>
              ]}
            >
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Card>
    );
  
    return (
      <div>
        <Title level={2}>Financial Reports</Title>
        <Paragraph type="secondary">Generate detailed financial reports for auditing and administrative review.</Paragraph>
        
        <Card style={{ marginBottom: 24 }}>
          <Title level={4}>Report Filters</Title>
          <Paragraph>Select a time period or term. This will apply to all generated reports below.</Paragraph>
          <Space wrap>
            <Select defaultValue="T1_2023" style={{ width: 200 }}>
              <Select.Option value="T1_2023">Term 1, 2023</Select.Option>
              <Select.Option value="T3_2022">Term 3, 2022</Select.Option>
            </Select>
            <RangePicker />
          </Space>
        </Card>
  
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <ReportCard title="Fee & Collection Reports" icon={<WalletOutlined />} reports={feeReports} />
          </Col>
          <Col xs={24} lg={8}>
            <ReportCard title="Expenditure Reports" icon={<TransactionOutlined />} reports={expenditureReports} />
          </Col>
          <Col xs={24} lg={8}>
            <ReportCard title="Bursary & Scholarship Reports" icon={<TeamOutlined />} reports={bursaryReports} />
          </Col>
        </Row>
      </div>
    );
  };
  
  export default FinancialReportsPage;