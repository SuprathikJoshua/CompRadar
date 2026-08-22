import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Settings, 
  ChevronDown, 
  Menu,
  User,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';

export default function Topbar({ onToggleMobileMenu, onTriggerToast }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [hasUnreadAlerts, setHasUnreadAlerts] = useState(true);

  // Generate route title & eyebrow based on location
  const getPageInfo = () => {
    switch (location.pathname) {
      case '/workspace':
        return { eyebrow: 'COMMAND CENTER / WORKSPACE', title: 'Strategy & Context' };
      case '/rivals':
        return { eyebrow: 'TARGET REGISTRY / ACTIVE', title: 'Monitored Competitors' };
      case '/alerts':
        return { eyebrow: 'DELIVERY HUB / OUTBOUND', title: 'Alert History' };
      case '/self-heal':
        return { eyebrow: 'SYSTEM / SELF-HEAL LOG', title: 'Self-Heal Inspector' };
      case '/settings':
        return { eyebrow: 'SYSTEM / CONFIGURATION', title: 'Platform Settings' };
      default:
        return { eyebrow: 'COMMAND CENTER / OVERVIEW', title: 'Live Monitoring' };
    }
  };

  const pageInfo = getPageInfo();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onTriggerToast) {
      onTriggerToast(`Searching for "${searchQuery}" across monitored surfaces...`);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-navy-950/85 backdrop-blur-md border-b border-navy-800 px-4 sm:px-6 flex items-center justify-between transition-all">
      
      {/* Left: Mobile Toggle & Page Eyebrow */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-navy-850 border border-navy-800 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="text-[10px] font-mono font-semibold tracking-wider text-cyan-400 uppercase">
            {pageInfo.eyebrow}
          </div>
          <div className="text-xs font-semibold text-slate-200 hidden sm:block">
            {pageInfo.title}
          </div>
        </div>
      </div>

      {/* Center: Search Field */}
      <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search changes, rivals..."
            className="w-full pl-10 pr-10 py-1.5 rounded-xl bg-navy-900 border border-navy-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-sans"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-navy-800 border border-navy-700 text-[10px] font-mono text-slate-400">
            /
          </kbd>
        </div>
      </form>

      {/* Right: Quick Controls & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Notification Bell */}
        <button
          onClick={() => {
            setHasUnreadAlerts(false);
            navigate('/alerts');
          }}
          className="relative p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-navy-850 border border-navy-800 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {hasUnreadAlerts && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-navy-950" />
          )}
        </button>

        {/* Settings Icon Button */}
        <button
          onClick={() => navigate('/settings')}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-navy-850 border border-navy-800 transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Vertical Divider */}
        <div className="h-6 w-[1px] bg-navy-800 mx-1" />

        {/* User Profile Block */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1.5 pl-2 rounded-xl hover:bg-navy-850 border border-transparent hover:border-navy-800 transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              JD
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                Jordan Davis
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase">
                Admin
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-navy-900 border border-navy-800 shadow-2xl shadow-black/80 py-2 z-50 animate-in fade-in duration-150">
              <div className="px-4 py-2 border-b border-navy-800 sm:hidden">
                <p className="text-xs font-semibold text-slate-200">Jordan Davis</p>
                <p className="text-[10px] font-mono text-slate-500">Admin</p>
              </div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate('/workspace');
                }}
                className="w-full text-left px-4 py-2 text-xs font-sans text-slate-300 hover:text-cyan-400 hover:bg-navy-850 flex items-center gap-2.5 transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Workspace Profile</span>
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate('/settings');
                }}
                className="w-full text-left px-4 py-2 text-xs font-sans text-slate-300 hover:text-cyan-400 hover:bg-navy-850 flex items-center gap-2.5 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Preferences</span>
              </button>

              <div className="h-[1px] bg-navy-800 my-1" />

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate('/login');
                }}
                className="w-full text-left px-4 py-2 text-xs font-sans text-orange-400 hover:bg-navy-850 flex items-center gap-2.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}
