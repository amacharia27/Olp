import React, { lazy, Suspense } from 'react';
import { Card } from 'antd';
import { PieConfig } from '@ant-design/plots';

type RevenueData = {
  type: string;
  value: number;
};

interface RevenueSourcesProps {
  data: RevenueData[];
}

const LazyPie = lazy(() => import('@ant-design/plots').then((mod) => ({ default: mod.Pie })));



const ChartLoader = () => (
  <div style={{ 
    height: '100%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  }}>
    Loading chart...
  </div>
);

const RevenueSources: React.FC<RevenueSourcesProps> = ({ data }) => {
  const config: PieConfig = {
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{ type: 'element-active' }],
    legend: {
      position: 'bottom',
    },
    tooltip: {
      formatter: (data: RevenueData) => ({
        name: data.type,
        value: `KES ${data.value.toLocaleString()}`,
      }),
    },
  };

  return (
    <Card title="Revenue Sources" size="small">
      <div style={{ height: 300 }}>
        <Suspense fallback={<ChartLoader />}>
          <LazyPie {...config} />
        </Suspense>
      </div>
    </Card>
  );
};

export default RevenueSources;
