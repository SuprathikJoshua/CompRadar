import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Toast from '../common/Toast';

export default function MainLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, title = 'System Alert', type = 'info') => {
    setToast({ message, title, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans">
      
      {/* Sidebar (Fixed Desktop, Drawer Mobile) */}
      <Sidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      {/* Main Content Area Offset by Sidebar width on Desktop */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        
        {/* Sticky Topbar */}
        <Topbar 
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          onTriggerToast={showToast}
        />

        {/* Centered Page Content Container */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Inject Toast Trigger Function to Children via Clone or Context if needed */}
          {React.isValidElement(children)
            ? React.cloneElement(children, { onTriggerToast: showToast })
            : children}
        </main>

        {/* Global Footer Branding */}
        <footer className="border-t border-navy-800/60 py-6 px-6 text-center text-xs font-mono text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>COMPRADAR v2.4.0 — High-Signal Intelligence Engine</span>
            </div>
            <span>Encrypted Node Session · 256-bit AES</span>
          </div>
        </footer>

      </div>

      {/* Toast Notification Container */}
      {toast && (
        <Toast 
          message={toast.message} 
          title={toast.title} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

    </div>
  );
}
