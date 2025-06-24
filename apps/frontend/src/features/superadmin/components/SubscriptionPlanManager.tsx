import React, { useState } from 'react';
import { 
  Card, 
  Tabs, 
  Table, 
  Button, 
  Switch, 
  Space, 
  Tag, 
  Typography, 
  Modal, 
  Form, 
  Input, 
  InputNumber, 
  Select,
  Divider,
  Row,
  Col,
  Popconfirm
} from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  PlusOutlined, 
  CheckOutlined, 
  CloseOutlined,
  CrownOutlined,
  StarOutlined,
  RocketOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

export interface Feature {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  pricePerStudent: number;
  billingCycle: 'monthly' | 'quarterly' | 'annually';
  features: string[];
  isActive: boolean;
  isDefault: boolean;
  minStudents: number;
  maxStudents: number | null;
  discountThresholds: {
    studentCount: number;
    discountPercentage: number;
  }[];
  studentCount?: number;
  discountPercentage?: number;
}

interface SubscriptionPlanManagerProps {
  plans: SubscriptionPlan[];
  features: Feature[];
  onSavePlan: (plan: SubscriptionPlan, isNew: boolean) => void;
  onDeletePlan: (planId: string) => void;
  onTogglePlanStatus: (planId: string, isActive: boolean) => void;
  onSetDefaultPlan: (planId: string) => void;
}

