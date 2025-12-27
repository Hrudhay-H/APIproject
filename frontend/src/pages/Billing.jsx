import React from 'react';
import { CreditCard, DollarSign, Server, TrendingUp } from 'lucide-react';
import { ExpenseBarChart } from '../components/charts/ExpenseBarChart';

export const Billing = ({ billing, apis, darkMode }) => {
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center mb-12">
                <div className={`inline-block p-4 rounded-full ${darkMode ? 'bg-dark-surface' : 'bg-anti-card'} mb-4 shadow-lg shadow-anti-card/30`}>
                    <CreditCard size={32} className={darkMode ? 'text-dark-text' : 'text-anti-dark'} />
                </div>
                <h2 className={`text-4xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} tracking-tight`}>Financial Overview</h2>
                <p className={`${darkMode ? 'text-dark-text-muted' : 'text-gray-500'} mt-2`}>Resource allocation and consumption metrics.</p>
            </div>

            {/* Budget Overview */}
            <div className={`${darkMode ? 'bg-dark-card' : 'bg-anti-dark'} rounded-xl-dashboard p-10 shadow-2xl relative overflow-hidden text-white`}>
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <DollarSign size={200} className="text-white" />
                </div>
                <div className="flex justify-between items-end mb-8 relative z-10">
                    <div>
                        <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-2">Monthly Budget Utilization</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-bold tracking-tighter">
                                ${billing.totalCost}
                            </span>
                            <span className="text-xl text-white/30 font-medium">/ ${billing.monthlyBudget}</span>
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10">
                        <span className="text-white font-bold">{billing.budgetUsed.toFixed(1)}%</span> Consumed
                    </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-4 relative z-10 overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out relative ${billing.budgetUsed > 80 ? 'bg-red-500' : billing.budgetUsed > 50 ? 'bg-anti-accent' : 'bg-green-500'
                            }`}
                        style={{ width: `${Math.min(billing.budgetUsed, 100)}%` }}
                    >
                        <div className="absolute inset-0 bg-white/30 w-full h-full animate-[shimmer_2s_infinite]" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Cost Breakdown */}
                <div className={`md:col-span-2 ${darkMode ? 'bg-dark-card border-dark-surface' : 'bg-white/50 border-white/50'} backdrop-blur-md rounded-xl-dashboard p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border`}>
                    <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-dark-text' : 'text-anti-dark'}`}>Expense Distribution</h3>
                    <ExpenseBarChart apis={apis} darkMode={darkMode} />
                </div>

                {/* Top Spender */}
                <div className={`md:col-span-1 ${darkMode ? 'bg-dark-card border-dark-surface' : 'bg-anti-card/30 border-white/50'} backdrop-blur-md rounded-xl-dashboard p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border flex flex-col justify-center items-center text-center`}>
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-4">
                        <TrendingUp size={28} className="text-anti-accent" />
                    </div>
                    <p className={`text-xs ${darkMode ? 'text-dark-text-muted' : 'text-gray-500'} uppercase tracking-widest font-bold mb-4`}>Highest Cost</p>
                    {apis.length > 0 ? (
                        <>
                            <p className={`text-2xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} mb-1`}>{apis.sort((a, b) => b.monthlyCost - a.monthlyCost)[0].name}</p>
                            <p className={`text-4xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'}`}>${apis.sort((a, b) => b.monthlyCost - a.monthlyCost)[0].monthlyCost}</p>
                        </>
                    ) : (
                        <p className={`${darkMode ? 'text-dark-text-muted' : 'text-gray-400'}`}>-</p>
                    )}
                </div>

                {/* Quick Stats */}
                <div className={`${darkMode ? 'bg-dark-card border-dark-surface' : 'bg-white/50 border-white/50'} backdrop-blur-md rounded-xl-dashboard p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border space-y-6`}>
                    <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-dark-text' : 'text-anti-dark'}`}>This Month</h3>
                    <div className="space-y-4">
                        <div className={`p-4 ${darkMode ? 'bg-dark-surface' : 'bg-gray-50'} rounded-xl`}>
                            <p className={`text-xs ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-wider font-bold mb-1`}>Total Cost</p>
                            <p className={`text-2xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'}`}>${billing.totalCost}</p>
                        </div>
                        <div className={`p-4 ${darkMode ? 'bg-dark-surface' : 'bg-gray-50'} rounded-xl`}>
                            <p className={`text-xs ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-wider font-bold mb-1`}>Budget</p>
                            <p className={`text-2xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'}`}>${billing.monthlyBudget}</p>
                        </div>
                        <div className={`p-4 ${darkMode ? 'bg-dark-surface' : 'bg-gray-50'} rounded-xl`}>
                            <p className={`text-xs ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-wider font-bold mb-1`}>Remaining</p>
                            <p className={`text-2xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'}`}>${(billing.monthlyBudget - billing.totalCost).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Itemized Breakdown */}
            <div className={`${darkMode ? 'bg-dark-card border-dark-surface' : 'bg-white rounded-xl-dashboard shadow-[0_10px_40px_rgba(0,0,0,0.04)] overflow-hidden border border-gray-100'}`}>
                <div className={`px-8 py-6 border-b ${darkMode ? 'border-dark-surface bg-dark-surface/50' : 'border-gray-100 bg-gray-50/50'}`}>
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'}`}>Itemized Breakdown</h3>
                </div>
                {apis.length > 0 ? (
                    <div className={`divide-y ${darkMode ? 'divide-dark-surface' : 'divide-gray-100'}`}>
                        {apis.map((api) => (
                            <div key={api._id} className={`p-8 flex items-center justify-between ${darkMode ? 'hover:bg-dark-surface/50' : 'hover:bg-gray-50/50'} transition-colors group`}>
                                <div className="flex items-center space-x-6">
                                    <div className="w-16 h-16 rounded-2xl bg-anti-card flex items-center justify-center shadow-sm">
                                        <Server size={28} className={`${darkMode ? 'text-dark-text-muted' : 'text-anti-dark opacity-80'}`} />
                                    </div>
                                    <div>
                                        <p className={`font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} text-xl mb-1`}>{api.name}</p>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${api.status === 'Running' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            <p className="text-sm text-gray-400 font-mono">{api.baseUrl}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} text-2xl`}>${api.monthlyCost}</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1">Monthly</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={`text-center py-12 ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'}`}>
                        No services configured
                    </div>
                )}
            </div>
        </div>
    );
};
