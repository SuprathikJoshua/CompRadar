import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // Adjust path if needed
import Topbar from "./Topbar";   // Adjust path if needed

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area - Offset by Sidebar width (ml-64) */}
      <div className="ml-64 flex flex-col min-h-screen">
        <Topbar />
        
        {/* Page Content goes here */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}