import React from 'react';
import { Card, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface MetricCardProps {
  title: string;
  value: number | string;
  change?: number;
  icon: React.ReactNode;
  color?: string;
  prefix?: string;
  suffix?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  color = '#1890ff',
  prefix = '',
  suffix = ''
}) => (
  <Card className="dashboard-metric-card" bodyStyle={{ padding: '16px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <Text type="secondary">{title}</Text>
        <Title level={3} style={{ margin: '8px 0 0', color }}>
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </Title>
        {change !== undefined && (
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center' }}>
            {change >= 0 ? (
              <ArrowUpOutlined style={{ color: '#52c41a', marginRight: 4 }} />
            ) : (
              <ArrowDownOutlined style={{ color: '#f5222d', marginRight: 4 }} />
            )}
            <Text type={change >= 0 ? 'success' : 'danger'}>{Math.abs(change)}% from last month</Text>
          </div>
        )}
      </div>
      <div style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        backgroundColor: `${color}1a`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        color
      }}>
        {icon}
      </div>
    </div>
  </Card>
);

export default MetricCard;
