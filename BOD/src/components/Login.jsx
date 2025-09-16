import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNotification } from '../contexts/NotificationContext.jsx';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Message } from 'primereact/message';

const Login = () => {
    const { login, loading, error, clearError, mockUsers } = useAuth();
    const { showSuccess, showError } = useNotification();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({});

    // Clear error when component mounts or credentials change
    useEffect(() => {
        if (error) {
            clearError();
        }
    }, [credentials, clearError]);

    const validateForm = () => {
        const errors = {};
        
        if (!credentials.username.trim()) {
            errors.username = 'Username is required';
        }
        
        if (!credentials.password.trim()) {
            errors.password = 'Password is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            showError('Validation Error', 'Please fill in all required fields');
            return;
        }

        const result = await login(credentials.username, credentials.password);
        
        if (result.success) {
            showSuccess('Welcome!', `Logged in as ${result.user.name}`);
        } else {
            showError('Login Failed', result.error);
        }
    };

    const handleInputChange = (field, value) => {
        setCredentials(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Clear field error when user starts typing
        if (formErrors[field]) {
            setFormErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const fillDemoCredentials = (userType) => {
        const demoUser = mockUsers.find(u => u.username === userType);
        if (demoUser) {
            setCredentials({
                username: demoUser.username,
                password: demoUser.password
            });
        }
    };

    return (
        <div className="min-h-screen flex align-items-center justify-content-center bg-primary-50 px-3">
            <div className="w-full lg:w-6 xl:w-5 max-w-md lg:max-w-none">
                <Card className="shadow-8">
                    <div className="text-center mb-5">
                        <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
                        <p className="text-500">Sign in to access your dashboard</p>
                    </div>

                    {error && (
                        <Message 
                            severity="error" 
                            text={error} 
                            className="mb-4 w-full" 
                        />
                    )}

                    <form onSubmit={handleSubmit} className="p-fluid">
                        <div className="field">
                            <label htmlFor="username" className="block text-900 font-medium mb-2">
                                Username
                            </label>
                            <InputText
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                value={credentials.username}
                                onChange={(e) => handleInputChange('username', e.target.value)}
                                className={formErrors.username ? 'p-invalid' : ''}
                                disabled={loading}
                            />
                            {formErrors.username && (
                                <small className="p-error">{formErrors.username}</small>
                            )}
                        </div>

                        <div className="field">
                            <label htmlFor="password" className="block text-900 font-medium mb-2">
                                Password
                            </label>
                            <Password
                                id="password"
                                placeholder="Enter your password"
                                value={credentials.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                className={formErrors.password ? 'p-invalid' : ''}
                                disabled={loading}
                                feedback={false}
                                toggleMask
                            />
                            {formErrors.password && (
                                <small className="p-error">{formErrors.password}</small>
                            )}
                        </div>

                        <Button
                            type="submit"
                            label={loading ? 'Signing In...' : 'Sign In'}
                            className="w-full mt-4"
                            style={{ color: 'black' }}
                            disabled={loading}
                            loading={loading}
                        />
                    </form>

                    <Divider align="center" className="my-5">
                        <span className="text-500 text-sm">Demo Accounts</span>
                    </Divider>

                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <Button
                                label="Admin Demo"
                                icon="pi pi-user"
                                className="p-button-outlined w-full mb-2"
                                onClick={() => fillDemoCredentials('admin')}
                                disabled={loading}
                                size="small"
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <Button
                                label="User Demo"
                                icon="pi pi-users"
                                className="p-button-outlined w-full mb-2"
                                onClick={() => fillDemoCredentials('user')}
                                disabled={loading}
                                size="small"
                            />
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-600 text-sm">
                            <strong>Admin:</strong> admin/admin123 | <strong>User:</strong> user/user123
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;