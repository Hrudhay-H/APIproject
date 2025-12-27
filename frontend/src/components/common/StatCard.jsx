import React from 'react';

export const StatCard = ({ icon: Icon, title, value, subtitle, darkMode }) => {
    return (
        <div className={`${darkMode ? 'bg-dark-card border-dark-surface' : 'bg-anti-card bg-opacity-40 border-white/20'} rounded-xl-dashboard p-8 hover:scale-[1.02] transition-all duration-300 animate-fadeInUp shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)] border`}>
            <div className="flex items-start justify-between">
                <div>
                    <div className="bg-anti-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Icon size={22} className="text-anti-accent" strokeWidth={1.5} />
                    </div>
                    <p className={`${darkMode ? 'text-dark-text-muted' : 'text-gray-600'} text-sm font-medium tracking-wide uppercase opacity-70`}>{title}</p>
                    <p className={`text-4xl font-bold mt-2 ${darkMode ? 'text-dark-text' : 'text-anti-dark'} tracking-tight`}>{value}</p>
                </div>
            </div>
            {subtitle && <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-dark-surface' : 'border-anti-dark/5'}`}>
                <p className={`text-xs ${darkMode ? 'text-dark-text-muted' : 'text-gray-500'} font-medium`}>{subtitle}</p>
            </div>}
        </div>
    );
};
