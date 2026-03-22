import { useState } from "react";
import Layout from "../components/Layout";

const INITIAL = [
  { id: "NCR-8821", type: "NCR",   program: "EV Battery",    severity: "Critical", status: "Open",        date: "2026-03-18", desc: "Solder joint delamination on board rev 2", assignee: "Arjun Nair" },
  { id: "CAPA-221", type: "CAPA",  program: "Medical Device", severity: "Major",    status: "In Progress", date: "2026-03-15", desc: "5-Why analysis for yield drop — root cause pending", assignee: "Priya Menon" },
  { id: "AUD-112",  type: "Audit", program: "Aerospace",      severity: "Minor",    status: "Closed",      date: "2026-03-10", desc: "Calibration records gap Q1", assignee: "Riya Sharma" },
  { id: "NCR-8822", type: "NCR",   program: "Defense Comms",  severity: "Major",    status: "Open",        date: "2026-03-19", desc: "Dimensional out-of-spec on housing unit", assignee: "Vikram Singh" },
  { id: "CAPA-222", type: "CAPA",  program: "EV Battery",     severity: "Critical", status: "Open",        date: "2026-03-20", desc: "Repeat failure mode in cell separator film", assignee: "Arjun Nair" },
];

const SPC_DATA = [92, 94, 90, 96, 88, 91, 95, 97, 89, 93, 96, 91, 98, 94];
const UCL = 97; const LCL = 88;

