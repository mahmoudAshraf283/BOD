import React, { useState, useRef } from 'react'
import SidebarComponent from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Posts from './pages/Posts'
import Albums from './pages/Albums'
import Todos from './pages/Todos'
import NotificationSystem from './components/NotificationSystem'
import './App.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

function App() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const toast = useRef(null);

  const showNotification = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail });
  };

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  const handleMenuToggle = () => {
    setMobileMenuVisible(true);
  };

  const handleMobileMenuHide = () => {
    setMobileMenuVisible(false);
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'users':
        return <Users showNotification={showNotification} />;
      case 'posts':
        return <Posts showNotification={showNotification} />;
      case 'albums':
        return <Albums showNotification={showNotification} />;
      case 'todos':
        return <Todos showNotification={showNotification} />;
      default:
        return <Dashboard showNotification={showNotification} />;
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
      <NotificationSystem toastRef={toast} />
    </div>
  )
}

export default App
