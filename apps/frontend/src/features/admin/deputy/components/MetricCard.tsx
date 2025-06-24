import React from 'react';
import { Card, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  color = '#1890ff' 
}) => {
  return (
    <Card 
      size="small" 
      className="metric-card"
      style={{ height: '100%' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Text type="secondary" style={{ fontSize: 14 }}>{title}</Text>
          <div style={{ fontSize: 24, fontWeight: 600, margin: '8px 0', color }}>
            {value}
          </div>
          {change !== undefined && (
            <Text type={change >= 0 ? 'success' : 'danger'}>
              {change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              {Math.abs(change)}% from last period
            </Text>
          )}
        </div>
        <div style={{
          fontSize: 32,
          color: color,
          opacity: 0.2,
          padding: '8px',
          borderRadius: '50%',
          backgroundColor: `${color}15`
        }}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;
