import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import LoadingSpinner from '../components/LoadingSpinner';
import { apiService } from '../services/apiService';
import { useApiCall } from '../hooks/useApiCall';

const Dashboard = ({ showNotification }) => {
    const [stats, setStats] = useState({
        users: 0,
        posts: 0,
        albums: 0,
        todos: 0,
        completedTodos: 0
    });
    
    const { loading, executeMultipleApiCalls } = useApiCall();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [users, posts, albums, todos] = await executeMultipleApiCalls([
                apiService.getUsers(),
                apiService.getPosts(),
                apiService.getAlbums(),
                apiService.getTodos()
            ]);

            const completedTodos = todos.filter(todo => todo.completed).length;

            setStats({
                users: users.length,
                posts: posts.length,
                albums: albums.length,
                todos: todos.length,
                completedTodos
            });
            
            showNotification('success', 'Success', 'Dashboard data loaded successfully');
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            showNotification('error', 'Error', 'Failed to load dashboard data');
        }
    };

    if (loading) {
        return <LoadingSpinner message="Loading dashboard..." />;
    }

    return (
        <div className="p-2 sm:p-4">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div className="grid mb-4">
                <div className="col-12 md:col-6 lg:col-3">
                    <Card className="bg-blue-50 border-left-3 border-blue-500">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Total Users</span>
                                <div className="text-900 font-medium text-xl">{stats.users}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-users text-blue-500 text-xl"></i>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">Active users </span>
                        <span className="text-500">in the system</span>
                    </Card>
                </div>
                
                <div className="col-12 md:col-6 lg:col-3">
                    <Card className="bg-orange-50 border-left-3 border-orange-500">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Total Posts</span>
                                <div className="text-900 font-medium text-xl">{stats.posts}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-file-edit text-orange-500 text-xl"></i>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">Published </span>
                        <span className="text-500">content pieces</span>
                    </Card>
                </div>
                
                <div className="col-12 md:col-6 lg:col-3">
                    <Card className="bg-cyan-50 border-left-3 border-cyan-500">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Total Albums</span>
                                <div className="text-900 font-medium text-xl">{stats.albums}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-images text-cyan-500 text-xl"></i>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">Photo </span>
                        <span className="text-500">collections</span>
                    </Card>
                </div>
                
                <div className="col-12 md:col-6 lg:col-3">
                    <Card className="bg-purple-50 border-left-3 border-purple-500">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Todos</span>
                                <div className="text-900 font-medium text-xl">{stats.completedTodos}/{stats.todos}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-check-square text-purple-500 text-xl"></i>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">{Math.round((stats.completedTodos / stats.todos) * 100)}% </span>
                        <span className="text-500">completion rate</span>
                    </Card>
                </div>
            </div>

            {/* Data Overview Cards */}
            <div className="grid">
                <div className="col-12">
                    <Card title="System Overview">
                        <div className="grid">
                            <div className="col-6 md:col-3">
                                <div className="text-center p-3">
                                    <div className="text-4xl font-bold text-blue-500 mb-2">{stats.users}</div>
                                    <div className="text-600 font-medium">Users</div>
                                </div>
                            </div>
                            <div className="col-6 md:col-3">
                                <div className="text-center p-3">
                                    <div className="text-4xl font-bold text-orange-500 mb-2">{stats.posts}</div>
                                    <div className="text-600 font-medium">Posts</div>
                                </div>
                            </div>
                            <div className="col-6 md:col-3">
                                <div className="text-center p-3">
                                    <div className="text-4xl font-bold text-cyan-500 mb-2">{stats.albums}</div>
                                    <div className="text-600 font-medium">Albums</div>
                                </div>
                            </div>
                            <div className="col-6 md:col-3">
                                <div className="text-center p-3">
                                    <div className="text-4xl font-bold text-purple-500 mb-2">{stats.todos}</div>
                                    <div className="text-600 font-medium">Todos</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid mt-4">
                <div className="col-12">
                    <Card title="Recent Activity">
                        <div className="flex flex-column gap-3">
                            <div className="flex align-items-center gap-3 p-3 border-round bg-blue-50">
                                <i className="pi pi-users text-blue-500 text-xl"></i>
                                <div>
                                    <div className="font-medium">System initialized with {stats.users} users</div>
                                    <div className="text-sm text-500">Data loaded from JSONPlaceholder API</div>
                                </div>
                            </div>
                            <div className="flex align-items-center gap-3 p-3 border-round bg-green-50">
                                <i className="pi pi-file-edit text-green-500 text-xl"></i>
                                <div>
                                    <div className="font-medium">{stats.posts} posts are ready for management</div>
                                    <div className="text-sm text-500">Navigate to Posts section to view and edit</div>
                                </div>
                            </div>
                            <div className="flex align-items-center gap-3 p-3 border-round bg-orange-50">
                                <i className="pi pi-check-square text-orange-500 text-xl"></i>
                                <div>
                                    <div className="font-medium">Todo completion rate: {Math.round((stats.completedTodos / stats.todos) * 100)}%</div>
                                    <div className="text-sm text-500">{stats.completedTodos} out of {stats.todos} todos completed</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
