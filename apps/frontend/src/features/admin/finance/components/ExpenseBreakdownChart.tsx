import React, { lazy, Suspense } from 'react';
import { PieConfig } from '@ant-design/plots';

type ExpenseData = {
  type: string;
  value: number;
  percent?: string;
};

interface ExpenseBreakdownChartProps {
  data: ExpenseData[];
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

const ExpenseBreakdownChart: React.FC<ExpenseBreakdownChartProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
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
      showTitle: true,
      formatter: (data: ExpenseData) => ({
        name: data.type,
        value: `KES ${data.value.toLocaleString()} (${((data.value / total) * 100).toFixed(1)}%)`,
      }),
    },
  };

  return (
    <div style={{ height: 300 }}>
      <Suspense fallback={<ChartLoader />}>
        <LazyPie {...config} />
      </Suspense>
    </div>
  );
};

export default ExpenseBreakdownChart;
