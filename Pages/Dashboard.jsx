import { useState } from "react";
import Layout from "../components/Layout";

const PROGRAMS = [
  { name: "Aerospace Avionics Suite", status: "Green",  health: 92, owner: "Riya Sharma",  site: "Chennai",   progress: 87 },
  { name: "EV Battery Module NPI",    status: "Yellow", health: 67, owner: "Arjun Nair",   site: "Pune",      progress: 54 },
  { name: "Medical Device Rev C",     status: "Red",    health: 34, owner: "Priya Menon",  site: "Hyderabad", progress: 21 },
  { name: "Defense Comms Unit",       status: "Green",  health: 88, owner: "Vikram Singh", site: "Bangalore", progress: 79 },
];

const ALERTS = [
  { text: "Shipment SH-44204 — Exception alert",          type: "danger" },
  { text: "NCR-8821 Critical open for 5 days",            type: "danger" },
  { text: "PO-77002 lead time risk — supplier delay",     type: "warning" },
  { text: "ECO-1142 pending approval for 3 days",         type: "warning" },
  { text: "IATF certification expires in 28 days",        type: "info" },
  { text: "EV Battery yield trending below 90%",          type: "warning" },
];

const BAR_DATA = [85, 88, 82, 90, 87, 91, 94, 89, 92, 91, 95, 91];

function ProgressBar({ value, color }) {
  const c = color || (value > 75 ? "var(--emerald)" : value > 50 ? "var(--amber)" : "var(--rose)");
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${value}%`, background: c }} />
    </div>
  );
}

function StatCard({ label, value, delta, icon, color, bg, delay }) {
  return (
    <div className="stat-card" style={{ animationDelay: delay || "0s" }}>
      <div className="stat-card-icon" style={{ background: bg || "rgba(37,99,235,0.12)", color: color }}>
        {icon}
      </div>
      <div className="stat-card-label">{label}</div>
      <div className="stat-card-value">{value}</div>
      {delta && (
        <div className={`stat-card-delta ${delta.startsWith("+") ? "delta-up" : "delta-down"}`}>
          {delta.startsWith("+") ? "▲" : "▼"} {delta} vs last week
        </div>
      )}
    </div>
  );
}

function Dashboard() {
  const [alertFilter, setAlertFilter] = useState("all");

  const filteredAlerts = alertFilter === "all"
    ? ALERTS
    : ALERTS.filter(a => a.type === alertFilter);

  return (
    <Layout>
      {/* Welcome banner */}
      <div className="notif-banner">
        <span>👋</span>
        <span>Welcome back, <strong>Admin</strong>. You have <strong>6 active alerts</strong> and <strong>2 critical NCRs</strong> requiring attention.</span>
      </div>

      <div className="page-header">
        <h2>Executive Dashboard</h2>
        <p>Real-time overview across all programs, production, quality and logistics</p>
      </div>

      {/* Stat cards */}
      <div className="grid-4 stagger mb-5">
        <StatCard label="Active Programs"   value="4"    delta="+1"  icon="⬡" color="var(--blue-bright)"  bg="rgba(37,99,235,0.12)"   delay="0s" />
        <StatCard label="On-Time Delivery"  value="91%"  delta="+3%" icon="✦" color="var(--emerald)"      bg="rgba(16,185,129,0.12)"  delay="0.05s" />
        <StatCard label="Open NCRs"         value="2"    delta="-1"  icon="⚠" color="var(--rose)"         bg="rgba(244,63,94,0.12)"   delay="0.1s" />
        <StatCard label="Shipments Active"  value="1"               icon="🚚" color="var(--cyan)"         bg="rgba(6,182,212,0.12)"   delay="0.15s" />
      </div>

      <div className="grid-2-1 mb-5">
        {/* Program portfolio */}
        <div className="card">
          <div className="flex-between mb-4">
            <div>
              <div className="fw-700" style={{ fontSize: 15, fontFamily: "var(--font-head)", color: "var(--text)" }}>Program Portfolio</div>
              <div className="fs-12 text-muted" style={{ marginTop: 2 }}>Health snapshot — all active programs</div>
            </div>
            <button className="btn btn-outline btn-sm">+ New Program</button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {PROGRAMS.map(p => (
              <div key={p.name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div className="flex-between">
                  <div>
                    <span className="fw-600" style={{ fontSize: 13 }}>{p.name}</span>
                    <span className="text-muted fs-12" style={{ marginLeft: 8 }}>{p.site} · {p.owner}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`badge badge-${p.status === "Green" ? "green" : p.status === "Yellow" ? "yellow" : "red"}`}>{p.status}</span>
                    <span className="mono text-muted" style={{ fontSize: 11, minWidth: 36 }}>{p.health}%</span>
                  </div>
                </div>
                <ProgressBar value={p.progress}
                  color={p.status === "Green" ? "var(--emerald)" : p.status === "Yellow" ? "var(--amber)" : "var(--rose)"} />
              </div>
            ))}
          </div>
        </div>

        {/* Alerts panel */}
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div className="flex-between mb-4">
            <div className="fw-700" style={{ fontSize: 15 }}>Alerts</div>
            <div style={{ display: "flex", gap: 4 }}>
              {["all", "danger", "warning", "info"].map(f => (
                <button
                  key={f}
                  onClick={() => setAlertFilter(f)}
                  className={`btn btn-xs ${alertFilter === f ? "btn-primary" : "btn-ghost"}`}
                >{f}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filteredAlerts.map((a, i) => (
              <div key={i} className={`alert alert-${a.type}`}>
                <span>{a.type === "danger" ? "🔴" : a.type === "warning" ? "🟡" : "🔵"}</span>
                <span style={{ fontSize: 12 }}>{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OTD chart + KPIs */}
      <div className="grid-2 mb-5">
        <div className="card card-accent-blue">
          <div className="fw-700 mb-4" style={{ fontSize: 15 }}>On-Time Delivery — 12 Weeks</div>
          <div className="bar-chart" style={{ height: 100 }}>
            {BAR_DATA.map((v, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap: 4 }}>
                <div className="bar-col" style={{
                  height: `${(v - 78) * 14}px`,
                  background: v >= 92 ? "var(--emerald)" : v >= 88 ? "var(--blue-bright)" : "var(--amber)",
                  boxShadow: `0 0 8px ${v >= 92 ? "var(--emerald)" : "var(--blue-bright)"}44`,
                }} />
                <span className="mono text-dim" style={{ fontSize: 9 }}>W{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-accent-cyan">
          <div className="fw-700 mb-4" style={{ fontSize: 15 }}>Quality KPIs</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { k: "First Pass Yield",    v: "94.2%", color: "var(--emerald)" },
              { k: "Escaped Defects",     v: "0.08%", color: "var(--amber)" },
              { k: "Audit Findings Open", v: "3",     color: "var(--rose)" },
              { k: "SPC Alerts",          v: "2",     color: "var(--amber)" },
              { k: "Active Certs",        v: "6",     color: "var(--blue-bright)" },
              { k: "Capacity Util.",      v: "81%",   color: "var(--cyan)" },
            ].map((kpi, i, arr) => (
              <div key={kpi.k} className="flex-between" style={{
                padding: "10px 0",
                borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <span className="text-muted fs-12">{kpi.k}</span>
                <span className="mono fw-700" style={{ color: kpi.color, fontSize: 14 }}>{kpi.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
