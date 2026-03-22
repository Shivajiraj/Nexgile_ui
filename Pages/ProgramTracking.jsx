import { useState } from "react";
import Layout from "../components/Layout";

const INITIAL = [
  { id: 1, project: "Aerospace Avionics Suite", owner: "Riya Sharma",  status: "Green",  milestone: "Production",  site: "Chennai",   progress: 87, priority: "High" },
  { id: 2, project: "EV Battery Module NPI",    owner: "Arjun Nair",   status: "Yellow", milestone: "NPI Stage 3", site: "Pune",      progress: 54, priority: "High" },
  { id: 3, project: "Medical Device Rev C",     owner: "Priya Menon",  status: "Red",    milestone: "R&D",         site: "Hyderabad", progress: 21, priority: "Critical" },
  { id: 4, project: "Defense Comms Unit",       owner: "Vikram Singh", status: "Green",  milestone: "Qualification",site:"Bangalore", progress: 79, priority: "Medium" },
  { id: 5, project: "Industrial Robot Arm",     owner: "Sunita Rao",   status: "Yellow", milestone: "Pilot",       site: "Mumbai",    progress: 62, priority: "Medium" },
];

const PHASES = ["R&D", "NPI", "Qual", "Pilot", "Production"];

function ProgressBar({ value, color }) {
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

function ProgramTracking() {
  const [projects, setProjects] = useState(INITIAL);
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ project: "", owner: "", site: "", status: "Green", milestone: "R&D", priority: "Medium" });
  const [search, setSearch] = useState("");

  const displayed = projects
    .filter(p => filter === "All" || p.status === filter)
    .filter(p => p.project.toLowerCase().includes(search.toLowerCase()) || p.owner.toLowerCase().includes(search.toLowerCase()));

  const addProject = () => {
    if (!form.project || !form.owner) return;
    setProjects(prev => [...prev, { ...form, id: Date.now(), progress: 5 }]);
    setShowModal(false);
    setForm({ project: "", owner: "", site: "", status: "Green", milestone: "R&D", priority: "Medium" });
  };

  const statusColor = s => s === "Green" ? "badge-green" : s === "Yellow" ? "badge-yellow" : "badge-red";
  const phaseColor  = prog => prog > 75 ? "var(--emerald)" : prog > 50 ? "var(--amber)" : "var(--rose)";

  return (
    <Layout>
      <div className="page-header">
        <h2>Program & Project Tracking</h2>
        <p>R&D → NPI → Production — portfolio health and milestone overview</p>
      </div>

      {/* Stats row */}
      <div className="grid-4 stagger mb-5">
        {[
          { l: "Total Programs",  v: projects.length,                           c: "var(--blue-bright)",  bg: "rgba(37,99,235,0.12)" },
          { l: "On Track",        v: projects.filter(p=>p.status==="Green").length, c: "var(--emerald)",  bg: "rgba(16,185,129,0.12)" },
          { l: "At Risk",         v: projects.filter(p=>p.status==="Yellow").length,c: "var(--amber)",    bg: "rgba(245,158,11,0.12)" },
          { l: "Critical",        v: projects.filter(p=>p.status==="Red").length,   c: "var(--rose)",     bg: "rgba(244,63,94,0.12)" },
        ].map((s, i) => (
          <div key={s.l} className="stat-card" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="stat-card-label">{s.l}</div>
            <div className="stat-card-value" style={{ color: s.c }}>{s.v}</div>
            <div className="progress-track" style={{ marginTop: 8 }}>
              <div className="progress-fill" style={{ width: `${(s.v / projects.length) * 100}%`, background: s.c }} />
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex-between mb-4">
        <div className="flex items-center gap-3">
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text3)", fontSize: 13 }}>⌕</span>
            <input placeholder="Search projects…" value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: 220, paddingLeft: 30 }} />
          </div>

          <div className="tabs" style={{ margin: 0 }}>
            {["All", "Green", "Yellow", "Red"].map(f => (
              <button key={f} className={"tab-btn" + (filter === f ? " active" : "")}
                onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          + Add Program
        </button>
      </div>

      {/* Table */}
      <div className="card mb-5">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Owner</th>
                <th>Site</th>
                <th>Status</th>
                <th>Milestone</th>
                <th>Priority</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map(p => (
                <tr key={p.id}>
                  <td className="fw-600">{p.project}</td>
                  <td className="text-muted">{p.owner}</td>
                  <td className="text-muted">{p.site}</td>
                  <td><span className={`badge ${statusColor(p.status)}`}>{p.status}</span></td>
                  <td><span className="badge badge-blue">{p.milestone}</span></td>
                  <td>
                    <span className={`badge ${p.priority === "Critical" ? "badge-red" : p.priority === "High" ? "badge-yellow" : "badge-gray"}`}>
                      {p.priority}
                    </span>
                  </td>
                  <td style={{ minWidth: 140 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1 }}>
                        <ProgressBar value={p.progress} color={phaseColor(p.progress)} />
                      </div>
                      <span className="mono text-muted" style={{ fontSize: 11, flexShrink: 0 }}>{p.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Milestone Gantt */}
      <div className="card">
        <div className="fw-700 mb-4" style={{ fontSize: 15 }}>Phase Gate Tracker</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {displayed.map(p => (
            <div key={p.id} className="flex items-center gap-4">
              <div style={{ width: 200, flexShrink: 0 }}>
                <div className="fw-600" style={{ fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.project}</div>
              </div>
              <div style={{ flex: 1, display: "flex", gap: 3 }}>
                {PHASES.map((phase, i) => {
                  const filled = p.progress > i * 20;
                  const active = PHASES.indexOf(p.milestone) === i;
                  return (
                    <div key={phase} style={{
                      flex: 1, height: 26, borderRadius: 5,
                      background: filled
                        ? (p.status === "Green" ? "var(--emerald)" : p.status === "Yellow" ? "var(--amber)" : "var(--rose)")
                        : "var(--border)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, fontWeight: 700, color: filled ? "var(--bg)" : "var(--text3)",
                      opacity: filled ? 1 : 0.4,
                      outline: active ? "2px solid var(--cyan)" : "none",
                      outlineOffset: 2,
                      transition: "all 0.3s",
                    }}>{phase}</div>
                  );
                })}
              </div>
              <span className="mono text-muted" style={{ fontSize: 10, width: 32, textAlign: "right" }}>{p.progress}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Add New Program</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Project Name</label>
                <input placeholder="e.g. Sensor Array Rev 2" value={form.project}
                  onChange={e => setForm(p => ({ ...p, project: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Owner</label>
                <input placeholder="Full name" value={form.owner}
                  onChange={e => setForm(p => ({ ...p, owner: e.target.value }))} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Site</label>
                <input placeholder="City" value={form.site}
                  onChange={e => setForm(p => ({ ...p, site: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                  <option>Green</option>
                  <option>Yellow</option>
                  <option>Red</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Milestone</label>
                <select value={form.milestone} onChange={e => setForm(p => ({ ...p, milestone: e.target.value }))}>
                  {PHASES.map(ph => <option key={ph}>{ph}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
                  <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
                </select>
              </div>
            </div>
            <div className="flex-end gap-3 mt-4">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={addProject}>Add Program</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default ProgramTracking;
