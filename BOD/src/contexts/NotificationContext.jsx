import React, { createContext, useContext, useRef } from 'react';

// Create notification context
const NotificationContext = createContext();

// Notification provider component
export const NotificationProvider = ({ children }) => {
    const toastRef = useRef(null);

    // Show notification function
    const showNotification = (severity, summary, detail, life = 3000) => {
        if (toastRef.current) {
            toastRef.current.show({
                severity: severity, // success, info, warn, error
                summary: summary,
                detail: detail,
                life: life
            });
        }
    };

    // Specific notification methods for better UX
    const showSuccess = (summary, detail = '') => {
        showNotification('success', summary, detail);
    };

    const showError = (summary, detail = '') => {
        showNotification('error', summary, detail);
    };

    const showInfo = (summary, detail = '') => {
        showNotification('info', summary, detail);
    };

    const showWarning = (summary, detail = '') => {
        showNotification('warn', summary, detail);
    };

    // Clear all notifications
    const clearNotifications = () => {
        if (toastRef.current) {
            toastRef.current.clear();
        }
    };

    const contextValue = {
        toastRef,
        showNotification,
        showSuccess,
        showError,
        showInfo,
        showWarning,
        clearNotifications
    };

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
        </NotificationContext.Provider>
    );
};

// Custom hook to use notifications
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};