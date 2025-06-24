import React, { lazy, Suspense } from 'react';
import { ColumnConfig } from '@ant-design/plots';

type FinancialData = {
  month: string;
  type: string;
  value: number;
};

interface FinancialOverviewChartProps {
  data: FinancialData[];
}

const LazyColumn = lazy(() => import('@ant-design/plots').then((mod) => ({ default: mod.Column })));

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

const FinancialOverviewChart: React.FC<FinancialOverviewChartProps> = ({ data }) => {
  const config: ColumnConfig = {
    data,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    isStack: true,
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    },
    legend: {
      position: 'top',
    },
    color: ['#52c41a', '#f5222d'], // Green for Revenue, Red for Expenses
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    yAxis: {
      label: {
        formatter: (v: number) => `KES ${(v / 1000).toFixed(0)}K`,
      },
    },
    tooltip: {
      formatter: (data: { type: string; value: number }) => ({
        name: data.type,
        value: `KES ${data.value.toLocaleString()}`,
      }),
    },
  };

  return (
    <div style={{ height: 300 }}>
      <Suspense fallback={<ChartLoader />}>
        <LazyColumn {...config} />
      </Suspense>
    </div>
  );
};

export default FinancialOverviewChart;
