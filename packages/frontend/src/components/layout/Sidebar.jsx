import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Globe2,
  Bell,
  Activity,
  Settings2,
  ChevronDown,
  Radar,
} from "lucide-react";

export default function Sidebar() {
  var workspaceItems = [
    {
      name: "Overview",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Workspace",
      path: "/workspace",
      icon: BriefcaseBusiness,
    },
    {
      name: "Rivals",
      path: "/rivals",
      icon: Globe2,
      count: 3,
    },
    {
      name: "Alerts",
      path: "/alerts",
      icon: Bell,
      count: 4,
    },
  ];

  var systemItems = [
    {
      name: "Self-Heal Log",
      path: "/self-heal",
      icon: Activity,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings2,
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-slate-800 text-white flex flex-col">
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="w-10 h-10 rounded-xl bg-cyan-400 flex items-center justify-center">
          <Radar size={20} className="text-black" />
        </div>

        <h1 className="text-sm font-bold tracking-[4px]">
          COMPRADAR
        </h1>
      </div>

      {/* Workspace Selector */}
      <div className="px-4 mt-4">
        <button className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 flex justify-between items-center hover:border-cyan-400 transition">
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-widest text-slate-500">
              Workspace
            </p>

            <p className="text-sm mt-1">
              Acme Intelligence
            </p>
          </div>

          <ChevronDown size={16} />
        </button>
      </div>

      {/* Workspace Menu */}
      <div className="mt-8 px-4">
        <p className="text-[10px] uppercase tracking-[3px] text-slate-500 mb-3">
          Workspace
        </p>

        {workspaceItems.map(function (item) {
          var Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                  isActive
                    ? "bg-cyan-400 text-black"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <Icon size={18} />

              <span className="text-sm">{item.name}</span>

              {item.count && (
                <span className="ml-auto text-xs">
                  {item.count}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* System Menu */}
      <div className="mt-8 px-4">
        <p className="text-[10px] uppercase tracking-[3px] text-slate-500 mb-3">
          System
        </p>

        {systemItems.map(function (item) {
          var Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                  isActive
                    ? "bg-cyan-400 text-black"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <Icon size={18} />

              <span className="text-sm">{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Status Card */}
      <div className="mt-auto p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>

            <span className="text-[10px] uppercase tracking-widest text-cyan-300">
              All Systems Nominal
            </span>
          </div>

          <p className="mt-3 text-xs text-slate-500 leading-5">
            Monitoring 3 competitors across 9 surfaces.
          </p>
        </div>
      </div>
    </div>
  );
}