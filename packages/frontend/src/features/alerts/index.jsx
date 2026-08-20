import  { useMemo, useState } from "react";
import {
  Bell,
  Check,
  ChevronDown,
  Mail,
  Radio,
  Send,
  SlidersHorizontal,
  Webhook,
  X,
} from "lucide-react";

// --- Mock Data ---
const alerts = [
  [
    "Price monitor · Oxylabs",
    "18 min ago",
    "Dashboard",
    "sent",
    "Major",
  ],
  [
    "Self-heal recovery · Apify",
    "42 min ago",
    "Email",
    "sent",
    "Minor",
  ],
  [
    "Weekly digest · 3 rivals",
    "Mon, 9:00 AM",
    "Email",
    "sent",
    "Minor",
  ],
  [
    "Changelog monitor · Firecrawl",
    "Sun, 4:12 PM",
    "Dashboard",
    "failed",
    "Major",
  ],
];

// --- Utility ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- Main Component ---
export default function Alerts() {
  const [channel, setChannel] = useState("All channels");
  const [severity, setSeverity] = useState("All severity");
  const [toast, setToast] = useState(false);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesChannel =
        channel === "All channels" || alert[2] === channel;

      const matchesSeverity =
        severity === "All severity" || alert[4] === severity;

      return matchesChannel && matchesSeverity;
    });
  }, [channel, severity]);

  function sendTestAlert() {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2400);
  }

  return (
    <div className="min-h-screen bg-[#030914] p-6 text-slate-300 font-sans">
      {toast && (
        <div className="fixed right-5 top-5 z-50 flex items-center gap-3 rounded-xl border border-cyan-500/30 bg-[#071224] px-4 py-3 text-sm shadow-2xl">
          <Check className="h-4 w-4 text-cyan-400" />
          <span className="text-white">Test alert queued</span>
          <button
            onClick={() => setToast(false)}
            className="ml-2 hover:opacity-70 transition-opacity"
          >
            <X className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      )}

      <div className="mx-auto max-w-6xl space-y-6">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl border border-[#16273d] bg-[#071224] px-10 py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(34,211,238,.12),transparent_40%)]" />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-400">
                DELIVERY HUB / OUTBOUND
              </p>

              <h1 className="text-5xl font-semibold tracking-tight text-white">
                Alert History
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
                Route meaningful competitive movement to the people and systems
                that act on it.
              </p>
            </div>

            <button
              onClick={sendTestAlert}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 font-medium text-black transition hover:opacity-90"
            >
              <Send size={16} />
              Send test alert
            </button>
          </div>
        </section>

        {/* METRICS */}
        <section className="grid gap-4 md:grid-cols-3">
          <Metric
            icon={<Bell />}
            label="Delivered this week"
            value="16"
            detail="94% success rate"
          />
          <Metric
            icon={<Mail />}
            label="Email summaries"
            value="09"
            detail="Last sent 18m ago"
          />
          <Metric
            icon={<Webhook />}
            label="In-app events"
            value="07"
            detail="Live routing"
          />
        </section>

        {/* DELIVERY LOG */}
        <section className="overflow-hidden rounded-3xl border border-[#16273d] bg-[#071224]">
          <div className="flex flex-col gap-4 border-b border-[#16273d] p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Delivery log
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Every notification sent by CompRadar.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <FilterSelect
                value={channel}
                onChange={setChannel}
                options={["All channels", "Email", "Dashboard"]}
              />
              <FilterSelect
                value={severity}
                onChange={setSeverity}
                options={["All severity", "Major", "Minor"]}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead>
                <tr className="border-b border-[#16273d] font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  <th className="px-6 py-5">Notification</th>
                  <th className="px-6 py-5">Sent</th>
                  <th className="px-6 py-5">Channel</th>
                  <th className="px-6 py-5">Severity</th>
                  <th className="px-6 py-5">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredAlerts.map(
                  ([label, time, alertChannel, status, alertSeverity]) => (
                    <tr
                      key={`${label}-${time}`}
                      className="border-b border-[#16273d] transition-colors hover:bg-white/[0.02] last:border-0"
                    >
                      <td className="px-6 py-5">
                        <p className="font-medium text-white">{label}</p>
                      </td>
                      <td className="px-6 py-5 font-mono text-sm text-slate-400">
                        {time}
                      </td>
                      <td className="px-6 py-5 text-slate-300">
                        {alertChannel}
                      </td>
                      <td className="px-6 py-5">
                        <SeverityBadge severity={alertSeverity} />
                      </td>
                      <td className="px-6 py-5">
                        <StatusBadge status={status} />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* SETTINGS */}
        <NotificationSettings />
      </div>
    </div>
  );
}

/* =========================
   HELPER COMPONENTS
========================= */

function FilterSelect({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-11
          appearance-none
          rounded-full
          border
          border-[#223550]
          bg-[#08172b]
          px-5
          pr-10
          text-sm
          text-white
          outline-none
          focus:border-cyan-500/50
          transition-colors
        "
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-3.5 h-4 w-4 text-slate-400" />
    </div>
  );
}

function SeverityBadge({ severity }) {
  return (
    <span
      className={cn(
        "rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-wider",
        severity === "Major"
          ? "bg-yellow-500/10 text-yellow-400"
          : "bg-blue-500/10 text-blue-300"
      )}
    >
      {severity}
    </span>
  );
}

function StatusBadge({ status }) {
  const sent = status === "sent";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest",
        sent ? "text-cyan-400" : "text-yellow-400"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          sent ? "bg-cyan-400 shadow-[0_0_8px_currentColor]" : "bg-yellow-400"
        )}
      />
      {status}
    </span>
  );
}

function Metric({ icon, label, value, detail }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#16273d] bg-[#071224] px-5 py-5 transition-all hover:border-cyan-500/30">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
        {icon}
      </div>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          {label}
        </p>

        <div className="mt-1 flex items-baseline gap-3">
          <span className="font-mono text-2xl font-semibold text-white">
            {value}
          </span>
          <span className="text-xs text-slate-500">{detail}</span>
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <section className="rounded-3xl border border-[#16273d] bg-[#071224] p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#08172b] text-slate-400">
          <SlidersHorizontal size={18} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Notification settings
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Control who receives alerts and how noisy the stream should be.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <Setting
          label="EMAIL RECIPIENTS"
          value="intel@rivalscope.dev"
          icon={<Mail size={14} />}
        />
        <Setting
          label="DASHBOARD WEBHOOK"
          value="Connected · /api/events"
          icon={<Webhook size={14} />}
        />
        <Setting
          label="MINIMUM SEVERITY"
          value="Major + self-heal"
          icon={<Radio size={14} />}
        />
      </div>
    </section>
  );
}

function Setting({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-[#16273d] bg-[#08172b] p-5 transition-all hover:border-cyan-500/30">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          {icon}
          {label}
        </span>
        <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_currentColor]" />
      </div>

      <p className="mt-6 text-lg font-medium text-white">{value}</p>

      <button
        type="button"
        className="mt-5 text-sm text-cyan-400 transition hover:text-cyan-300"
      >
        Edit routing
      </button>
    </div>
  );
}