import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CHART_COLORS = ['#FF6D1F', '#222222', '#F5E7C6', '#888888'];

export const CostPieChart = ({ apis, totalCost, darkMode }) => {
    if (!apis || apis.length === 0) {
        return (
            <div className={`h-64 flex items-center justify-center ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'}`}>
                No services configured
            </div>
        );
    }

    return (
        <div className="relative">
            <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                    <Pie
                        data={apis}
                        dataKey="monthlyCost"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={2}
                    >
                        {apis.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={CHART_COLORS[index % CHART_COLORS.length]}
                                stroke="white"
                                strokeWidth={2}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className={`${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} text-xs font-medium uppercase tracking-wider`}>Total</p>
                <p className={`text-3xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'}`}>${totalCost}</p>
            </div>
        </div>
    );
};
