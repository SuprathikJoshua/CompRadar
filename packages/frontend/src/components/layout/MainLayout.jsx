import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <div className="ml-64">
        <Topbar />

        <main>
          {children}
        </main>
      </div>
    </div>
  );
}