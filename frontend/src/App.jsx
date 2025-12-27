import { useState, useEffect } from 'react';
import { apiService } from './services/api';

// Custom Hooks
import { useDarkMode } from './hooks/useDarkMode';

// Common Components
import { Navbar } from './components/common/Navbar';
import { LoadingScreen } from './components/common/LoadingScreen';

// Modals
import { AddServiceModal } from './components/modals/AddServiceModal';

// Pages
import { Dashboard } from './pages/Dashboard';
import { ApiManagement } from './pages/ApiManagement';
import { UsageLogs } from './pages/UsageLogs';
import { Billing } from './pages/Billing';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';

function App() {
    // Dark Mode
    const { darkMode, toggleDarkMode } = useDarkMode();

    // Authentication State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // State Management
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(true);
    const [apis, setApis] = useState([]);
    const [usageData, setUsageData] = useState([]);
    const [recentCalls, setRecentCalls] = useState([]);
    const [billing, setBilling] = useState({
        totalCost: 0,
        monthlyBudget: 500,
        budgetUsed: 0
    });
    const [userSettings, setUserSettings] = useState({
        monthlyBudget: 500,
        alertThreshold: 80,
        userProfile: {
            name: '',
            email: '',
            organization: '',
            plan: 'Professional'
        }
    });
    const [showAddModal, setShowAddModal] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});

    // State for stats from backend
    const [stats, setStats] = useState({
        totalCalls: 0,
        errorRate: 0,
        avgResponseTime: 0
    });

    // Check for existing token on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await apiService.auth.getMe();
                setUser(response.data);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Token validation failed:', error);
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            }
        }
        setAuthLoading(false);
    };

    // Login/Signup handler
    const handleLogin = async (formData, isSignup) => {
        const endpoint = isSignup ? apiService.auth.signup : apiService.auth.login;
        const response = await endpoint(formData);

        const { token, ...userData } = response.data;
        localStorage.setItem('token', token);
        setUser(userData);
        setIsAuthenticated(true);
    };

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        setActiveTab('dashboard');
    };

    // Fetch Data on Mount (only if authenticated)
    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    const fetchData = async () => {
        try {
            const [apisRes, statsRes, callsRes, billingSummary, settingsData] = await Promise.all([
                apiService.getAllApis(),
                apiService.getUsageStats(),
                apiService.getAllApiCalls({ limit: 50 }),
                apiService.getBillingSummary(),
                apiService.getSettings()
            ]);

            // Backend returns direct data, not wrapped in .data
            const apisData = apisRes.data;
            const usageStats = statsRes.data;
            const recentCallsData = callsRes.data;

            // Transform dailyStats to match chart format (date instead of _id)
            const transformedDailyStats = (usageStats.dailyStats || []).map(stat => ({
                date: stat._id,
                calls: stat.calls,
                avgResponseTime: Math.round(stat.avgResponseTime)
            }));

            setApis(apisData);
            setUsageData(transformedDailyStats);
            setRecentCalls(recentCallsData);
            setBilling(billingSummary.data);
            setUserSettings(settingsData.data);

            // Update stats from backend data
            setStats({
                totalCalls: usageStats.totalCalls || 0,
                errorRate: usageStats.errorRate || 0,
                avgResponseTime: usageStats.avgResponseTime || 0
            });

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    // API Management Handlers
    const handleAddApi = async (apiData) => {
        try {
            await apiService.createApi(apiData);
            setShowAddModal(false);
            // Refresh data to show new API
            await fetchData();
        } catch (error) {
            console.error('Error adding API:', error);
            alert('Failed to add API: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDeleteApi = async (id) => {
        try {
            await apiService.deleteApi(id);
            fetchData();
        } catch (error) {
            console.error('Error deleting API:', error);
        }
    };

    const handleSimulateApiCall = async () => {
        try {
            if (apis.length === 0) {
                alert('Please add at least one API service first!');
                return;
            }

            // Generate traffic for the past 12 hours to show trend
            const hoursToSimulate = 12;
            const callsPerHour = Math.floor(Math.random() * 5) + 3; // 3-8 calls per hour

            for (let hour = hoursToSimulate - 1; hour >= 0; hour--) {
                for (let i = 0; i < callsPerHour; i++) {
                    const randomApi = apis[Math.floor(Math.random() * apis.length)];
                    const statusCodes = [200, 200, 200, 200, 201, 400, 500]; // Mostly successful

                    // Create timestamp for past hours
                    const callDate = new Date();
                    callDate.setHours(callDate.getHours() - hour);
                    callDate.setMinutes(Math.floor(Math.random() * 60));
                    callDate.setSeconds(Math.floor(Math.random() * 60));

                    await apiService.logApiCall({
                        apiId: randomApi._id,
                        method: ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)],
                        endpoint: '/test/endpoint',
                        statusCode: statusCodes[Math.floor(Math.random() * statusCodes.length)],
                        responseTime: Math.floor(Math.random() * 500) + 50,
                        createdAt: callDate
                    });
                }
            }

            // Refresh data to show the traffic
            await fetchData();
            alert(`Successfully generated ${hoursToSimulate * callsPerHour} API calls across ${hoursToSimulate} hours!`);
        } catch (error) {
            console.error('Error simulating API call:', error);
            alert('Failed to simulate traffic: ' + (error.response?.data?.message || error.message));
        }
    };

    // Profile Handlers
    const handleEditProfile = () => {
        setEditedProfile(userSettings.userProfile);
        setIsEditingProfile(true);
    };

    const handleSaveProfile = async () => {
        try {
            await apiService.updateSettings({
                ...userSettings,
                userProfile: editedProfile
            });
            setUserSettings({ ...userSettings, userProfile: editedProfile });
            setIsEditingProfile(false);
            fetchData();
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditingProfile(false);
        setEditedProfile({});
    };

    // Show loading while checking auth
    if (authLoading) {
        return <LoadingScreen darkMode={darkMode} />;
    }

    // Show login if not authenticated
    if (!isAuthenticated) {
        return <Login onLogin={handleLogin} darkMode={darkMode} />;
    }

    // Show loading while fetching data
    if (loading) {
        return <LoadingScreen darkMode={darkMode} />;
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-dark-bg' : 'bg-anti-bg'} transition-colors duration-300`}>
            <Navbar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                user={user}
                onLogout={handleLogout}
            />

            <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                {activeTab === 'dashboard' && (
                    <Dashboard
                        stats={stats}
                        apis={apis}
                        usageData={usageData}
                        recentCalls={recentCalls}
                        billing={billing}
                        darkMode={darkMode}
                        onSimulateApiCall={handleSimulateApiCall}
                    />
                )}

                {activeTab === 'apis' && (
                    <ApiManagement
                        apis={apis}
                        onDelete={handleDeleteApi}
                        onShowAddModal={() => setShowAddModal(true)}
                        darkMode={darkMode}
                    />
                )}

                {activeTab === 'usage' && (
                    <UsageLogs
                        calls={recentCalls}
                        darkMode={darkMode}
                    />
                )}

                {activeTab === 'billing' && (
                    <Billing
                        billing={billing}
                        apis={apis}
                        darkMode={darkMode}
                    />
                )}

                {activeTab === 'profile' && (
                    <Profile
                        userSettings={userSettings}
                        isEditing={isEditingProfile}
                        editedProfile={editedProfile}
                        onEdit={handleEditProfile}
                        onSave={handleSaveProfile}
                        onCancel={handleCancelEdit}
                        onChange={setEditedProfile}
                        darkMode={darkMode}
                    />
                )}
            </main>

            {/* Add Service Modal */}
            <AddServiceModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAdd={handleAddApi}
                darkMode={darkMode}
            />
        </div>
    );
}

export default App;
