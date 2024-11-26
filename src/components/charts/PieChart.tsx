import React from 'react';
import { PieChart as RechartsPie, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  title?: string;
  height?: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const PieChart: React.FC<PieChartProps> = ({ data, title, height = 400 }) => {
  return (
    <div className="w-full" style={{ height }}>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPie>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RechartsPie>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