const SubscriptionPlanManager: React.FC<SubscriptionPlanManagerProps> = ({
  plans,
  features,
  onSavePlan,
  onDeletePlan,
  onTogglePlanStatus,
  onSetDefaultPlan
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [form] = Form.useForm();
  
  const showAddModal = () => {
    setEditingPlan(null);
    form.resetFields();
    setIsModalVisible(true);
  };
  
  const showEditModal = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    form.setFieldsValue({
      ...plan,
      features: plan.features,
      discountThresholds: plan.discountThresholds.length > 0 ? plan.discountThresholds : [{ studentCount: 0, discountPercentage: 0 }]
    });
    setIsModalVisible(true);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  const handleSave = (values: any) => {
    const planData: SubscriptionPlan = {
      id: editingPlan?.id || `plan-${Date.now()}`,
      ...values,
      isActive: editingPlan?.isActive ?? true,
      isDefault: editingPlan?.isDefault ?? false,
      discountThresholds: values.discountThresholds.filter((t: any) => t && t.studentCount > 0)
    };
    
    onSavePlan(planData, !editingPlan);
    setIsModalVisible(false);
  };
  
  const featuresByCategory = features.reduce((acc: Record<string, Feature[]>, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {});
  
  // Helper function to get feature name by ID if needed in the future
  // const getFeatureName = (featureId: string) => {
  //   const feature = features.find(f => f.id === featureId);
  //   return feature ? feature.name : featureId;
  // };
  
  const getPlanIcon = (plan: SubscriptionPlan) => {
    if (plan.name.toLowerCase().includes('premium')) return <CrownOutlined style={{ color: '#faad14' }} />;
    if (plan.name.toLowerCase().includes('standard')) return <StarOutlined style={{ color: '#1890ff' }} />;
    if (plan.name.toLowerCase().includes('basic')) return <RocketOutlined style={{ color: '#52c41a' }} />;
    return null;
  };
  
  const columns: ColumnsType<SubscriptionPlan> = [
    {
      title: 'Plan',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          {getPlanIcon(record)}
          <span>{text}</span>
          {record.isDefault && <Tag color="gold">Default</Tag>}
        </Space>
      ),
    },
    {
      title: 'Base Price (KES)',
      dataIndex: 'basePrice',
      key: 'basePrice',
      render: (price) => price.toLocaleString(),
    },
    {
      title: 'Per Student (KES)',
      dataIndex: 'pricePerStudent',
      key: 'pricePerStudent',
      render: (price) => price.toLocaleString(),
    },
    {
      title: 'Billing Cycle',
      dataIndex: 'billingCycle',
      key: 'billingCycle',
      render: (cycle) => cycle.charAt(0).toUpperCase() + cycle.slice(1),
    },
    {
      title: 'Features',
      dataIndex: 'features',
      key: 'features',
      render: (featureIds) => (
        <span>{featureIds.length} features</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={(checked) => onTogglePlanStatus(record.id, checked)}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => showEditModal(record)}
          />
          {!record.isDefault && (
            <Popconfirm
              title="Set as default plan?"
              description="This will make this plan the default for new schools."
              onConfirm={() => onSetDefaultPlan(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" icon={<CrownOutlined />} />
            </Popconfirm>
          )}
          {!record.isDefault && (
            <Popconfirm
              title="Delete this plan?"
              description="Are you sure you want to delete this subscription plan?"
              onConfirm={() => onDeletePlan(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];
  
  const expandedRowRender = (record: SubscriptionPlan) => {
    const discountColumns = [
      {
        title: 'Student Count',
        dataIndex: 'studentCount',
        key: 'studentCount',
        render: (count) => `${count}+ students`,
      },
      {
        title: 'Discount',
        dataIndex: 'discountPercentage',
        key: 'discountPercentage',
        render: (percentage) => `${percentage}%`,
      },
    ];
    
    return (
      <div style={{ padding: '0 20px' }}>
        <Title level={5}>Plan Details</Title>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Text type="secondary">{record.description}</Text>
          </Col>
        </Row>
        
        <Divider orientation="left">Features</Divider>
        <Row gutter={[16, 16]}>
          {Object.entries(featuresByCategory).map(([category, categoryFeatures]) => (
            <Col span={8} key={category}>
              <Card size="small" title={category} style={{ marginBottom: 16 }}>
                {categoryFeatures
                  .filter(feature => record.features.includes(feature.id))
                  .map(feature => (
                    <div key={feature.id} style={{ marginBottom: 8 }}>
                      <Text>{feature.name}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>{feature.description}</Text>
                    </div>
                  ))}
                {!categoryFeatures.some(feature => record.features.includes(feature.id)) && (
                  <Text type="secondary">No features in this category</Text>
                )}
              </Card>
            </Col>
          ))}
        </Row>
        
        {record.discountThresholds.length > 0 && (
          <>
            <Divider orientation="left">Volume Discounts</Divider>
            <Table 
              columns={discountColumns} 
              dataSource={record.discountThresholds} 
              pagination={false}
              size="small"
              rowKey="studentCount"
            />
          </>
        )}
      </div>
    );
  };
  
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>Subscription Plans</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={showAddModal}
        >
          Add Plan
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={plans}
        rowKey="id"
        expandable={{
          expandedRowRender,
          rowExpandable: record => true,
        }}
      />
      
      <Modal
        title={editingPlan ? "Edit Subscription Plan" : "Add Subscription Plan"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            name: '',
            description: '',
            basePrice: 0,
            pricePerStudent: 0,
            billingCycle: 'monthly',
            features: [],
            minStudents: 1,
            maxStudents: null,
            discountThresholds: [{ studentCount: 0, discountPercentage: 0 }]
          }}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Basic Information" key="1">
              <Form.Item
                name="name"
                label="Plan Name"
                rules={[{ required: true, message: 'Please enter plan name' }]}
              >
                <Input placeholder="e.g. Basic, Standard, Premium" />
              </Form.Item>
              
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please enter plan description' }]}
              >
                <Input.TextArea rows={3} placeholder="Describe the subscription plan" />
              </Form.Item>
              
              <Form.Item
                name="billingCycle"
                label="Billing Cycle"
                rules={[{ required: true, message: 'Please select billing cycle' }]}
              >
                <Select>
                  <Option value="monthly">Monthly</Option>
                  <Option value="quarterly">Quarterly</Option>
                  <Option value="annually">Annually</Option>
                </Select>
              </Form.Item>
              
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="basePrice"
                    label="Base Price (KES)"
                    rules={[{ required: true, message: 'Please enter base price' }]}
                  >
                    <InputNumber
                      min={0}
                      style={{ width: '100%' }}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value ? value.replace(/\$\s?|(,*)/g, '') : '0'}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="pricePerStudent"
                    label="Price Per Student (KES)"
                    rules={[{ required: true, message: 'Please enter price per student' }]}
                  >
                    <InputNumber
                      min={0}
                      style={{ width: '100%' }}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value ? value.replace(/\$\s?|(,*)/g, '') : '0'}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="minStudents"
                    label="Minimum Students"
                    rules={[{ required: true, message: 'Please enter minimum students' }]}
                  >
                    <InputNumber min={1} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
            
            <TabPane tab="Features" key="2">
              <Form.Item
                name="features"
                label="Included Features"
              >
                <Select
                  mode="multiple"
                  placeholder="Select features included in this plan"
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                >
                  {Object.entries(featuresByCategory).map(([category, categoryFeatures]) => (
                    <Select.OptGroup label={category} key={category}>
                      {categoryFeatures.map(feature => (
                        <Option key={feature.id} value={feature.id}>
                          {feature.name}
                        </Option>
                      ))}
                    </Select.OptGroup>
                  ))}
                </Select>
              </Form.Item>
            </TabPane>
            
            <TabPane tab="Volume Discounts" key="3">
              <Form.List name="discountThresholds">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'studentCount']}
                          rules={[{ required: true, message: 'Missing student count' }]}
                        >
                          <InputNumber
                            placeholder="Student count"
                            min={0}
                            addonAfter="+ students"
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'discountPercentage']}
                          rules={[{ required: true, message: 'Missing discount percentage' }]}
                        >
                          <InputNumber
                            placeholder="Discount"
                            min={0}
                            max={100}
                            addonAfter="%"
                          />
                        </Form.Item>
                        <Button danger onClick={() => remove(name)} icon={<DeleteOutlined />} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Volume Discount
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </TabPane>
          </Tabs>
          
          <div style={{ textAlign: 'right', marginTop: 24 }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {editingPlan ? 'Update Plan' : 'Create Plan'}
            </Button>
          </div>
        </Form>
      </Modal>
    </Card>
  );
};

export default SubscriptionPlanManager;
