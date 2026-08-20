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
  // Helper function to keep our Tailwind classes clean for every link
  const navLinkClass = ({ isActive }) => 
    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${ 
      isActive 
        ? "bg-cyan-400/10 text-cyan-400" 
        : "text-slate-400 hover:bg-slate-900 hover:text-white" 
    }`;

  return ( 
    <div className="fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-slate-800 text-white flex flex-col z-50"> 
       
      {/* Logo */} 
      <div className="flex items-center gap-3 px-5 py-6"> 
        <div className="w-10 h-10 rounded-xl bg-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.2)]"> 
          <Radar size={20} className="text-black" /> 
        </div> 
        <h1 className="text-sm font-bold tracking-[4px]">COMPRADAR</h1> 
      </div> 

      {/* Workspace Selector */} 
      <div className="px-4 mt-2"> 
        <button className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 flex justify-between items-center hover:border-cyan-400/50 transition-colors group"> 
          <div className="text-left"> 
            <p className="text-[10px] uppercase tracking-widest text-slate-500 group-hover:text-cyan-400 transition-colors"> 
              Workspace 
            </p> 
            <p className="text-sm mt-1 font-medium">Acme Intelligence</p> 
          </div> 
          <ChevronDown size={16} className="text-slate-400" /> 
        </button> 
      </div> 

      {/* Workspace Menu */} 
      <div className="mt-8 px-4 flex-1"> 
        <p className="text-[10px] uppercase tracking-[3px] text-slate-500 mb-3 ml-2"> 
          Menu 
        </p> 
        
        <div className="flex flex-col gap-1">
          {/* Explicit Links Instead of Array Mapping */}
          <NavLink to="/" className={navLinkClass}> 
            <LayoutDashboard size={18} /> 
            <span className="text-sm font-medium">Overview</span> 
          </NavLink> 

          <NavLink to="/onboarding" className={navLinkClass}> 
            <BriefcaseBusiness size={18} /> 
            <span className="text-sm font-medium">Onboarding</span> 
          </NavLink>

          <NavLink to="/rivals" className={navLinkClass}> 
            <Globe2 size={18} /> 
            <span className="text-sm font-medium">Rivals</span> 
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-slate-300"> 
              3 
            </span> 
          </NavLink> 

          <NavLink to="/alerts" className={navLinkClass}> 
            <Bell size={18} /> 
            <span className="text-sm font-medium">Alerts</span> 
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-slate-300"> 
              4 
            </span> 
          </NavLink> 
        </div>

        {/* System Menu */} 
        <p className="text-[10px] uppercase tracking-[3px] text-slate-500 mb-3 ml-2 mt-8"> 
          System 
        </p> 
        
        <div className="flex flex-col gap-1">
          <NavLink to="/self-heal" className={navLinkClass}> 
            <Activity size={18} /> 
            <span className="text-sm font-medium">Self-Heal Log</span> 
          </NavLink> 

          <NavLink to="/settings" className={navLinkClass}> 
            <Settings2 size={18} /> 
            <span className="text-sm font-medium">Settings</span> 
          </NavLink> 
        </div>
      </div> 

      {/* Bottom Status Card */} 
      <div className="p-4 mt-auto"> 
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4"> 
          <div className="flex items-center gap-2"> 
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div> 
            <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-semibold"> 
              All Systems Nominal 
            </span> 
          </div> 
          <p className="mt-2 text-xs text-slate-400 leading-relaxed"> 
            Monitoring 3 competitors across 9 surfaces. 
          </p> 
        </div> 
      </div> 
    </div> 
  ); 
}