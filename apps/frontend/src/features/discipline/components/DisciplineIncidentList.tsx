import React, { useState } from 'react';
import { Table, Tag, Space, Button, Input, Select, Typography, Card, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { DisciplineIncident, IncidentSeverity, IncidentStatus } from '../types';
import { mockDisciplineIncidentsWithDetails } from '../mockData';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

interface DisciplineIncidentListProps {
  onViewIncident: (incident: DisciplineIncident) => void;
  onAddAction?: (incident: DisciplineIncident) => void;
  incidents?: DisciplineIncident[];
  userRole: 'teacher' | 'deputy' | 'headteacher';
}

const DisciplineIncidentList: React.FC<DisciplineIncidentListProps> = ({
  onViewIncident,
  onAddAction,
  incidents = mockDisciplineIncidentsWithDetails,
  userRole
}) => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);

  // Filter incidents based on search text and filters
  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = searchText === '' || 
      incident.title.toLowerCase().includes(searchText.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchText.toLowerCase()) ||
      incident.student?.name.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === null || incident.status === statusFilter;
    const matchesSeverity = severityFilter === null || incident.severity === severityFilter;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  // Get severity tag color
  const getSeverityColor = (severity: IncidentSeverity) => {
    switch (severity) {
      case IncidentSeverity.MINOR:
        return 'blue';
      case IncidentSeverity.MODERATE:
        return 'orange';
      case IncidentSeverity.MAJOR:
        return 'red';
      case IncidentSeverity.SEVERE:
        return 'purple';
      default:
        return 'default';
    }
  };

  // Get status tag color
  const getStatusColor = (status: IncidentStatus) => {
    switch (status) {
      case IncidentStatus.REPORTED:
        return 'default';
      case IncidentStatus.UNDER_INVESTIGATION:
        return 'processing';
      case IncidentStatus.ACTION_TAKEN:
        return 'warning';
      case IncidentStatus.RESOLVED:
        return 'success';
      case IncidentStatus.DISMISSED:
        return 'error';
      default:
        return 'default';
    }
  };

  const columns: ColumnsType<DisciplineIncident> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('MMM D, YYYY h:mm A'),
      sorter: (a: DisciplineIncident, b: DisciplineIncident) => 
        dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
      render: (student: any) => (
        <span>{student?.name} ({student?.grade}, {student?.class})</span>
      ),
    },
    {
      title: 'Incident',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: DisciplineIncident) => (
        <Space direction="vertical" size={0}>
          <span>{title}</span>
          <Typography.Text type="secondary" ellipsis={{ tooltip: record.description }}>
            {record.description.length > 60 
              ? `${record.description.substring(0, 60)}...` 
              : record.description}
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: IncidentSeverity) => (
        <Tag color={getSeverityColor(severity)}>
          {severity.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Minor', value: IncidentSeverity.MINOR },
        { text: 'Moderate', value: IncidentSeverity.MODERATE },
        { text: 'Major', value: IncidentSeverity.MAJOR },
        { text: 'Severe', value: IncidentSeverity.SEVERE },
      ],
      onFilter: (value: any, record: DisciplineIncident) => record.severity === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: IncidentStatus) => (
        <Badge 
          status={getStatusColor(status) as any} 
          text={status.replace('_', ' ').toUpperCase()} 
        />
      ),
      filters: [
        { text: 'Reported', value: IncidentStatus.REPORTED },
        { text: 'Under Investigation', value: IncidentStatus.UNDER_INVESTIGATION },
        { text: 'Action Taken', value: IncidentStatus.ACTION_TAKEN },
        { text: 'Resolved', value: IncidentStatus.RESOLVED },
        { text: 'Dismissed', value: IncidentStatus.DISMISSED },
      ],
      onFilter: (value: any, record: DisciplineIncident) => record.status === value,
    },
    {
      title: 'Reported By',
      dataIndex: 'reportedBy',
      key: 'reportedBy',
      render: (staff: any) => staff?.name || 'Unknown',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: DisciplineIncident) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => onViewIncident(record)}
          >
            View
          </Button>
          {(userRole === 'deputy' || userRole === 'headteacher') && 
            record.status !== IncidentStatus.RESOLVED && 
            record.status !== IncidentStatus.DISMISSED && (
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => onAddAction && onAddAction(record)}
            >
              Add Action
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Title level={4}>Discipline Incidents</Title>
      
      <Space style={{ marginBottom: 16 }} direction="horizontal">
        <Input
          placeholder="Search incidents"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 250 }}
        />
        
        <Select
          placeholder="Filter by Status"
          style={{ width: 180 }}
          allowClear
          onChange={value => setStatusFilter(value)}
        >
          <Option value={IncidentStatus.REPORTED}>Reported</Option>
          <Option value={IncidentStatus.UNDER_INVESTIGATION}>Under Investigation</Option>
          <Option value={IncidentStatus.ACTION_TAKEN}>Action Taken</Option>
          <Option value={IncidentStatus.RESOLVED}>Resolved</Option>
          <Option value={IncidentStatus.DISMISSED}>Dismissed</Option>
        </Select>
        
        <Select
          placeholder="Filter by Severity"
          style={{ width: 150 }}
          allowClear
          onChange={value => setSeverityFilter(value)}
        >
          <Option value={IncidentSeverity.MINOR}>Minor</Option>
          <Option value={IncidentSeverity.MODERATE}>Moderate</Option>
          <Option value={IncidentSeverity.MAJOR}>Major</Option>
          <Option value={IncidentSeverity.SEVERE}>Severe</Option>
        </Select>
      </Space>
      
      <Table 
        columns={columns} 
        dataSource={filteredIncidents}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};

export default DisciplineIncidentList;
