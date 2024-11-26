import React from 'react';
import {
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface LineChartProps {
  data: Array<{
    date: string;
    value: number;
    [key: string]: any;
  }>;
  lines: Array<{
    key: string;
    color: string;
    name: string;
  }>;
  title?: string;
  height?: number;
  yAxisFormatter?: (value: number) => string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  lines,
  title,
  height = 400,
  yAxisFormatter = (value) => `$${value.toLocaleString()}`,
}) => {
  return (
    <div className="w-full" style={{ height }}>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLine
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={yAxisFormatter} />
          <Tooltip
            formatter={(value: number) => yAxisFormatter(value)}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />
          {lines.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              name={line.name}
              stroke={line.color}
              activeDot={{ r: 8 }}
            />
          ))}
        </RechartsLine>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
