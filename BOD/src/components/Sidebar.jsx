import React from 'react';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { Sidebar } from 'primereact/sidebar';

const SidebarComponent = ({ activeItem, onItemClick, mobileMenuVisible, onMobileMenuHide }) => {
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
                <a className="p-ripple flex align-items-center cursor-pointer p-3 gap-2 text-700 hover:surface-100 transition-duration-150 transition-colors">
                    <Avatar 
                        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" 
                        shape="circle" 
                        size="normal"
                    />
                    <div className="flex flex-column">
                        <span className="font-bold">Admin User</span>
                        <span className="text-sm text-500">Administrator</span>
                    </div>
                    <Ripple />
                </a>
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
