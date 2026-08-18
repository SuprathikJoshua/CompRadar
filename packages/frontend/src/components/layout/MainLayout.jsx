import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Sidebar />

      <div className="ml-64">
        {children}
      </div>
    </div>
  );
}