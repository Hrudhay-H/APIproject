import React, { useState } from 'react';
import { X, Eye, EyeOff, ExternalLink } from 'lucide-react';

export const AddServiceModal = ({ isOpen, onClose, onAdd, darkMode }) => {
    const [formData, setFormData] = useState({
        name: '',
        baseUrl: '',
        monthlyCost: '',
        // New fields
        apiKeyPlain: '',
        authType: 'none',
        authHeaderName: 'Authorization',
        environment: 'production',
        version: 'v1',
        docsUrl: '',
        tags: '',
        notes: ''
    });

    const [showApiKey, setShowApiKey] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert tags string to array
        const tagsArray = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [];

        onAdd({
            ...formData,
            monthlyCost: parseFloat(formData.monthlyCost) || 0,
            tags: tagsArray
        });

        // Reset form
        setFormData({
            name: '',
            baseUrl: '',
            monthlyCost: '',
            apiKeyPlain: '',
            authType: 'none',
            authHeaderName: 'Authorization',
            environment: 'production',
            version: 'v1',
            docsUrl: '',
            tags: '',
            notes: ''
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className={`${darkMode ? 'bg-dark-card border-dark-surface' : 'bg-white border-gray-200'} rounded-xl-dashboard border shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
                {/* Header */}
                <div className={`flex items-center justify-between p-6 border-b ${darkMode ? 'border-dark-surface' : 'border-gray-200'}`}>
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'}`}>
                        Add New API Service
                    </h3>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-dark-surface text-dark-text-muted' : 'hover:bg-gray-100 text-gray-500'}`}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Basic Info Section */}
                    <div>
                        <h4 className={`text-sm font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} uppercase tracking-wider mb-4`}>
                            Basic Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>
                                    Service Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className={`w-full px-4 py-3 ${darkMode ? 'bg-dark-surface border-dark-surface text-dark-text placeholder-dark-text-muted' : 'bg-white border-gray-200 text-anti-dark placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-anti-accent focus:border-anti-accent transition-all outline-none`}
                                    placeholder="Stripe API"
                                    required
                                />
                            </div>

                            <div>
                                <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>
                                    Monthly Cost ($)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.monthlyCost}
                                    onChange={(e) => setFormData({ ...formData, monthlyCost: e.target.value })}
                                    className={`w-full px-4 py-3 ${darkMode ? 'bg-dark-surface border-dark-surface text-dark-text placeholder-dark-text-muted' : 'bg-white border-gray-200 text-anti-dark placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-anti-accent focus:border-anti-accent transition-all outline-none`}
                                    placeholder="50.00"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>
                                Base URL *
                            </label>
                            <input
                                type="url"
                                value={formData.baseUrl}
                                onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
                                className={`w-full px-4 py-3 ${darkMode ? 'bg-dark-surface border-dark-surface text-dark-text placeholder-dark-text-muted' : 'bg-white border-gray-200 text-anti-dark placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-anti-accent focus:border-anti-accent transition-all outline-none`}
                                placeholder="https://api.stripe.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Environment & Version Section */}
                    <div className={`pt-6 border-t ${darkMode ? 'border-dark-surface' : 'border-gray-200'}`}>
                        <h4 className={`text-sm font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} uppercase tracking-wider mb-4`}>
                            Environment & Version
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>
                                    Environment
                                </label>
                                <select
                                    value={formData.environment}
                                    onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
                                    className={`w-full px-4 py-3 ${darkMode ? 'bg-dark-surface border-dark-surface text-dark-text' : 'bg-white border-gray-200 text-anti-dark'} border rounded-xl focus:ring-2 focus:ring-anti-accent focus:border-anti-accent transition-all outline-none`}
                                >
                                    <option value="development">🟡 Development</option>
                                    <option value="staging">🟠 Staging</option>
                                    <option value="production">🟢 Production</option>
                                </select>
                            </div>

                            <div>
                                <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>
                                    Version
                                </label>
                                <input
                                    type="text"
                                    value={formData.version}
                                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                                    className={`w-full px-4 py-3 ${darkMode ? 'bg-dark-surface border-dark-surface text-dark-text placeholder-dark-text-muted' : 'bg-white border-gray-200 text-anti-dark placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-anti-accent focus:border-anti-accent transition-all outline-none`}
                                    placeholder="v1"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>
                                Documentation URL
                            </label>
                            <div className="relative">
                                <input
                                    type="url"
                                    value={formData.docsUrl}
                                    onChange={(e) => setFormData({ ...formData, docsUrl: e.target.value })}
                                    className={`w-full px-4 py-3 pr-10 ${darkMode ? 'bg-dark-surface border-dark-surface text-dark-text placeholder-dark-text-muted' : 'bg-white border-gray-200 text-anti-dark placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-anti-accent focus:border-anti-accent transition-all outline-none`}
                                    placeholder="https://stripe.com/docs/api"
                                />
                                <ExternalLink size={16} className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'}`} />
                            </div>
                        </div>
                    </div>

                    {/* Authentication Section */}
                    <div className={`pt-6 border-t ${darkMode ? 'border-dark-surface' : 'border-gray-200'}`}>
                        <h4 className={`text-sm font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} uppercase tracking-wider mb-4`}>
                            Authentication
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>
                                    Auth Type
                                </label>
                                <select
                                    value={formData.authType}
                                    onChange={(e) => setFormData({ ...formData, authType: e.target.value })}
                                    className={`w-full px-4 py-3 ${darkMode ? 'bg-dark-surface border-dark-surface text-dark-text' : 'bg-white border-gray-200 text-anti-dark'} border rounded-xl focus:ring-2 focus:ring-anti-accent focus:border-anti-accent transition-all outline-none`}
                                >
                                    <option value="none">None</option>
                                    <option value="api-key">API Key</option>
                                    <option value="bearer-token">Bearer Token</option>
                                    <option value="basic-auth">Basic Auth</option>
                                    <option value="oauth2">OAuth 2.0</option>
                                </select>
                            </div>

                            {formData.authType !== 'none' && (
                                <div>
                                    <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>
                                        Header Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.authHeaderName}
                                        onChange={(e) => setFormData({ ...formData, authHeaderName: e.target.value })}
                                        className={`w-full px-4 py-3 ${darkMode ? 'bg-dark-surface border-dark-surface text-dark-text placeholder-dark-text-muted' : 'bg-white border-gray-200 text-anti-dark placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-anti-accent focus:border-anti-accent transition-all outline-none`}
                                        placeholder="Authorization"
                                    />
                                </div>
                            )}
                        </div>

                        {formData.authType !== 'none' && (
                            <div className="mt-4">
                                <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>
                                    API Key / Token
                                    <span className="ml-2 text-xs normal-case text-amber-500">🔒 Encrypted at rest</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showApiKey ? 'text' : 'password'}
                                        value={formData.apiKeyPlain}
                                        onChange={(e) => setFormData({ ...formData, apiKeyPlain: e.target.value })}
                                        className={`w-full px-4 py-3 pr-12 ${darkMode ? 'bg-dark-surface border-dark-surface text-dark-text placeholder-dark-text-muted' : 'bg-white border-gray-200 text-anti-dark placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-anti-accent focus:border-anti-accent transition-all outline-none font-mono text-sm`}
                                        placeholder="sk_test_••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowApiKey(!showApiKey)}
                                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded ${darkMode ? 'hover:bg-dark-bg text-dark-text-muted' : 'hover:bg-gray-100 text-gray-500'}`}
                                    >
                                        {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Additional Details Section */}
                    <div className={`pt-6 border-t ${darkMode ? 'border-dark-surface' : 'border-gray-200'}`}>
                        <h4 className={`text-sm font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} uppercase tracking-wider mb-4`}>
                            Additional Details
                        </h4>
                        <div>
                            <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>
                                Tags
                                <span className="ml-2 text-xs normal-case">(comma-separated)</span>
                            </label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                className={`w-full px-4 py-3 ${darkMode ? 'bg-dark-surface border-dark-surface text-dark-text placeholder-dark-text-muted' : 'bg-white border-gray-200 text-anti-dark placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-anti-accent focus:border-anti-accent transition-all outline-none`}
                                placeholder="payment, core, external"
                            />
                        </div>

                        <div className="mt-4">
                            <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>
                                Notes
                                <span className="ml-2 text-xs normal-case">(max 500 characters)</span>
                            </label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                maxLength={500}
                                rows={3}
                                className={`w-full px-4 py-3 ${darkMode ? 'bg-dark-surface border-dark-surface text-dark-text placeholder-dark-text-muted' : 'bg-white border-gray-200 text-anti-dark placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-anti-accent focus:border-anti-accent transition-all outline-none resize-none`}
                                placeholder="Additional information about this API service..."
                            />
                            <div className={`text-xs ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} text-right mt-1`}>
                                {formData.notes.length}/500
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${darkMode ? 'bg-dark-surface text-dark-text hover:bg-dark-surface/70' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-anti-accent hover:bg-anti-accent/90 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
                        >
                            Add Service
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
