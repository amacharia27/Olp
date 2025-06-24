// apps/frontend/src/features/teacher/components/ClassPerformanceChart.tsx
import { Card, Typography } from 'antd';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const { Title } = Typography;

interface ChartData {
  name: string;
  'Needs Attention'?: number;
  'On Target'?: number;
  'Exceeding'?: number;
}

interface ClassPerformanceChartProps {
  title: string;
  data: ChartData[];
}

const ClassPerformanceChart = ({ title, data }: ClassPerformanceChartProps) => {
  return (
    <Card>
      <Title level={4}>{title}</Title>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Needs Attention" stackId="a" fill="#cf1322" />
          <Bar dataKey="On Target" stackId="a" fill="#1890ff" />
          <Bar dataKey="Exceeding" stackId="a" fill="#3f8600" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ClassPerformanceChart;