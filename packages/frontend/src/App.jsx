import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import OverviewPage from './pages/OverviewPage';
import WorkspacePage from './pages/WorkspacePage';
import RivalsPage from './pages/RivalsPage';
import AlertsPage from './pages/AlertsPage';
import SelfHealPage from './pages/SelfHealPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Full-screen Standalone Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Dashboard Routes Wrapped in MainLayout */}
        <Route path="/" element={<MainLayout><OverviewPage /></MainLayout>} />
        <Route path="/workspace" element={<MainLayout><WorkspacePage /></MainLayout>} />
        <Route path="/rivals" element={<MainLayout><RivalsPage /></MainLayout>} />
        <Route path="/alerts" element={<MainLayout><AlertsPage /></MainLayout>} />
        <Route path="/self-heal" element={<MainLayout><SelfHealPage /></MainLayout>} />
        <Route path="/settings" element={<MainLayout><SettingsPage /></MainLayout>} />
        
        {/* Fallback route */}
        <Route path="*" element={<MainLayout><OverviewPage /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
