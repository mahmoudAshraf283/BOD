import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNotification } from '../contexts/NotificationContext.jsx';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { Sidebar } from 'primereact/sidebar';

const SidebarComponent = ({ activeItem, onItemClick, mobileMenuVisible, onMobileMenuHide }) => {
    const { user, logout } = useAuth();
    const { showSuccess } = useNotification();

    const sidebarItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home'
        },
        {
            id: 'users',
            label: 'Users',
            icon: 'pi pi-fw pi-users'
        },
        {
            id: 'posts',
            label: 'Posts',
            icon: 'pi pi-fw pi-file-edit'
        },
        {
            id: 'albums',
            label: 'Albums',
            icon: 'pi pi-fw pi-images'
        },
        {
            id: 'todos',
            label: 'Todos',
            icon: 'pi pi-fw pi-check-square'
        }
    ];

    const handleItemClick = (itemId) => {
        onItemClick(itemId);
        onMobileMenuHide();
    };

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

    const sidebarContent = (
        <div className="flex flex-column h-full">
            <div className="flex align-items-center justify-content-center px-4 py-4 flex-shrink-0 border-bottom-1 surface-border">
                <span className="font-bold text-2xl text-primary">BOD Dashboard</span>
            </div>
            
            <div className="overflow-y-auto flex-1">
                <ul className="list-none p-0 m-0">
                    {sidebarItems.map((item, index) => (
                        <li key={index}>
                            <a 
                                className={`p-ripple flex align-items-center cursor-pointer p-3 text-700 hover:surface-100 transition-duration-150 transition-colors w-full border-none ${
                                    activeItem === item.id ? 'bg-primary-50 text-primary-700 border-right-2 border-primary' : 'surface-ground'
                                }`}
                                onClick={() => handleItemClick(item.id)}
                                style={{ textDecoration: 'none' }}
                            >
                                <i className={`${item.icon} mr-3 text-xl`}></i>
                                <span className="font-medium">{item.label}</span>
                                <Ripple />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="mt-auto border-top-1 surface-border">
                <div className="p-3">
                    <div className="flex align-items-center gap-3 mb-3">
                        <Avatar 
                            label={getUserInitials()}
                            className="bg-primary text-white"
                            shape="circle" 
                            size="normal"
                        />
                        <div className="flex flex-column flex-1">
                            <div className="flex align-items-center gap-2">
                                <span className="font-bold text-900">{user?.name || user?.username}</span>
                                <Badge 
                                    value={user?.role} 
                                    severity={getUserRoleBadge()} 
                                    size="small"
                                />
                            </div>
                            <span className="text-sm text-600">{user?.email || `${user?.username}@example.com`}</span>
                        </div>
                    </div>
                    
                    <Button
                        label="Logout"
                        icon="pi pi-sign-out"
                        className="w-full p-button-outlined p-button-sm"
                        onClick={handleLogout}
                        style={{ color: '#000000' }}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="sidebar-desktop surface-section h-screen fixed left-0 top-0 z-1 border-right-1 surface-border select-none" style={{ width: '280px' }}>
                {sidebarContent}
            </div>

            {/* Mobile Sidebar */}
            <Sidebar 
                visible={mobileMenuVisible} 
                onHide={onMobileMenuHide}
                className="sidebar-mobile w-20rem"
                position="left"
            >
                {sidebarContent}
            </Sidebar>
        </>
    );
};

export default SidebarComponent;
