import React, { useState } from 'react';
import { Tabs, Typography, Divider, Modal, message, Button, Drawer, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DisciplineIncidentList from '../components/DisciplineIncidentList';
import DisciplineActionForm from '../components/DisciplineActionForm';
import { DisciplineIncident, DisciplineAction, DisciplineActionFormData, IncidentStatus } from '../types';
import { mockDisciplineIncidentsWithDetails, mockDisciplineActionsWithDetails } from '../mockData';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const DisciplineManagementPage: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<DisciplineIncident | null>(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [actionDrawerVisible, setActionDrawerVisible] = useState(false);
  const [incidents, setIncidents] = useState(mockDisciplineIncidentsWithDetails);
  const [actions, setActions] = useState(mockDisciplineActionsWithDetails);
  const [loading, setLoading] = useState(false);

  // Handle viewing an incident
  const handleViewIncident = (incident: DisciplineIncident) => {
    setSelectedIncident(incident);
    setViewModalVisible(true);
  };

  // Handle adding an action to an incident
  const handleAddAction = (incident: DisciplineIncident) => {
    setSelectedIncident(incident);
    setActionDrawerVisible(true);
  };

  // Handle submitting a new action
  const handleActionSubmit = (formData: DisciplineActionFormData) => {
    if (!selectedIncident) return;
    
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, this would be an API call to create the action
      const newAction: DisciplineAction = {
        id: Math.random().toString(36).substring(2, 15),
        incidentId: selectedIncident.id,
        actionType: formData.actionType,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        assignedById: '103', // In a real app, this would be the current user's ID
        assignedBy: undefined, // This will be populated from the API in a real app
        notes: formData.notes,
        parentNotified: formData.parentNotified,
        parentNotificationDate: formData.parentNotified ? new Date().toISOString() : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Update the incident status
      const updatedIncidents = incidents.map(incident => {
        if (incident.id === selectedIncident.id) {
          return {
            ...incident,
            status: IncidentStatus.ACTION_TAKEN,
            updatedAt: new Date().toISOString()
          };
        }
        return incident;
      });
      
      // Add the new action to the actions list
      const updatedActions = [...actions, newAction];
      
      setIncidents(updatedIncidents);
      setActions(updatedActions);
      setActionDrawerVisible(false);
      setLoading(false);
      message.success('Disciplinary action recorded successfully');
    }, 1000);
  };

  // Get actions for the selected incident
  const getIncidentActions = (incidentId: string) => {
    return actions.filter(action => action.incidentId === incidentId);
  };

  return (
    <div>
      <Title level={2}>Discipline Management</Title>
      <Text type="secondary">
        Review and manage student discipline incidents and take appropriate actions.
      </Text>
      
      <Divider />
      
      <Tabs defaultActiveKey="all">
        <TabPane tab="All Incidents" key="all">
          <DisciplineIncidentList 
            onViewIncident={handleViewIncident} 
            onAddAction={handleAddAction}
            incidents={incidents}
            userRole="deputy"
          />
        </TabPane>
        <TabPane tab="Pending Action" key="pending">
          <DisciplineIncidentList 
            onViewIncident={handleViewIncident} 
            onAddAction={handleAddAction}
            incidents={incidents.filter(i => 
              i.status === IncidentStatus.REPORTED || 
              i.status === IncidentStatus.UNDER_INVESTIGATION
            )}
            userRole="deputy"
          />
        </TabPane>
        <TabPane tab="Action Taken" key="action">
          <DisciplineIncidentList 
            onViewIncident={handleViewIncident} 
            onAddAction={handleAddAction}
            incidents={incidents.filter(i => i.status === IncidentStatus.ACTION_TAKEN)}
            userRole="deputy"
          />
        </TabPane>
        <TabPane tab="Resolved" key="resolved">
          <DisciplineIncidentList 
            onViewIncident={handleViewIncident}
            incidents={incidents.filter(i => 
              i.status === IncidentStatus.RESOLVED || 
              i.status === IncidentStatus.DISMISSED
            )}
            userRole="deputy"
          />
        </TabPane>
      </Tabs>
      
      {/* Incident Details Modal */}
      <Modal
        title="Incident Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>,
          selectedIncident && 
          selectedIncident.status !== IncidentStatus.RESOLVED && 
          selectedIncident.status !== IncidentStatus.DISMISSED && (
            <Button 
              key="action" 
              type="primary" 
              onClick={() => {
                setViewModalVisible(false);
                handleAddAction(selectedIncident);
              }}
            >
              Take Action
            </Button>
          )
        ]}
        width={700}
      >
        {selectedIncident && (
          <div>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <Title level={4}>{selectedIncident.title}</Title>
                <Text type="secondary">
                  Reported on {dayjs(selectedIncident.createdAt).format('MMMM D, YYYY h:mm A')}
                </Text>
              </div>
              
              <Divider />
              
              <div>
                <Text strong>Student: </Text>
                <Text>{selectedIncident.student?.name} ({selectedIncident.student?.grade}, {selectedIncident.student?.class})</Text>
              </div>
              
              <div>
                <Text strong>Incident Date: </Text>
                <Text>{dayjs(selectedIncident.date).format('MMMM D, YYYY h:mm A')}</Text>
              </div>
              
              <div>
                <Text strong>Location: </Text>
                <Text>{selectedIncident.location}</Text>
              </div>
              
              <div>
                <Text strong>Severity: </Text>
                <Text>{selectedIncident.severity.toUpperCase()}</Text>
              </div>
              
              <div>
                <Text strong>Status: </Text>
                <Text>{selectedIncident.status.replace('_', ' ').toUpperCase()}</Text>
              </div>
              
              <div>
                <Text strong>Reported By: </Text>
                <Text>{selectedIncident.reportedBy?.name}</Text>
              </div>
              
              <div>
                <Text strong>Description: </Text>
                <Paragraph>{selectedIncident.description}</Paragraph>
              </div>
              
              <div>
                <Text strong>Witnesses: </Text>
                <Text>{selectedIncident.witnesses.join(', ') || 'None'}</Text>
              </div>
              
              <Divider />
              
              <div>
                <Title level={5}>Disciplinary Actions</Title>
                {getIncidentActions(selectedIncident.id).length > 0 ? (
                  getIncidentActions(selectedIncident.id).map((action, index) => (
                    <div key={action.id} style={{ marginBottom: 16, padding: 16, border: '1px solid #f0f0f0', borderRadius: 4 }}>
                      <Text strong>Action {index + 1}: {action.actionType.replace('_', ' ').toUpperCase()}</Text>
                      <Paragraph>{action.description}</Paragraph>
                      <div>
                        <Text strong>Date: </Text>
                        <Text>
                          {dayjs(action.startDate).format('MMM D, YYYY')}
                          {action.endDate && ` to ${dayjs(action.endDate).format('MMM D, YYYY')}`}
                        </Text>
                      </div>
                      {action.notes && (
                        <div>
                          <Text strong>Notes: </Text>
                          <Text>{action.notes}</Text>
                        </div>
                      )}
                      <div>
                        <Text strong>Parent Notified: </Text>
                        <Text>{action.parentNotified ? 'Yes' : 'No'}</Text>
                      </div>
                      <div>
                        <Text strong>Assigned By: </Text>
                        <Text>{action.assignedBy?.name}</Text>
                      </div>
                    </div>
                  ))
                ) : (
                  <Text type="secondary">No actions have been taken yet.</Text>
                )}
                
                {selectedIncident.status !== IncidentStatus.RESOLVED && 
                 selectedIncident.status !== IncidentStatus.DISMISSED && (
                  <Button 
                    type="dashed" 
                    icon={<PlusOutlined />} 
                    onClick={() => {
                      setViewModalVisible(false);
                      handleAddAction(selectedIncident);
                    }}
                    style={{ marginTop: 16 }}
                  >
                    Add Action
                  </Button>
                )}
              </div>
            </Space>
          </div>
        )}
      </Modal>
      
      {/* Action Form Drawer */}
      <Drawer
        title="Take Disciplinary Action"
        placement="right"
        width={520}
        onClose={() => setActionDrawerVisible(false)}
        open={actionDrawerVisible}
      >
        {selectedIncident && (
          <DisciplineActionForm 
            incident={selectedIncident} 
            onSubmit={handleActionSubmit}
            loading={loading}
          />
        )}
      </Drawer>
    </div>
  );
};

export default DisciplineManagementPage;
