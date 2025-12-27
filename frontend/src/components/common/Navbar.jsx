import React from 'react';
import { LayoutDashboard, Server, List, CreditCard, User, Zap, Moon, Sun, LogOut } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, darkMode, toggleDarkMode, user, onLogout }) => {
    return (
        <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 ${darkMode
            ? 'bg-dark-card/90 border-dark-surface/40'
            : 'bg-[#FAFAFA]/70 border-white/40'
            } backdrop-blur-[16px] border shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-full px-2 py-2 flex items-center gap-1 transition-all duration-300`}>
            <div className={`flex items-center px-4 pr-6 border-r ${darkMode ? 'border-dark-surface/50' : 'border-gray-200/50'}`}>
                <div className="w-8 h-8 rounded-full bg-anti-accent flex items-center justify-center shadow-lg shadow-anti-accent/20">
                    <Zap size={16} className="text-white fill-white" />
                </div>
                <span className={`ml-3 font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} tracking-tight text-sm hidden sm:block`}>APIfy</span>
            </div>

            <div className="flex items-center">
                {[
                    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
                    { id: 'apis', label: 'Services', icon: Server },
                    { id: 'usage', label: 'Logs', icon: List },
                    { id: 'billing', label: 'Billing', icon: CreditCard },
                    { id: 'profile', label: 'Profile', icon: User }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                            ? darkMode
                                ? 'bg-anti-accent text-white shadow-lg'
                                : 'bg-anti-dark text-white shadow-lg'
                            : darkMode
                                ? 'text-dark-text-muted hover:text-dark-text hover:bg-dark-surface/50'
                                : 'text-gray-500 hover:text-anti-dark hover:bg-black/5'
                            }`}
                    >
                        <tab.icon size={16} strokeWidth={2} />
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Dark Mode Toggle */}
            <div className={`ml-2 pl-2 border-l ${darkMode ? 'border-dark-surface/50' : 'border-gray-200/50'}`}>
                <button
                    onClick={toggleDarkMode}
                    className={`p-2.5 rounded-full transition-all duration-300 ${darkMode
                        ? 'bg-dark-surface/50 text-dark-text hover:bg-dark-surface'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
            </div>

            {/* Logout Button */}
            {user && onLogout && (
                <div className={`ml-2 pl-2 border-l ${darkMode ? 'border-dark-surface/50' : 'border-gray-200/50'}`}>
                    <button
                        onClick={onLogout}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${darkMode
                            ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30'
                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                            }`}
                        title="Logout"
                    >
                        <LogOut size={16} />
                        <span className="hidden md:inline text-sm font-medium">Logout</span>
                    </button>
                </div>
            )}
        </nav>
    );
};
