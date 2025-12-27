import React, { useState } from 'react';
import { Zap } from 'lucide-react';

export const Login = ({ onLogin, darkMode }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await onLogin(formData, isSignup);
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-dark-bg' : 'bg-anti-bg'} flex items-center justify-center px-4 transition-colors duration-300`}>
            <div className={`w-full max-w-md ${darkMode ? 'bg-dark-card border-dark-surface' : 'bg-white/80 border-white/60'} backdrop-blur-md rounded-xl-dashboard p-10 shadow-[0_30px_80px_rgba(0,0,0,0.08)] border`}>
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-anti-accent shadow-lg shadow-anti-accent/30 mb-4">
                        <Zap size={32} className="text-white fill-white" />
                    </div>
                    <h1 className={`text-3xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} tracking-tight`}>
                        {isSignup ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <p className={`${darkMode ? 'text-dark-text-muted' : 'text-gray-500'} mt-2`}>
                        {isSignup ? 'Sign up to get started' : 'Sign in to your account'}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {isSignup && (
                        <div>
                            <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={`w-full px-4 py-3 ${darkMode ? 'bg-dark-surface border-dark-surface text-dark-text placeholder-dark-text-muted' : 'bg-white border-gray-200 text-anti-dark placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-anti-accent focus:border-anti-accent transition-all outline-none`}
                                placeholder="John Doe"
                                required={isSignup}
                            />
                        </div>
                    )}

                    <div>
                        <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full px-4 py-3 ${darkMode ? 'bg-dark-surface border-dark-surface text-dark-text placeholder-dark-text-muted' : 'bg-white border-gray-200 text-anti-dark placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-anti-accent focus:border-anti-accent transition-all outline-none`}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className={`w-full px-4 py-3 ${darkMode ? 'bg-dark-surface border-dark-surface text-dark-text placeholder-dark-text-muted' : 'bg-white border-gray-200 text-anti-dark placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-anti-accent focus:border-anti-accent transition-all outline-none`}
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                        {isSignup && (
                            <p className={`text-xs ${darkMode ? 'text-dark-text-muted' : 'text-gray-500'} mt-2`}>
                                Must be at least 6 characters
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-anti-accent hover:bg-anti-accent/90 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
                            }`}
                    >
                        {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
                    </button>
                </form>

                {/* Toggle between Login/Signup */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsSignup(!isSignup);
                            setError('');
                            setFormData({ name: '', email: '', password: '' });
                        }}
                        className={`text-sm ${darkMode ? 'text-dark-text-muted hover:text-dark-text' : 'text-gray-600 hover:text-anti-dark'} transition-colors font-medium`}
                    >
                        {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                    </button>
                </div>
            </div>
        </div>
    );
};
