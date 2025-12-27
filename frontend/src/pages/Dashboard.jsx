import React from 'react';
import { Activity, DollarSign, TrendingUp, RefreshCw, AlertCircle } from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { TrafficChart } from '../components/charts/TrafficChart';
import { CostPieChart } from '../components/charts/CostPieChart';

export const Dashboard = ({ stats, apis, usageData, recentCalls, billing, darkMode, onSimulateApiCall }) => {
    return (
        <div className="space-y-10">
            <div className="flex justify-between items-end px-2">
                <div>
                    <h2 className={`text-4xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} tracking-tight mb-2`}>Dashboard</h2>
                    <div className="h-1 w-20 bg-anti-accent rounded-full opacity-80"></div>
                </div>
                <button
                    onClick={onSimulateApiCall}
                    className="flex items-center space-x-2 bg-anti-accent text-white px-6 py-3.5 rounded-full hover:bg-anti-accent/90 hover:shadow-lg hover:shadow-anti-accent/30 hover:scale-[1.02] transition-all duration-300 font-medium text-sm"
                >
                    <RefreshCw size={16} />
                    <span>Simulate Traffic</span>
                </button>
            </div>

            {/* Budget Alert */}
            {billing.budgetUsed > 80 && (
                <div className={`${darkMode ? 'bg-red-900/20 border-red-800/30' : 'bg-red-50/50 border-red-100'} backdrop-blur-sm border p-6 rounded-xl-dashboard animate-scaleIn flex items-center gap-4`}>
                    <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-red-900/40' : 'bg-red-100'} flex items-center justify-center flex-shrink-0`}>
                        <AlertCircle className="text-red-500" size={20} />
                    </div>
                    <div>
                        <p className={`${darkMode ? 'text-red-300' : 'text-red-900'} font-bold text-lg`}>Budget Threshold Reached</p>
                        <p className={`${darkMode ? 'text-red-400/80' : 'text-red-700/80'}`}>You have consumed {billing.budgetUsed.toFixed(1)}% of your allocated monthly resources.</p>
                    </div>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                <StatCard
                    icon={Activity}
                    title="Total Calls"
                    value={stats.totalCalls.toLocaleString()}
                    subtitle="Last 30 days"
                    darkMode={darkMode}
                />
                <StatCard
                    icon={DollarSign}
                    title="Total Cost"
                    value={`$${billing.totalCost}`}
                    subtitle={`${billing.budgetUsed.toFixed(1)}% of budget`}
                    darkMode={darkMode}
                />
                <StatCard
                    icon={TrendingUp}
                    title="Error Rate"
                    value={`${stats.errorRate.toFixed(1)}%`}
                    subtitle="Success rate: 98.2%"
                    darkMode={darkMode}
                />
                <StatCard
                    icon={Activity}
                    title="Avg Latency"
                    value={`${Math.round(stats.avgResponseTime)}ms`}
                    subtitle="Global average"
                    darkMode={darkMode}
                />
            </div>

            {/* Charts - Masonry Layout Concept */}
            <div className="grid grid-cols-12 gap-8">
                <div className={`col-span-12 lg:col-span-8 ${darkMode ? 'bg-dark-card border-dark-surface' : 'bg-white/40 border-white/30'} backdrop-blur-md rounded-xl-dashboard p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500`}>
                    <div className="flex justify-between items-center mb-8">
                        <h3 className={`text-xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'}`}>Traffic & Load</h3>
                        <div className="flex gap-2">
                            <span className="w-2 h-2 rounded-full bg-anti-accent"></span>
                            <span className={`w-2 h-2 rounded-full ${darkMode ? 'bg-dark-surface' : 'bg-gray-300'}`}></span>
                        </div>
                    </div>
                    <TrafficChart data={usageData} darkMode={darkMode} />
                </div>

                <div className={`col-span-12 lg:col-span-4 ${darkMode ? 'bg-dark-card border-dark-surface' : 'bg-white/40 border-white/30'} backdrop-blur-md rounded-xl-dashboard p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500`}>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} mb-8`}>Cost Allocation</h3>
                    <CostPieChart apis={apis} totalCost={billing.totalCost} darkMode={darkMode} />
                </div>
            </div>

            {/* Recent Activity */}
            <div className={`${darkMode ? 'bg-dark-card border-dark-surface' : 'bg-white/60 border-white/40'} backdrop-blur-md rounded-xl-dashboard p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border`}>
                <h3 className={`text-xl font-bold mb-8 ${darkMode ? 'text-dark-text' : 'text-anti-dark'}`}>Recent Activity</h3>
                {recentCalls.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className={`border-b ${darkMode ? 'border-dark-surface' : 'border-gray-200/50'}`}>
                                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} text-xs uppercase tracking-widest font-semibold`}>Service</th>
                                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} text-xs uppercase tracking-widest font-semibold`}>Method</th>
                                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} text-xs uppercase tracking-widest font-semibold`}>Status</th>
                                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} text-xs uppercase tracking-widest font-semibold`}>Latency</th>
                                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} text-xs uppercase tracking-widest font-semibold`}>Time</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${darkMode ? 'divide-dark-surface' : 'divide-gray-100'}`}>
                                {recentCalls.slice(0, 5).map((call) => (
                                    <tr key={call._id} className={`${darkMode ? 'hover:bg-dark-surface/50' : 'hover:bg-white/40'} transition-colors group`}>
                                        <td className={`py-5 px-6 font-medium ${darkMode ? 'text-dark-text' : 'text-anti-dark'}`}>{call.apiId?.name || 'Unknown'}</td>
                                        <td className="py-5 px-6">
                                            <span className={`${darkMode ? 'bg-dark-surface text-dark-text' : 'bg-anti-card text-anti-dark'} px-3 py-1.5 rounded-full text-xs font-bold tracking-wide`}>
                                                {call.method}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6">
                                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide inline-flex items-center gap-1.5 ${call.statusCode === 200
                                                ? 'bg-green-100/50 text-green-700'
                                                : 'bg-red-100/50 text-red-700'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${call.statusCode === 200 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                {call.statusCode}
                                            </span>
                                        </td>
                                        <td className={`py-5 px-6 ${darkMode ? 'text-dark-text-muted' : 'text-gray-600'} font-mono text-sm`}>{call.responseTime}ms</td>
                                        <td className={`py-5 px-6 text-sm ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'}`}>
                                            {new Date(call.createdAt).toLocaleTimeString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className={`text-center py-12 ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'}`}>
                        No activity recorded yet
                    </div>
                )}
            </div>
        </div>
    );
};
