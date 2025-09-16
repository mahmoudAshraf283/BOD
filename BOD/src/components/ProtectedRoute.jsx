import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { ProgressSpinner } from 'primereact/progressspinner';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex align-items-center justify-content-center">
                <div className="text-center">
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} />
                    <p className="mt-3 text-600">Loading...</p>
                </div>
            </div>
        );
    }

    // If not authenticated, the AuthContext will redirect to login
    // This component only renders children when user is authenticated
    return user ? children : null;
};

export default ProtectedRoute;