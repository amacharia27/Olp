import React from 'react';
import { Timeline, Card, Typography, Tag, Space, Empty, Collapse } from 'antd';
import { WarningOutlined, SolutionOutlined } from '@ant-design/icons';
import { DisciplineIncident, DisciplineAction, IncidentSeverity } from '../types';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface StudentDisciplineHistoryProps {
  studentId: string;
  incidents: DisciplineIncident[];
  actions: DisciplineAction[];
}

const StudentDisciplineHistory: React.FC<StudentDisciplineHistoryProps> = ({
  studentId,
  incidents,
  actions
}) => {
  // Filter incidents for this student
  const studentIncidents = incidents.filter(incident => incident.studentId === studentId);
  
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
  
  // Get actions for an incident
  const getIncidentActions = (incidentId: string) => {
    return actions.filter(action => action.incidentId === incidentId);
  };
  
  // Sort incidents by date (newest first)
  const sortedIncidents = [...studentIncidents].sort((a, b) => 
    dayjs(b.date).unix() - dayjs(a.date).unix()
  );

  if (sortedIncidents.length === 0) {
    return (
      <Card>
        <Empty 
          description="No discipline records found for this student" 
          image={Empty.PRESENTED_IMAGE_SIMPLE} 
        />
      </Card>
    );
  }

  return (
    <Card>
      <Title level={4}>Discipline History</Title>
      <Paragraph type="secondary">
        Complete history of discipline incidents and actions for this student.
      </Paragraph>
      
      <Timeline mode="left">
        {sortedIncidents.map(incident => {
          const incidentActions = getIncidentActions(incident.id);
          
          return (
            <React.Fragment key={incident.id}>
              <Timeline.Item 
                dot={<WarningOutlined style={{ fontSize: '16px' }} />} 
                color={getSeverityColor(incident.severity)}
                label={dayjs(incident.date).format('MMM D, YYYY')}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text strong>{incident.title}</Text>
                    <Tag color={getSeverityColor(incident.severity)} style={{ marginLeft: 8 }}>
                      {incident.severity.toUpperCase()}
                    </Tag>
                  </div>
                  
                  <Paragraph>{incident.description}</Paragraph>
                  
                  <Text type="secondary">
                    Location: {incident.location} | Reported by: {incident.reportedBy?.name}
                  </Text>
                  
                  {incidentActions.length > 0 && (
                    <Collapse ghost>
                      <Panel header={`${incidentActions.length} action(s) taken`} key="1">
                        {incidentActions.map(action => (
                          <Timeline.Item 
                            key={action.id}
                            dot={<SolutionOutlined style={{ fontSize: '16px' }} />}
                            color="green"
                          >
                            <div>
                              <Text strong>{action.actionType.replace('_', ' ').toUpperCase()}</Text>
                              <Text> - {action.description}</Text>
                            </div>
                            
                            <div>
                              <Text type="secondary">
                                {dayjs(action.startDate).format('MMM D, YYYY')}
                                {action.endDate && ` to ${dayjs(action.endDate).format('MMM D, YYYY')}`}
                              </Text>
                            </div>
                            
                            {action.notes && <Paragraph>{action.notes}</Paragraph>}
                            
                            <Text type="secondary">
                              Parent notified: {action.parentNotified ? 'Yes' : 'No'} | 
                              Assigned by: {action.assignedBy?.name}
                            </Text>
                          </Timeline.Item>
                        ))}
                      </Panel>
                    </Collapse>
                  )}
                </Space>
              </Timeline.Item>
            </React.Fragment>
          );
        })}
      </Timeline>
    </Card>
  );
};

export default StudentDisciplineHistory;
