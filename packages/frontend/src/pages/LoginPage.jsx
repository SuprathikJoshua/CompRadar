import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col lg:flex-row font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Left Branding Panel (Hidden on mobile or stacks cleanly) */}
      <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 border-b lg:border-b-0 lg:border-r border-navy-800">
        {/* Ambient Cyan Radial Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo */}
        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <Zap className="w-6 h-6 fill-cyan-400/20" />
          </div>
          <span className="font-mono font-bold tracking-wider text-xl text-slate-50 uppercase">
            COMPRADAR
          </span>
        </div>

        {/* Hero Copy */}
        <div className="my-12 lg:my-0 max-w-lg z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold mb-6 tracking-wider uppercase">
            ENTERPRISE COMMAND CENTER
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-50 leading-tight">
            See the move before it matters.
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            Continuous competitive surface extraction, automated DOM self-healing, and low-noise change intelligence for high-growth tech platforms.
          </p>

          {/* Key Product Benefits */}
          <div className="mt-8 space-y-3 font-sans text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Real-time pricing shifts & tier restructuring alerts</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>DOM Vector Tree self-healing without missing data gaps</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Structured diffs for API changelogs and positioning copy</span>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="text-xs font-mono text-slate-500 z-10">
          © 2026 CompRadar Inc. All security logs cryptographically signed.
        </div>
      </div>

      {/* Right Login Form Card */}
      <div className="lg:w-1/2 p-8 lg:p-16 flex items-center justify-center relative bg-navy-950">
        
        <div className="w-full max-w-md space-y-8 bg-navy-900/90 border border-navy-800 p-8 sm:p-10 rounded-[28px] shadow-2xl shadow-black/80">
          
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>SECURE WORKSPACE ACCESS</span>
            </div>
            <h2 className="text-2xl font-bold font-sans text-slate-50">
              Welcome back
            </h2>
            <p className="text-xs font-sans text-slate-400 mt-1">
              Enter your work email to authenticate via SSO magic link.
            </p>
          </div>

          {/* SSO Google Login Button */}
          <button
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => navigate('/'), 1000);
            }}
            className="w-full py-3 px-4 rounded-xl bg-navy-950 hover:bg-navy-850 border border-navy-800 text-xs font-sans font-semibold text-slate-200 flex items-center justify-center gap-3 transition-colors group"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.2 8.9 5 12 5z"/>
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
              <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.6 7.2C.6 9.2 0 10.5 0 12s.6 2.8 1.6 4.8l3.7-2.1z"/>
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.2-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z"/>
            </svg>
            <span>Continue with Google Workspace</span>
          </button>

          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-navy-800"></div>
            </div>
            <span className="relative px-3 bg-navy-900 text-[10px] font-mono uppercase text-slate-500">
              OR WORK EMAIL
            </span>
          </div>

          {/* Email Magic Link Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Work Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jordan@acmeintel.io"
                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-[0.99] text-navy-950 font-sans font-bold text-xs shadow-cyan-glow flex items-center justify-center gap-2 transition-all disabled:opacity-75"
            >
              {isLoading ? (
                <span>Authenticating magic link...</span>
              ) : isSuccess ? (
                <span className="text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Link sent! Redirecting...
                </span>
              ) : (
                <>
                  <span>Send secure link</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => navigate('/onboarding')}
              className="text-xs font-mono text-cyan-400 hover:underline"
            >
              Need to create a new workspace? Run onboarding protocol →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
