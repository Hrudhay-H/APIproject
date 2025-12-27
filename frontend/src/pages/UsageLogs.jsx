import React from 'react';

export const UsageLogs = ({ calls, darkMode }) => {
    return (
        <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex justify-between items-end px-2">
                <div>
                    <h2 className={`text-4xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} tracking-tight mb-2`}>Usage Logs</h2>
                    <div className="h-1 w-20 bg-anti-accent rounded-full opacity-80"></div>
                </div>
            </div>

            <div className={`${darkMode ? 'bg-dark-card border-dark-surface' : 'bg-white/60 border-white/40'} backdrop-blur-md rounded-xl-dashboard p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border`}>
                {calls.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className={`border-b ${darkMode ? 'border-dark-surface' : 'border-gray-200/50'}`}>
                                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} text-xs uppercase tracking-widest font-semibold`}>Timestamp</th>
                                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} text-xs uppercase tracking-widest font-semibold`}>Service</th>
                                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} text-xs uppercase tracking-widest font-semibold`}>Method</th>
                                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} text-xs uppercase tracking-widest font-semibold`}>Endpoint</th>
                                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} text-xs uppercase tracking-widest font-semibold`}>Status</th>
                                    <th className={`text-left py-4 px-6 ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} text-xs uppercase tracking-widest font-semibold`}>Latency</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${darkMode ? 'divide-dark-surface' : 'divide-gray-100'}`}>
                                {calls.map((call) => (
                                    <tr key={call._id} className={`${darkMode ? 'hover:bg-dark-surface/50' : 'hover:bg-white/40'} transition-colors`}>
                                        <td className={`py-5 px-6 text-sm ${darkMode ? 'text-dark-text-muted' : 'text-gray-500'}`}>
                                            {new Date(call.createdAt).toLocaleString()}
                                        </td>
                                        <td className={`py-5 px-6 font-medium ${darkMode ? 'text-dark-text' : 'text-anti-dark'}`}>{call.apiId?.name || 'Unknown'}</td>
                                        <td className="py-5 px-6">
                                            <span className={`${darkMode ? 'bg-dark-surface text-dark-text' : 'bg-anti-card text-anti-dark'} px-3 py-1.5 rounded-full text-xs font-bold`}>
                                                {call.method}
                                            </span>
                                        </td>
                                        <td className={`py-5 px-6 ${darkMode ? 'text-dark-text-muted' : 'text-gray-600'} font-mono text-xs`}>{call.endpoint || '/'}</td>
                                        <td className="py-5 px-6">
                                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${call.statusCode === 200
                                                    ? 'bg-green-100/50 text-green-700'
                                                    : 'bg-red-100/50 text-red-700'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${call.statusCode === 200 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                {call.statusCode}
                                            </span>
                                        </td>
                                        <td className={`py-5 px-6 ${darkMode ? 'text-dark-text' : 'text-anti-dark'} font-mono font-medium`}>{call.responseTime}ms</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className={`text-center py-12 ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'}`}>
                        No logs available yet
                    </div>
                )}
            </div>
        </div>
    );
};
