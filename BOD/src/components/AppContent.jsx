import React from 'react';
import { useApp } from '../contexts/AppContext.jsx';
import { useNotification } from '../contexts/NotificationContext.jsx';
import SidebarComponent from './Sidebar';
import Header from './Header';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Posts from '../pages/Posts';
import Albums from '../pages/Albums';
import Todos from '../pages/Todos';
import NotificationSystem from './NotificationSystem';

const AppContent = () => {
  const { activeItem, mobileMenuVisible, setActiveItem, setMobileMenu } = useApp();
  const { toastRef } = useNotification();

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  const handleMenuToggle = () => {
    setMobileMenu(true);
  };

  const handleMobileMenuHide = () => {
    setMobileMenu(false);
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'users':
        return <Users />;
      case 'posts':
        return <Posts />;
      case 'albums':
        return <Albums />;
      case 'todos':
        return <Todos />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen surface-ground">
      <Header onMenuToggle={handleMenuToggle} />
      <SidebarComponent 
        activeItem={activeItem} 
        onItemClick={handleItemClick}
        mobileMenuVisible={mobileMenuVisible}
        onMobileMenuHide={handleMobileMenuHide}
      />
      <div className="main-content">
        {renderContent()}
      </div>
      <NotificationSystem toastRef={toastRef} />
    </div>
  );
};

export default AppContent;