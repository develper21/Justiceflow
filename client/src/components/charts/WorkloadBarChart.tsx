import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
    name: string;
    value: number;
}

interface WorkloadBarChartProps {
    data: DataPoint[];
    title?: string;
    barColor?: string;
    dataKey?: string;
}

export const WorkloadBarChart: React.FC<WorkloadBarChartProps> = ({
    data,
    title,
    barColor = '#8884d8',
    dataKey = 'value',
}) => {
    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-navy-700">
                <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <p>No data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {title && <h3 className="text-lg font-bold mb-4 text-navy-900">{title}</h3>}
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(8px)',
                            border: '2px solid rgba(255, 255, 255, 0.5)',
                            borderRadius: '12px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                        }}
                    />
                    <Legend />
                    <Bar dataKey={dataKey} fill={barColor} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
