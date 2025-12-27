import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export const TrafficChart = ({ data, darkMode }) => {
    if (!data || data.length === 0) {
        return (
            <div className={`h-64 flex items-center justify-center ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'}`}>
                No traffic data available
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data}>
                <defs>
                    <filter id="glow" height="300%" width="300%" x="-75%" y="-75%">
                        <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
                <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 11 }}
                    dy={10}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666' }}
                />
                <Tooltip
                    cursor={{ stroke: '#FF6D1F', strokeWidth: 1 }}
                    contentStyle={{
                        borderRadius: '16px',
                        border: 'none',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }}
                />
                <Line
                    type="monotone"
                    dataKey="calls"
                    stroke="#FF6D1F"
                    strokeWidth={3}
                    dot={{ fill: '#FF6D1F', r: 5 }}
                    activeDot={{ r: 7 }}
                    filter="url(#glow)"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};
