"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Crosshair,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  "Company profile",
  "Competitors",
  "Monitoring scope",
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [step, setStep] = useState(0);

  const canContinue = companyName.trim().length > 0;

 function handleContinue() {
  if (step === 0 && !canContinue) return;

  if (step === steps.length - 1) {
    navigate("/dashboard");
    return;
  }

  setStep((current) => current + 1);
}

  function handleBack() {
    setStep((current) => Math.max(current - 1, 0));
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#030912] text-slate-100">
      <div className="mx-auto min-h-screen max-w-[1540px] px-6 py-8 md:px-12 md:py-11">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[#32d4d0] text-[#031014] shadow-[0_0_30px_rgba(50,212,208,0.2)]">
              <Crosshair className="size-6" />
            </div>

            <span className="font-mono text-sm font-bold tracking-[0.22em] text-slate-200">
              RIVALSCOPE
            </span>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
            Setup protocol&nbsp; / &nbsp;03 steps
          </span>
        </header>

        {/* Main content */}
        <div className="mt-16 grid gap-14 lg:grid-cols-[0.82fr_1fr] lg:items-start lg:gap-20 xl:mt-20 xl:grid-cols-[0.78fr_1fr]">
          {/* Intro panel */}
          <section className="max-w-xl pt-2">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#32d4d0]">
              <Sparkles className="size-4" />
              Configure your intelligence layer
            </div>

            <h1 className="mt-7 max-w-xl text-balance text-5xl font-semibold leading-[1.08] tracking-tight text-slate-100 md:text-6xl">
              Start with a sharper
              <br />
              view of the market.
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-slate-500">
              Set the context Rivalscope needs to watch meaningful changes
              without creating another noisy dashboard.
            </p>

            <div className="mt-12 flex flex-col gap-5">
              {steps.map((item, index) => {
                const active = index === step;
                const completed = index < step;

                return (
                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >
                    <div
                      className={[
                        "flex size-9 items-center justify-center rounded-full border font-mono text-[10px] transition-colors",
                        active || completed
                          ? "border-[#32d4d0] bg-[#32d4d0] text-[#031014]"
                          : "border-slate-800 text-slate-500",
                      ].join(" ")}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <span
                      className={[
                        "text-sm transition-colors",
                        active
                          ? "font-medium text-slate-200"
                          : "text-slate-500",
                      ].join(" ")}
                    >
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Form card */}
          <section className="rounded-[28px] border border-slate-800/90 bg-[#09131f] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.2)] md:p-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#32d4d0]">
                  Step {String(step + 1).padStart(2, "0")}
                </p>

                <h2 className="mt-4 text-2xl font-semibold text-slate-200">
                  {steps[step]}
                </h2>
              </div>

              <div className="flex size-12 items-center justify-center rounded-full bg-slate-800/60 text-slate-500">
                <ShieldCheck className="size-5" />
              </div>
            </div>

            {step === 0 && (
              <div className="mt-12">
                <label
                  htmlFor="company-name"
                  className="text-sm font-medium text-slate-300"
                >
                  Company or product name
                </label>

                <input
                  id="company-name"
                  type="text"
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                  placeholder="e.g. Northstar AI"
                  autoFocus
                  className="mt-3 h-16 w-full rounded-2xl border-2 border-[#32d4d0] bg-[#07101a] px-5 text-base text-slate-100 outline-none transition placeholder:text-slate-600 focus:shadow-[0_0_0_4px_rgba(50,212,208,0.1)]"
                />

                <p className="mt-3 text-sm text-slate-500">
                  This appears in alert subjects and workspace reports.
                </p>
              </div>
            )}

            {step === 1 && (
              <div className="mt-12">
                <label
                  htmlFor="competitors"
                  className="text-sm font-medium text-slate-300"
                >
                  Competitor websites
                </label>

                <textarea
                  id="competitors"
                  rows={4}
                  placeholder={"oxylabs.io\napify.com\nfirecrawl.dev"}
                  className="mt-3 w-full resize-none rounded-2xl border-2 border-[#32d4d0] bg-[#07101a] px-5 py-4 text-base text-slate-100 outline-none placeholder:text-slate-600 focus:shadow-[0_0_0_4px_rgba(50,212,208,0.1)]"
                />

                <p className="mt-3 text-sm text-slate-500">
                  Add one competitor domain per line.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="mt-12">
                <p className="text-sm font-medium text-slate-300">
                  Monitoring scope
                </p>

                <div className="mt-4 grid gap-3">
                  {["Pricing changes", "Changelogs", "Positioning copy"].map(
                    (item) => (
                      <label
                        key={item}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-800 bg-[#07101a] px-4 py-4 text-sm text-slate-300 hover:border-[#32d4d0]/60"
                      >
                        <input
                          type="checkbox"
                          defaultChecked
                          className="size-4 accent-[#32d4d0]"
                        />
                        {item}
                      </label>
                    ),
                  )}
                </div>
              </div>
            )}

            <div className="mt-11 h-px bg-slate-800" />

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className="flex items-center gap-2 rounded-xl px-1 py-3 text-sm text-slate-500 transition hover:text-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="size-4" />
                Back
              </button>

              <button
                type="button"
                onClick={handleContinue}
                disabled={step === 0 && !canContinue}
                className="flex items-center gap-3 rounded-2xl bg-[#1e777b] px-5 py-3.5 text-sm font-medium text-[#021012] transition hover:bg-[#32d4d0] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step === steps.length - 1 ? "Launch workspace" : "Continue"}
                <ArrowRight className="size-4" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}