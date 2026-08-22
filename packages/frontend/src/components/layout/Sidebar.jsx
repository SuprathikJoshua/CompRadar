import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Target, Bell, Wrench, Settings, ChevronDown, X, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Sidebar({ isOpen, onClose }) {
  const workspaceNav = [
    { name: 'Overview', path: '/', icon: LayoutDashboard },
    { name: 'Workspace', path: '/workspace', icon: Building2 },
    { name: 'Rivals', path: '/rivals', icon: Target, badge: '3' },
    { name: 'Alerts', path: '/alerts', icon: Bell, badge: '4' },
  ];

  const systemNav = [
    { name: 'Self-heal log', path: '/self-heal', icon: Wrench },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile dark backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer Container */}
      <aside className={cn(
        "fixed top-0 bottom-0 left-0 z-50 w-64 bg-navy-950 border-r border-navy-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0 shadow-2xl shadow-cyan-950/50" : "-translate-x-full"
      )}>
        
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-navy-800 shrink-0">
          <div className="flex items-center gap-3">
            {/* Cyan rounded-square logo icon */}
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Zap className="w-5 h-5 fill-cyan-400/20" />
            </div>
            <div>
              <span className="font-mono font-bold tracking-wider text-base text-slate-50 uppercase">
                COMPRADAR
              </span>
              <span className="block text-[10px] font-mono text-cyan-400 tracking-widest uppercase">
                INTELLIGENCE OS
              </span>
            </div>
          </div>

          {/* Mobile close button */}
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-navy-850 lg:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workspace Selector Block */}
        <div className="p-4 border-b border-navy-800/80">
          <div className="px-3 py-2.5 rounded-2xl bg-navy-900 border border-navy-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors group">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-[10px] font-mono text-indigo-400 font-bold">
                AC
              </div>
              <div className="truncate">
                <span className="text-xs font-semibold text-slate-200 block truncate group-hover:text-cyan-400 transition-colors">
                  Acme Intelligence
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  ENTERPRISE NODE
                </span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" />
          </div>
        </div>

        {/* Main Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          
          {/* Workspace Nav Section */}
          <div>
            <div className="px-3 mb-2 text-[10px] font-mono font-semibold tracking-widest text-slate-400 uppercase">
              WORKSPACE
            </div>
            <nav className="space-y-1">
              {workspaceNav.map((item) => {
                const Icon = item.icon;
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => onClose && onClose()}
                    className={({ isActive }) => cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group",
                      isActive 
                        ? "bg-cyan-500 text-navy-950 font-bold shadow-cyan-subtle" 
                        : "text-slate-400 hover:text-slate-100 hover:bg-navy-900 hover:border hover:border-navy-800"
                    )}
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <Icon className={cn(
                            "w-4 h-4 transition-colors",
                            isActive ? "text-navy-950" : "text-slate-400 group-hover:text-cyan-400"
                          )} />
                          <span className="font-sans">{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className={cn(
                            "px-2 py-0.5 rounded-md text-[10px] font-mono font-bold",
                            isActive 
                              ? "bg-navy-950 text-cyan-400" 
                              : "bg-navy-850 text-slate-400 border border-navy-800 group-hover:text-slate-200"
                          )}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* System Nav Section */}
          <div>
            <div className="px-3 mb-2 text-[10px] font-mono font-semibold tracking-widest text-slate-400 uppercase">
              SYSTEM
            </div>
            <nav className="space-y-1">
              {systemNav.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => onClose && onClose()}
                    className={({ isActive }) => cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group",
                      isActive 
                        ? "bg-cyan-500 text-navy-950 font-bold shadow-cyan-subtle" 
                        : "text-slate-400 hover:text-slate-100 hover:bg-navy-900 hover:border hover:border-navy-800"
                    )}
                  >
                    {({ isActive }) => (
                      <div className="flex items-center gap-3">
                        <Icon className={cn(
                          "w-4 h-4 transition-colors",
                          isActive ? "text-navy-950" : "text-slate-400 group-hover:text-cyan-400"
                        )} />
                        <span className="font-sans">{item.name}</span>
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom System Status Card */}
        <div className="p-4 border-t border-navy-800 shrink-0">
          <div className="p-3.5 rounded-2xl bg-navy-900/90 border border-navy-800">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
              </span>
              <span className="text-xs font-mono font-semibold text-cyan-400 tracking-wide">
                All systems nominal
              </span>
            </div>
            <p className="text-[11px] font-sans text-slate-400 leading-relaxed">
              Monitoring 3 competitors across 9 surfaces.
            </p>
          </div>
        </div>

      </aside>
    </>
  );
}
