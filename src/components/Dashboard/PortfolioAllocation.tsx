import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const PortfolioAllocation: React.FC = () => {
  const data = [
    { name: 'US Stocks', value: 45, color: '#3B82F6' },
    { name: 'International Stocks', value: 25, color: '#10B981' },
    { name: 'Bonds', value: 15, color: '#F59E0B' },
    { name: 'Crypto', value: 10, color: '#8B5CF6' },
    { name: 'Cash', value: 5, color: '#6B7280' },
  ];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `${value}%`}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            formatter={(value: string) => (
              <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioAllocation;
