import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Overview from "./features/overview";
import Workspace from "./features/workspace";
import Rivals from "./features/rivals";
import Alerts from "./features/alerts";
import SelfHeal from "./features/self-heal";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Overview />} />

          <Route
            path="/workspace"
            element={<Workspace />}
          />

          <Route
            path="/rivals"
            element={<Rivals />}
          />

          <Route
            path="/alerts"
            element={<Alerts />}
          />

          <Route
            path="/self-heal"
            element={<SelfHeal />}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;