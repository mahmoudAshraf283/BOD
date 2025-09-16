import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNotification } from '../contexts/NotificationContext.jsx';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';

const Header = ({ onMenuToggle }) => {
    const { user, logout } = useAuth();
    const { showSuccess } = useNotification();

    const handleLogout = () => {
        logout();
        showSuccess('Goodbye!', 'Successfully logged out from BOD Dashboard');
    };

    const getUserInitials = () => {
        if (!user?.name) return user?.username?.charAt(0).toUpperCase() || 'U';
        const names = user.name.split(' ');
        return names.length > 1 
            ? `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase()
            : names[0].charAt(0).toUpperCase();
    };

    const getUserRoleBadge = () => {
        if (user?.role === 'admin') return 'danger';
        if (user?.role === 'user') return 'success';
        return 'info';
    };

    return (
        <header className="app-header fixed top-0 left-0 w-full bg-white border-bottom-1 surface-border z-5 lg:hidden">
            <div className="flex align-items-center justify-content-between px-3 py-2">
                <Button 
                    className="burger-menu-button p-button-text p-button-rounded"
                    onClick={onMenuToggle}
                    aria-label="Toggle menu"
                >
                    <div className="burger-icon">
                        <span className="burger-line"></span>
                        <span className="burger-line"></span>
                        <span className="burger-line"></span>
                    </div>
                </Button>
                
                <div className="flex align-items-center">
                    <span className="font-bold text-xl text-primary">BOD Dashboard</span>
                </div>
                
                <div className="flex align-items-center gap-2">
                    <div className="flex align-items-center gap-1">
                        <Avatar 
                            label={getUserInitials()}
                            className="bg-primary text-white"
                            size="small"
                            shape="circle"
                        />
                        <Badge 
                            value={user?.role} 
                            severity={getUserRoleBadge()} 
                            size="small"
                        />
                    </div>
                    <Button 
                        icon="pi pi-sign-out"
                        className="p-button-text p-button-rounded"
                        onClick={handleLogout}
                        aria-label="Logout"
                        tooltip="Logout"
                        tooltipOptions={{ position: 'bottom' }}
                        size="small"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;