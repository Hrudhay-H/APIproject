import React from 'react';
import { Server, Trash2, Plus } from 'lucide-react';

export const ApiManagement = ({ apis, onDelete, onShowAddModal, darkMode }) => {
    return (
        <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex justify-between items-end px-2">
                <div>
                    <h2 className={`text-4xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} tracking-tight mb-2`}>Services</h2>
                    <div className="h-1 w-20 bg-anti-accent rounded-full opacity-80"></div>
                </div>
                <button
                    onClick={onShowAddModal}
                    className={`flex items-center space-x-2 ${darkMode ? 'bg-anti-accent hover:bg-anti-accent/90' : 'bg-anti-dark hover:bg-black'} text-white px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] shadow-xl hover:shadow-2xl font-medium text-sm`}
                >
                    <Plus size={18} />
                    <span>Add Service</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {apis.map(api => (
                    <div key={api._id} className={`group ${darkMode ? 'bg-dark-card border-dark-surface' : 'bg-white/60 border-white/40'} backdrop-blur-md rounded-xl-dashboard p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300`}>
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex items-center space-x-4">
                                <div className={`w-14 h-14 rounded-2xl ${darkMode ? 'bg-dark-surface group-hover:bg-anti-accent' : 'bg-anti-card group-hover:bg-anti-accent'} flex items-center justify-center transition-colors duration-500 shadow-inner`}>
                                    <Server size={24} className={`${darkMode ? 'text-dark-text group-hover:text-white' : 'text-anti-dark group-hover:text-white'} transition-colors duration-500`} />
                                </div>
                                <div>
                                    <h3 className={`font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} text-lg`}>{api.name}</h3>
                                    <span className="text-xs text-green-700 font-bold bg-green-100/50 px-2 py-1 rounded-md border border-green-200/50">{api.status}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => onDelete(api._id)}
                                className={`${darkMode ? 'text-dark-text-muted hover:text-red-400 hover:bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-red-50'} transition-colors p-3 rounded-xl`}
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                        <div className="space-y-6">
                            <div className={`p-4 ${darkMode ? 'bg-dark-surface border-dark-surface' : 'bg-gray-50/80 border-gray-100'} rounded-xl border`}>
                                <p className={`text-xs ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase font-bold tracking-wider mb-1`}>Endpoint</p>
                                <p className={`text-sm ${darkMode ? 'text-dark-text' : 'text-anti-dark'} font-mono truncate`}>{api.baseUrl}</p>
                            </div>
                            <div className="flex justify-between items-center pt-2 px-2">
                                <div>
                                    <p className={`text-xs ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-wider font-medium`}>Monthly Cost</p>
                                </div>
                                <span className={`text-2xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} tracking-tight`}>${api.monthlyCost}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