function Quality() {
  const [issues, setIssues] = useState(INITIAL);
  const [tab, setTab] = useState("issues");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ id: "", type: "NCR", program: "", severity: "Major", desc: "", assignee: "" });

  const filtered = issues.filter(i =>
    filter === "All" ? true :
    filter === "Open" ? i.status !== "Closed" :
    i.type === filter
  );

  const addIssue = () => {
    if (!form.id || !form.program) return;
    setIssues(prev => [...prev, { ...form, status: "Open", date: new Date().toISOString().split("T")[0] }]);
    setShowModal(false);
    setForm({ id: "", type: "NCR", program: "", severity: "Major", desc: "", assignee: "" });
  };

  const closeIssue = id => setIssues(prev => prev.map(i => i.id === id ? { ...i, status: "Closed" } : i));

  const typeClass = t => t === "NCR" ? "badge-red" : t === "CAPA" ? "badge-yellow" : "badge-cyan";
  const sevClass  = s => s === "Critical" ? "badge-red" : s === "Major" ? "badge-yellow" : "badge-blue";
  const statClass = s => s === "Closed" ? "badge-green" : s === "In Progress" ? "badge-yellow" : "badge-red";

  const maxBar = Math.max(...SPC_DATA);
  const minBar = Math.min(...SPC_DATA);

  return (
    <Layout>
      <div className="page-header">
        <h2>Quality Management & Compliance</h2>
        <p>NCR / CAPA / Audit tracking · SPC analytics · Certification status</p>
      </div>

      <div className="grid-4 stagger mb-5">
        <div className="stat-card">
          <div className="stat-card-label">Open NCRs</div>
          <div className="stat-card-value" style={{ color: "var(--rose)" }}>
            {issues.filter(i => i.type === "NCR" && i.status === "Open").length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Active CAPAs</div>
          <div className="stat-card-value" style={{ color: "var(--amber)" }}>
            {issues.filter(i => i.type === "CAPA" && i.status !== "Closed").length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Closed This Month</div>
          <div className="stat-card-value" style={{ color: "var(--emerald)" }}>
            {issues.filter(i => i.status === "Closed").length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">First Pass Yield</div>
          <div className="stat-card-value" style={{ color: "var(--emerald)" }}>94.2%</div>
        </div>
      </div>

      <div className="tabs">
        <button className={"tab-btn" + (tab === "issues" ? " active" : "")} onClick={() => setTab("issues")}>Issues Log</button>
        <button className={"tab-btn" + (tab === "spc"    ? " active" : "")} onClick={() => setTab("spc")}>SPC Chart</button>
        <button className={"tab-btn" + (tab === "certs"  ? " active" : "")} onClick={() => setTab("certs")}>Certifications</button>
      </div>

      {tab === "issues" && (
        <>
          <div className="flex-between mb-4">
            <div className="flex items-center gap-3">
              {["All", "Open", "NCR", "CAPA", "Audit"].map(f => (
                <button key={f} className={"btn btn-xs" + (filter === f ? " btn-primary" : " btn-ghost")}
                  onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Log Issue</button>
          </div>

          <div className="card">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>ID</th><th>Type</th><th>Program</th><th>Severity</th><th>Assignee</th><th>Date</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {filtered.map(i => (
                    <tr key={i.id}>
                      <td className="mono text-accent">{i.id}</td>
                      <td><span className={`badge ${typeClass(i.type)}`}>{i.type}</span></td>
                      <td className="fw-600">{i.program}</td>
                      <td><span className={`badge ${sevClass(i.severity)}`}>{i.severity}</span></td>
                      <td className="text-muted">{i.assignee}</td>
                      <td className="mono text-muted">{i.date}</td>
                      <td><span className={`badge ${statClass(i.status)}`}>{i.status}</span></td>
                      <td>
                        {i.status !== "Closed" && (
                          <button className="btn btn-xs btn-ghost" onClick={() => closeIssue(i.id)}>Close ✓</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === "spc" && (
        <div className="card card-accent-cyan">
          <div className="fw-700 mb-1" style={{ fontSize: 15 }}>SPC Control Chart — EV Battery Yield</div>
          <div className="text-muted fs-12 mb-4">Rolling 14 observations · UCL={UCL}% · LCL={LCL}%</div>

          <div style={{ position: "relative", height: 160 }}>
            {/* UCL / LCL lines */}
            <div style={{ position: "absolute", top: `${((maxBar - UCL) / (maxBar - minBar + 4)) * 100}%`,
              left: 0, right: 0, borderTop: "1px dashed var(--rose)", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <span className="mono" style={{ fontSize: 9, color: "var(--rose)", paddingRight: 4 }}>UCL</span>
            </div>
            <div style={{ position: "absolute", bottom: `${((LCL - minBar + 4) / (maxBar - minBar + 8)) * 100}%`,
              left: 0, right: 0, borderTop: "1px dashed var(--amber)", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <span className="mono" style={{ fontSize: 9, color: "var(--amber)", paddingRight: 4 }}>LCL</span>
            </div>

            {/* Bars */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: "100%", paddingBottom: 20 }}>
              {SPC_DATA.map((v, i) => {
                const oor = v < LCL || v > UCL;
                const ht = ((v - 84) / (maxBar - 84)) * 110;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                    <span className="mono" style={{ fontSize: 9, color: oor ? "var(--rose)" : "var(--text3)" }}>{v}</span>
                    <div style={{
                      width: "100%", height: `${ht}px`, borderRadius: "4px 4px 0 0",
                      background: oor ? "var(--rose)" : v > UCL - 2 ? "var(--emerald)" : "var(--blue-bright)",
                      boxShadow: oor ? "0 0 8px var(--rose)" : "none",
                      minHeight: 4,
                      transition: "height 0.5s ease",
                    }} />
                    <span className="mono" style={{ fontSize: 9, color: "var(--text3)" }}>{i + 1}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 mt-4" style={{ flexWrap: "wrap" }}>
            {[
              { label: "Above UCL (OOC)", color: "var(--emerald)" },
              { label: "In Control", color: "var(--blue-bright)" },
              { label: "Below LCL (OOC)", color: "var(--rose)" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2" style={{ fontSize: 11, color: "var(--text2)" }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "certs" && (
        <div className="grid-3">
          {[
            { name: "IATF 16949",        status: "Active", expires: "2026-04-18", program: "All" },
            { name: "ISO 9001:2015",      status: "Active", expires: "2027-01-10", program: "All" },
            { name: "AS9100 Rev D",       status: "Active", expires: "2026-08-22", program: "Aerospace" },
            { name: "FDA 21 CFR Part 11", status: "Active", expires: "2026-11-30", program: "Medical" },
            { name: "NADCAP Heat Treat",  status: "Expiring", expires: "2026-04-02", program: "Aerospace" },
            { name: "ISO 14001",          status: "Active", expires: "2027-06-15", program: "All" },
          ].map(cert => (
            <div key={cert.name} className="card" style={{
              borderLeft: `3px solid ${cert.status === "Expiring" ? "var(--amber)" : "var(--emerald)"}`,
              animation: "fadeUp 0.4s ease both",
            }}>
              <div className="fw-700" style={{ fontSize: 14, marginBottom: 6 }}>{cert.name}</div>
              <div className="text-muted fs-12 mb-3">{cert.program}</div>
              <div className="flex-between">
                <span className={`badge ${cert.status === "Expiring" ? "badge-yellow" : "badge-green"}`}>{cert.status}</span>
                <span className="mono text-muted" style={{ fontSize: 11 }}>Exp: {cert.expires}</span>
              </div>
              {cert.status === "Expiring" && (
                <div className="alert alert-warning" style={{ marginTop: 10, fontSize: 11 }}>
                  <span>⚠</span> Renewal required soon
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Log New Issue</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Issue ID</label>
                <input placeholder="e.g. NCR-9000" value={form.id} onChange={e => setForm(p => ({ ...p, id: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                  <option>NCR</option><option>CAPA</option><option>Audit</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Program</label>
                <input placeholder="Program name" value={form.program} onChange={e => setForm(p => ({ ...p, program: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Severity</label>
                <select value={form.severity} onChange={e => setForm(p => ({ ...p, severity: e.target.value }))}>
                  <option>Critical</option><option>Major</option><option>Minor</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Assignee</label>
              <input placeholder="Assigned to" value={form.assignee} onChange={e => setForm(p => ({ ...p, assignee: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea rows={3} placeholder="Describe the issue…" value={form.desc}
                onChange={e => setForm(p => ({ ...p, desc: e.target.value }))} style={{ resize: "vertical" }} />
            </div>
            <div className="flex-end gap-3 mt-4">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={addIssue}>Log Issue</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Quality;
