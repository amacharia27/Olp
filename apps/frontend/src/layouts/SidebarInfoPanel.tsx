// apps/frontend/src/layouts/SidebarInfoPanel.tsx
import { Typography, Statistic, Progress, Divider, Space, Row, Col, Button } from 'antd';
import { 
  HomeOutlined, 
  TeamOutlined, 
  BookOutlined, 
  DollarOutlined, 
  UserOutlined, 
  ScheduleOutlined, 
  FileTextOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/store/auth.store';
import { useFinanceStore } from '@/store/finance.store';
import { UserRole } from '@olp-monitor/shared-types';

const { Text } = Typography;
// Add these new constants at the top of the file, inside the component.
const statTitleStyle = { color: 'rgba(255, 255, 255, 0.75)', fontSize: '12px', lineHeight: '1.2' };
const statContentStyle = { color: 'rgba(255, 255, 255, 1)', fontSize: '16px', fontWeight: 500, lineHeight: '1.2' };
const textStyle = { color: 'rgba(255, 255, 255, 0.85)', fontSize: '13px' };
const strongTextStyle = { color: 'rgba(255, 255, 255, 1)', fontWeight: 600, fontSize: '14px', marginBottom: '8px', display: 'block' };

// --- MOCK DATA ---
const schoolInfo = {
  name: 'Nairobi Primary School',
  totalStudents: 1250,
};
const teacherInfo = {
  classes: [
    { name: 'Grade 6 - Eagles', studentCount: 32 },
    { name: 'Grade 5 - Lions', studentCount: 35 },
  ]
};
const studentInfo = {
  learningAreas: 8,
  termTarget: 85, // in percent
  classPosition: 3,
  classSize: 32,
};
const superAdminInfo = {
  totalSchools: 487,
  activeSubscriptions: 452,
  pendingSubscriptions: 35,
  systemHealth: 98, // percentage
  lastBackup: '2025-06-23',
  totalUsers: 125840,
  databaseSize: '1.2 TB',
  recentCurriculumUploads: 8,
};
// --- END MOCK DATA ---

const SidebarInfoPanel = () => {
  const { user } = useAuthStore();
  const financialSummary = useFinanceStore((state) => state.summary);

  if (!user) return null;

  // NEW
const renderStudentInfo = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Statistic 
        title={<span style={statTitleStyle}>Learning Areas</span>}
        value={studentInfo.learningAreas} 
        prefix={<BookOutlined />} 
        valueStyle={statContentStyle}
      />
      <Statistic 
        title={<span style={statTitleStyle}>Class Position</span>}
        value={`${studentInfo.classPosition} / ${studentInfo.classSize}`} 
        valueStyle={statContentStyle}
      />
      <div>
        <Text style={textStyle}>Term Target: {studentInfo.termTarget}%</Text>
        <Progress percent={studentInfo.termTarget} showInfo={false} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
      </div>
    </Space>
  );

  // NEW
const renderTeacherInfo = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Text style={strongTextStyle}>My Classes</Text>
      {teacherInfo.classes.map(c => (
        <Statistic 
          key={c.name} 
          title={<span style={statTitleStyle}>{c.name}</span>}
          value={c.studentCount} 
          prefix={<TeamOutlined />} 
          valueStyle={statContentStyle}
        />
      ))}
    </Space>
  );
  
  // NEW
