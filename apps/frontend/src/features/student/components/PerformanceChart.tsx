// apps/frontend/src/features/student/components/PerformanceChart.tsx
import { Card, Typography } from 'antd';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const { Title } = Typography;

interface PerformanceData {
  name: string; // e.g., 'CAT 1', 'Mid-Term', 'End-Term'
  Math?: number;
  English?: number;
  Science?: number;
  Kiswahili?: number;
  'Social Studies'?: number;
}

interface PerformanceChartProps {
  title: string;
  data: PerformanceData[];
  subjects: string[];
}

const subjectColors: { [key: string]: string } = {
  Math: '#8884d8',
  English: '#82ca9d',
  Science: '#ffc658',
  Kiswahili: '#ff8042',
  'Social Studies': '#00C49F',
};

const PerformanceChart = ({ title, data, subjects }: PerformanceChartProps) => {
  return (
    <Card>
      <Title level={4}>{title}</Title>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          {subjects.map(subject => (
            <Line
              key={subject}
              type="monotone"
              dataKey={subject}
              stroke={subjectColors[subject] || '#000000'}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PerformanceChart;