"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  Globe2,
  LockKeyhole,
  Mail,
  Radar,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!email) {
      setMessage("Enter your email address to continue.");
      return;
    }

    setLoading(true);
    setMessage("");

   window.setTimeout(() => {
  setLoading(false);
  navigate("/onboarding");
}, 1200);
  }

  return (
    <main className="min-h-screen bg-[#050a12] text-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        {/* Brand panel */}
        <section className="relative hidden overflow-hidden border-r border-slate-800 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_80%_85%,rgba(14,165,233,0.08),transparent_28%)]" />

          <div className="relative flex w-full flex-col justify-between p-10 xl:p-16">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-300 text-slate-950 shadow-[0_0_30px_rgba(103,232,249,0.22)]">
                <Radar className="size-5" />
              </div>

              <span className="font-mono text-sm font-bold tracking-[0.22em]">
                RIVALSCOPE
              </span>
            </div>

            <div className="max-w-xl">
              <p className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-300">
                <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_currentColor]" />
                Competitive intelligence
              </p>

              <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight xl:text-7xl">
                See the move
                <br />
                before it matters.
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
                Monitor competitor pricing, changelogs, and positioning with a
                calm, high-signal intelligence layer.
              </p>

              <div className="mt-10 grid max-w-md gap-4">
                <Feature
                  icon={<Check />}
                  title="Meaningful changes only"
                  detail="LLM summaries remove the noise."
                />

                <Feature
                  icon={<ShieldCheck />}
                  title="Self-healing monitoring"
                  detail="Broken selectors recover automatically."
                />

                <Feature
                  icon={<LockKeyhole />}
                  title="Private by default"
                  detail="Your workspace stays protected."
                />
              </div>
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
              Intelligence infrastructure for decisive teams
            </p>
          </div>
        </section>

        {/* Login panel */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-300 text-slate-950">
                <Radar className="size-5" />
              </div>

              <span className="font-mono text-sm font-bold tracking-[0.22em]">
                RIVALSCOPE
              </span>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-cyan-950/10 backdrop-blur sm:p-8">
              <div className="mb-8">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300">
                  Secure workspace access
                </p>

                <h2 className="text-3xl font-semibold tracking-tight">
                  Welcome back
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Sign in to continue monitoring your competitive surface.
                </p>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium transition hover:border-cyan-300/40 hover:bg-slate-800"
              >
                <Globe2 className="size-4 text-cyan-300" />
                Continue with Google
              </button>

              <div className="my-7 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-800" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
                  Or continue with email
                </span>
                <div className="h-px flex-1 bg-slate-800" />
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                    Work email
                  </span>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-3 transition focus-within:border-cyan-300/60">
                    <Mail className="size-4 text-slate-500" />

                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@company.com"
                      autoComplete="email"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
                    />
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Sending secure link..." : "Send secure link"}
                  {!loading && <ArrowRight className="size-4" />}
                </button>

                {message && (
                  <p
                    role="status"
                    className="rounded-xl border border-cyan-300/20 bg-cyan-300/5 px-3 py-3 text-xs leading-5 text-cyan-200"
                  >
                    {message}
                  </p>
                )}
              </form>

              <p className="mt-7 text-center text-xs leading-5 text-slate-500">
                By continuing, you agree to the Rivalscope terms and privacy
                policy.
              </p>
            </div>

            <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-slate-600">
              Protected by encrypted session management
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Feature({ icon, title, detail }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-8 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 [&>svg]:size-4">
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium text-slate-200">{title}</p>
        <p className="mt-1 text-xs text-slate-500">{detail}</p>
      </div>
    </div>
  );
}