const renderFinancialSummary = () => {
    if (!financialSummary) return null;

    const { netBalance, totalRevenue, totalExpenses, collectionRate } = financialSummary;

    return (
      <div style={{ width: '100%', marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <Statistic
            title={<span style={statTitleStyle}><Space>{netBalance >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}<span>Net Balance</span></Space></span>}
            value={netBalance}
            precision={2}
            prefix={<span style={{fontSize: '12px', marginRight: '4px'}}>KES</span>}
            valueStyle={{ ...statContentStyle, color: netBalance >= 0 ? '#52c41a' : '#f5222d' }}
          />
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title={<span style={statTitleStyle}><Space><DollarOutlined /><span>Revenue</span></Space></span>}
                value={totalRevenue}
                precision={0}
                prefix={<span style={{fontSize: '12px', marginRight: '4px'}}>KES</span>}
                valueStyle={statContentStyle}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title={<span style={statTitleStyle}><Space><DollarOutlined /><span>Expenses</span></Space></span>}
                value={totalExpenses}
                precision={0}
                prefix={<span style={{fontSize: '12px', marginRight: '4px'}}>KES</span>}
                valueStyle={statContentStyle}
              />
            </Col>
          </Row>
          <div>
            <Row justify="space-between" align="middle">
              <Text style={statTitleStyle}><Space><CheckCircleOutlined /><span>Collection Rate</span></Space></Text>
              <Text style={{ ...statContentStyle, fontSize: '14px' }}>{collectionRate}%</Text>
            </Row>
            <Progress percent={collectionRate} size="small" showInfo={false} strokeColor="#722ed1" style={{ margin: '4px 0 0 0' }}/>
          </div>
        </Space>
        <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)', margin: '16px 0' }} />
      </div>
    );
  };

  const renderHeadteacherInfo = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
      {renderFinancialSummary()}
      <Text style={strongTextStyle}>School Overview</Text>
      <Statistic 
        title={<span style={statTitleStyle}>Total Students</span>}
        value={schoolInfo.totalStudents} 
        prefix={<TeamOutlined />} 
        valueStyle={statContentStyle}
      />
    </Space>
  );


  const renderDeputyHeadteacherInfo = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Text style={strongTextStyle}>Deputy Head's Overview</Text>
      <Statistic 
        title={<span style={statTitleStyle}>Total Students</span>}
        value={schoolInfo.totalStudents} 
        prefix={<TeamOutlined />} 
        valueStyle={statContentStyle}
      />
      <Statistic 
        title={<span style={statTitleStyle}>Teaching Staff</span>}
        value={teacherInfo.classes.length} 
        prefix={<UserOutlined />} 
        valueStyle={statContentStyle}
      />
      <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)', margin: '8px 0' }} />
      <Text style={strongTextStyle}>Quick Actions</Text>
      <Space direction="vertical" style={{ width: '100%' }} size="small">
        <Button type="text" icon={<ScheduleOutlined />} style={{ color: 'rgba(255, 255, 255, 0.85)', textAlign: 'left', width: '100%' }}>View Schedule</Button>
        <Button type="text" icon={<FileTextOutlined />} style={{ color: 'rgba(255, 255, 255, 0.85)', textAlign: 'left', width: '100%' }}>Generate Reports</Button>
      </Space>
    </Space>
  );

  const renderNationalOfficialInfo = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Text style={strongTextStyle}>National Education Overview</Text>
      <Statistic 
        title={<span style={statTitleStyle}>Counties Monitored</span>}
        value={47} 
        prefix={<TeamOutlined />} 
        valueStyle={statContentStyle}
      />
      <Statistic 
        title={<span style={statTitleStyle}>Schools Monitored</span>}
        value={24156} 
        prefix={<HomeOutlined />} 
        valueStyle={statContentStyle}
      />
      <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)', margin: '8px 0' }} />
      <Text style={strongTextStyle}>Quick Actions</Text>
      <Space direction="vertical" style={{ width: '100%' }} size="small">
        <Button type="text" icon={<FileTextOutlined />} style={{ color: 'rgba(255, 255, 255, 0.85)', textAlign: 'left', width: '100%' }}>Generate National Report</Button>
      </Space>
    </Space>
  );

  const renderCountyOfficialInfo = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Text style={strongTextStyle}>County Education Overview</Text>
      <Statistic 
        title={<span style={statTitleStyle}>Sub-Counties</span>}
        value={8} 
        prefix={<TeamOutlined />} 
        valueStyle={statContentStyle}
      />
      <Statistic 
        title={<span style={statTitleStyle}>Schools in County</span>}
        value={342} 
        prefix={<HomeOutlined />} 
        valueStyle={statContentStyle}
      />
      <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)', margin: '8px 0' }} />
      <Text style={strongTextStyle}>Quick Actions</Text>
      <Space direction="vertical" style={{ width: '100%' }} size="small">
        <Button type="text" icon={<FileTextOutlined />} style={{ color: 'rgba(255, 255, 255, 0.85)', textAlign: 'left', width: '100%' }}>Generate County Report</Button>
      </Space>
    </Space>
  );

  const renderSubCountyOfficialInfo = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Text style={strongTextStyle}>Sub-County Education Overview</Text>
      <Statistic 
        title={<span style={statTitleStyle}>Schools in Sub-County</span>}
        value={48} 
        prefix={<HomeOutlined />} 
        valueStyle={statContentStyle}
      />
      <Statistic 
        title={<span style={statTitleStyle}>Teachers</span>}
        value={876} 
        prefix={<UserOutlined />} 
        valueStyle={statContentStyle}
      />
      <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)', margin: '8px 0' }} />
      <Text style={strongTextStyle}>Quick Actions</Text>
      <Space direction="vertical" style={{ width: '100%' }} size="small">
        <Button type="text" icon={<FileTextOutlined />} style={{ color: 'rgba(255, 255, 255, 0.85)', textAlign: 'left', width: '100%' }}>Generate Sub-County Report</Button>
      </Space>
    </Space>
  );

  const renderSuperAdminInfo = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Text style={strongTextStyle}>System Overview</Text>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic 
            title={<span style={statTitleStyle}>Total Schools</span>}
            value={superAdminInfo.totalSchools} 
            prefix={<HomeOutlined />} 
            valueStyle={statContentStyle}
          />
        </Col>
        <Col span={12}>
          <Statistic 
            title={<span style={statTitleStyle}>Active Subscriptions</span>}
            value={superAdminInfo.activeSubscriptions} 
            prefix={<CheckCircleOutlined />} 
            valueStyle={statContentStyle}
          />
        </Col>
      </Row>
      
      <div style={{ marginTop: '8px' }}>
        <Text style={textStyle}>System Health</Text>
        <Progress percent={superAdminInfo.systemHealth} showInfo={false} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
      </div>
      
      <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)', margin: '8px 0' }} />
      
      <Statistic 
        title={<span style={statTitleStyle}>Database Size</span>}
        value={superAdminInfo.databaseSize} 
        valueStyle={statContentStyle}
      />
      
      <Statistic 
        title={<span style={statTitleStyle}>Last Backup</span>}
        value={superAdminInfo.lastBackup} 
        valueStyle={statContentStyle}
      />
      
      <Statistic 
        title={<span style={statTitleStyle}>Recent Curriculum Uploads</span>}
        value={superAdminInfo.recentCurriculumUploads} 
        valueStyle={statContentStyle}
      />
      
      <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)', margin: '8px 0' }} />
      <Text style={strongTextStyle}>Quick Actions</Text>
      <Space direction="vertical" style={{ width: '100%' }} size="small">
        <Button type="text" icon={<FileTextOutlined />} style={{ color: 'rgba(255, 255, 255, 0.85)', textAlign: 'left', width: '100%' }}>System Health Report</Button>
        <Button type="text" icon={<ScheduleOutlined />} style={{ color: 'rgba(255, 255, 255, 0.85)', textAlign: 'left', width: '100%' }}>Schedule Backup</Button>
      </Space>
    </Space>
  );

  const renderInfoByRole = () => {
    switch(user.role) {
      case UserRole.STUDENT: return renderStudentInfo();
      case UserRole.TEACHER: return renderTeacherInfo();
      case UserRole.DEPUTY_HEADTEACHER: return renderDeputyHeadteacherInfo();
      case UserRole.HEADTEACHER: return renderHeadteacherInfo();
      case UserRole.FINANCE_ADMIN: return renderFinancialSummary();
      case UserRole.NATIONAL_OFFICIAL: return renderNationalOfficialInfo();
      case UserRole.COUNTY_OFFICIAL: return renderCountyOfficialInfo();
      case UserRole.SUB_COUNTY_OFFICIAL: return renderSubCountyOfficialInfo();
      case UserRole.SUPER_ADMIN: return renderSuperAdminInfo();
      
      // Add cases for other roles like Parent, Finance Admin, etc.
      default: return null;
    }
  };

  // Determine if the user is an official (not associated with a school)
  const isOfficial = [
    UserRole.NATIONAL_OFFICIAL,
    UserRole.COUNTY_OFFICIAL,
    UserRole.SUB_COUNTY_OFFICIAL
  ].includes(user.role);

  return (
    <div style={{ padding: '8px', color: 'rgba(255, 255, 255, 0.65)' }}>
      <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
      <Space>
        <Divider style={{ height: '100%' }} />
      </Space>
      <Space direction="vertical" style={{ width: '100%' }}>
        {!isOfficial && (
          <Space align="center">
            <HomeOutlined />
            <Text style={strongTextStyle}>{schoolInfo.name}</Text>
          </Space>
        )}
        
        {renderInfoByRole()}
      </Space>
    </div>
  );
};

export default SidebarInfoPanel;