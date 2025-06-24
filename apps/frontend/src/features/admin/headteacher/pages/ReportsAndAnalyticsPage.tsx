// apps/frontend/src/features/admin/headteacher/pages/ReportsAndAnalyticsPage.tsx
import React from 'react';
import {
    Card, Col, Row, Typography, Button, Space, List, Select, DatePicker, message
  } from 'antd';
  import {
    UsergroupAddOutlined, BarChartOutlined, DollarCircleOutlined,
    FilePdfOutlined, FileExcelOutlined, CalendarOutlined
  } from '@ant-design/icons';
  
  const { Title, Text, Paragraph } = Typography;
  const { RangePicker } = DatePicker;
  
  // --- MOCK DATA ---
  const enrollmentReports = [
    { key: 'enroll_summary', title: 'Student Enrollment Summary', description: 'A full list of all active students with their class and contact details.' },
    { key: 'enroll_by_grade', title: 'Enrollment by Grade Level', description: 'A breakdown of student counts for each grade.' },
    { key: 'new_admissions', title: 'New Admissions Report', description: 'A list of all students admitted within a selected date range.' },
  ];
  
  const academicReports = [
    { key: 'acad_summary', title: 'School-Wide Academic Summary', description: 'Overall average performance by subject and grade for the selected term.' },
    { key: 'grade_comparison', title: 'Grade Performance Comparison', description: 'Compare the average scores of different grades in key subjects.' },
    { key: 'teacher_performance', title: 'Teacher Performance Overview', description: 'View average scores for classes taught by each teacher.' },
  ];
  
  const financialReports = [
    { key: 'fee_collection', title: 'Termly Fee Collection Report', description: 'A summary of fees due, collected, and outstanding for the term.' },
    { key: 'bursary_disbursement', title: 'Bursary & Scholarship Report', description: 'Details on all bursaries awarded and disbursed.' },
  ];
  
  const ReportsAndAnalyticsPage = () => {
  
    const handleGenerateReport = (reportTitle: string) => {
      message.loading({ content: `Generating "${reportTitle}"...`, key: 'gen' });
      
      // Simulate report generation
      setTimeout(() => {
        message.success({ content: `Report "${reportTitle}" has been downloaded successfully!`, key: 'gen', duration: 3 });
      }, 2000);
      
      // TODO: In a real app, this would be an API call that returns a file stream
      // e.g., window.open('/api/v1/reports/enrollment-summary?term=T1_2023')
    };
  
    const ReportCard = ({ title, icon, reports }: { title: string, icon: React.ReactNode, reports: any[] }) => (
      <Card title={<Space>{icon}{title}</Space>}>
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
        <Title level={2}>Reports & Analytics</Title>
        <Paragraph type="secondary">Generate and download comprehensive reports for school administration and compliance.</Paragraph>
        
        <Card style={{ marginBottom: 24 }}>
          <Title level={4}>Report Filters</Title>
          <Text>Select the time period for your reports. This will apply to all generated reports below.</Text>
          <Row gutter={16} align="bottom" style={{marginTop: 16}}>
              <Col>
                  <Text>Academic Term</Text><br/>
                  <Select defaultValue="T1_2023" style={{ width: 200 }}>
                      <Select.Option value="T1_2023">Term 1, 2023</Select.Option>
                      <Select.Option value="T3_2022">Term 3, 2022</Select.Option>
                  </Select>
              </Col>
              <Col>
                  <Text>Custom Date Range</Text><br/>
                  <RangePicker />
              </Col>
          </Row>
        </Card>
  
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <ReportCard title="Enrollment Reports" icon={<UsergroupAddOutlined />} reports={enrollmentReports} />
          </Col>
          <Col xs={24} lg={8}>
            <ReportCard title="Academic Reports" icon={<BarChartOutlined />} reports={academicReports} />
          </Col>
          <Col xs={24} lg={8}>
            <ReportCard title="Financial Reports" icon={<DollarCircleOutlined />} reports={financialReports} />
          </Col>
        </Row>
      </div>
    );
  };
  
  export default ReportsAndAnalyticsPage;