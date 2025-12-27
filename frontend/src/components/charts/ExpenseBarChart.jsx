import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export const ExpenseBarChart = ({ apis, darkMode }) => {
    if (!apis || apis.length === 0) {
        return (
            <div className={`h-64 flex items-center justify-center ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'}`}>
                No cost data available
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={apis} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#666' }} prefix="$" />
                <Tooltip
                    cursor={{ fill: '#F5F5F5', radius: 8 }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
                />
                <Bar dataKey="monthlyCost" fill="#FF6D1F" radius={[8, 8, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};
