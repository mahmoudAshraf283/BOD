import React from 'react'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { AppProvider } from './contexts/AppContext.jsx'
import { NotificationProvider } from './contexts/NotificationContext.jsx'
import AppContent from './components/AppContent'
import './App.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </AppProvider>
    </AuthProvider>
  )
}

export default App
