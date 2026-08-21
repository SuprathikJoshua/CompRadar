import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import LoginPage from "./features/login";
import Onboarding from "./features/onboarding";

import Overview from "./features/overview";
import Rivals from "./features/rivals";
import Alerts from "./features/alerts";
import SelfHeal from "./features/self-heal";
import Settings from "./features/settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/rivals" element={<Rivals />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/self-heal" element={<SelfHeal />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
