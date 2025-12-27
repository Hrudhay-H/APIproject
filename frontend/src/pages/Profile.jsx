import React from 'react';

export const Profile = ({
    userSettings,
    isEditing,
    editedProfile,
    onEdit,
    onSave,
    onCancel,
    onChange,
    darkMode
}) => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className={`text-4xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} tracking-tight`}>User Profile</h2>
                <p className={`${darkMode ? 'text-dark-text-muted' : 'text-gray-500'} mt-2`}>Manage your account settings and preferences.</p>
            </div>

            <div className={`${darkMode ? 'bg-dark-card border-dark-surface' : 'bg-white/60 border-white/40'} backdrop-blur-md rounded-xl-dashboard p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border flex flex-col md:flex-row items-center gap-12 animate-fadeInUp`}>
                <div className="flex-shrink-0 relative">
                    <div className="w-40 h-40 rounded-full bg-anti-card flex items-center justify-center shadow-inner border-4 border-white">
                        <span className="text-5xl font-bold text-anti-accent">
                            {userSettings.userProfile?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'JD'}
                        </span>
                    </div>
                    <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                </div>

                <div className="flex-1 w-full space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>Full Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedProfile.name || ''}
                                    onChange={(e) => onChange({ ...editedProfile, name: e.target.value })}
                                    className={`w-full text-xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} border-b-2 border-anti-accent pb-2 outline-none bg-transparent focus:border-anti-accent transition-all`}
                                />
                            ) : (
                                <p className={`text-xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} border-b ${darkMode ? 'border-dark-surface' : 'border-gray-200'} pb-2`}>{userSettings.userProfile?.name || 'John Doe'}</p>
                            )}
                        </div>
                        <div>
                            <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>Email Address</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={editedProfile.email || ''}
                                    onChange={(e) => onChange({ ...editedProfile, email: e.target.value })}
                                    className={`w-full text-xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} border-b-2 border-anti-accent pb-2 outline-none bg-transparent focus:border-anti-accent transition-all`}
                                />
                            ) : (
                                <p className={`text-xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} border-b ${darkMode ? 'border-dark-surface' : 'border-gray-200'} pb-2`}>{userSettings.userProfile?.email || 'john.doe@antigravity.dev'}</p>
                            )}
                        </div>
                        <div>
                            <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>Organization</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedProfile.organization || ''}
                                    onChange={(e) => onChange({ ...editedProfile, organization: e.target.value })}
                                    className={`w-full text-xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} border-b-2 border-anti-accent pb-2 outline-none bg-transparent focus:border-anti-accent transition-all`}
                                />
                            ) : (
                                <p className={`text-xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} border-b ${darkMode ? 'border-dark-surface' : 'border-gray-200'} pb-2`}>{userSettings.userProfile?.organization || 'Antigravity Inc.'}</p>
                            )}
                        </div>
                        <div>
                            <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>Plan</label>
                            {isEditing ? (
                                <select
                                    value={editedProfile.plan || ''}
                                    onChange={(e) => onChange({ ...editedProfile, plan: e.target.value })}
                                    className={`w-full text-xl font-bold ${darkMode ? 'text-dark-text bg-dark-surface' : 'text-anti-dark bg-transparent'} border-b-2 border-anti-accent pb-2 outline-none focus:border-anti-accent transition-all`}
                                >
                                    <option value="Free">Free</option>
                                    <option value="Professional">Professional</option>
                                    <option value="Enterprise">Enterprise</option>
                                </select>
                            ) : (
                                <div className={`flex items-center gap-2 border-b ${darkMode ? 'border-dark-surface' : 'border-gray-200'} pb-2`}>
                                    <span className="bg-anti-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{userSettings.userProfile?.plan || 'Professional'}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={onSave}
                                    className={`${darkMode ? 'bg-anti-accent hover:bg-anti-accent/90' : 'bg-anti-accent hover:bg-anti-accent/90'} text-white px-6 py-3 rounded-xl transition-all font-medium shadow-lg`}
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={onCancel}
                                    className={`${darkMode ? 'bg-dark-surface text-dark-text hover:bg-dark-surface/70' : 'bg-transparent border border-gray-300 text-gray-600 hover:bg-gray-50'} px-6 py-3 rounded-xl transition-all font-medium`}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={onEdit}
                                    className={`${darkMode ? 'bg-anti-accent hover:bg-anti-accent/90' : 'bg-anti-dark hover:bg-black'} text-white px-6 py-3 rounded-xl transition-all font-medium shadow-lg`}
                                >
                                    Edit Profile
                                </button>
                                <button className={`${darkMode ? 'bg-dark-surface text-dark-text hover:bg-dark-surface/70' : 'bg-transparent border border-gray-300 text-gray-600 hover:bg-gray-50'} px-6 py-3 rounded-xl transition-all font-medium`}>
                                    Change Password
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Email Preferences Section */}
            <div className={`${darkMode ? 'bg-dark-card border-dark-surface' : 'bg-white/60 border-white/40'} backdrop-blur-md rounded-xl-dashboard p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border mt-8`}>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-dark-text' : 'text-anti-dark'} mb-2`}>Email Notifications</h3>
                <p className={`${darkMode ? 'text-dark-text-muted' : 'text-gray-500'} mb-6`}>Receive alerts when your budget threshold is exceeded.</p>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className={`text-lg font-medium ${darkMode ? 'text-dark-text' : 'text-anti-dark'}`}>Budget Alerts</label>
                            <p className={`text-sm ${darkMode ? 'text-dark-text-muted' : 'text-gray-500'}`}>Get notified when spending exceeds your threshold</p>
                        </div>
                        {isEditing ? (
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={editedProfile.emailAlerts?.enabled || false}
                                    onChange={(e) => onChange({
                                        ...editedProfile,
                                        emailAlerts: {
                                            ...editedProfile.emailAlerts,
                                            enabled: e.target.checked
                                        }
                                    })}
                                    className="sr-only peer"
                                />
                                <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-anti-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-anti-accent"></div>
                            </label>
                        ) : (
                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${userSettings.emailAlerts?.enabled
                                ? 'bg-green-100 text-green-700'
                                : darkMode ? 'bg-dark-surface text-dark-text-muted' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {userSettings.emailAlerts?.enabled ? 'Enabled' : 'Disabled'}
                            </span>
                        )}
                    </div>

                    {(isEditing ? editedProfile.emailAlerts?.enabled : userSettings.emailAlerts?.enabled) && (
                        <div>
                            <label className={`block text-xs font-bold ${darkMode ? 'text-dark-text-muted' : 'text-gray-400'} uppercase tracking-widest mb-2`}>Alert Email Address</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={editedProfile.emailAlerts?.email || ''}
                                    onChange={(e) => onChange({
                                        ...editedProfile,
                                        emailAlerts: {
                                            ...editedProfile.emailAlerts,
                                            email: e.target.value
                                        }
                                    })}
                                    placeholder="your.email@example.com"
                                    className={`w-full px-4 py-3 ${darkMode ? 'bg-dark-surface border-dark-surface text-dark-text placeholder-dark-text-muted' : 'bg-white border-gray-200 text-anti-dark placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-anti-accent focus:border-anti-accent transition-all outline-none`}
                                />
                            ) : (
                                <p className={`text-lg ${darkMode ? 'text-dark-text' : 'text-anti-dark'} font-mono`}>
                                    {userSettings.emailAlerts?.email || 'Not set'}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
