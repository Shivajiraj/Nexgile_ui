import { useState } from "react";
import Layout from "../components/Layout";

const INIT_DOCS = [
  { id: "DOC-991", title: "BOM Rev 4 — Avionics Main Board",        type: "BOM",       version: "4.1", status: "Released",          program: "Aerospace",  date: "2026-02-10" },
  { id: "DOC-992", title: "ECO-1142 — Capacitor Substitution",       type: "ECO",       version: "1.0", status: "Pending Approval",  program: "EV Battery", date: "2026-03-15" },
  { id: "DOC-993", title: "Test Plan — Rev C Medical Sensor",        type: "Test Plan", version: "2.3", status: "Released",          program: "Medical",    date: "2026-01-20" },
  { id: "DOC-994", title: "IATF Certification Pack Q1 2026",         type: "Cert Pack", version: "1.0", status: "Released",          program: "All",        date: "2026-03-01" },
  { id: "DOC-995", title: "Drawings Spec — Housing v3",              type: "Drawing",   version: "3.0", status: "Released",          program: "Defense",    date: "2026-02-28" },
  { id: "DOC-996", title: "FAI Report — Batch 2204",                 type: "FAI",       version: "1.0", status: "Under Review",      program: "Aerospace",  date: "2026-03-18" },
];

const KB = [
  { title: "Assembly Process Guide — Line A",      category: "Process",   icon: "📋" },
  { title: "IPC-A-610 Acceptance Criteria",        category: "Standard",  icon: "📐" },
  { title: "Thermal Management SOP",               category: "SOP",       icon: "🌡" },
  { title: "New Customer Onboarding FAQ",          category: "FAQ",       icon: "❓" },
  { title: "Calibration & Gage R&R Procedure",     category: "Procedure", icon: "⚖" },
  { title: "EOL & LTB Request Process",            category: "Process",   icon: "♻" },
];

function Documents() {
  const [docs, setDocs] = useState(INIT_DOCS);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [tab, setTab] = useState("library");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ id: "", title: "", type: "BOM", version: "1.0", program: "", status: "Released" });

  const types = ["All", ...new Set(INIT_DOCS.map(d => d.type))];

  const filtered = docs
    .filter(d => typeFilter === "All" || d.type === typeFilter)
    .filter(d => d.title.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase()));

  const addDoc = () => {
    if (!form.id || !form.title) return;
    setDocs(prev => [...prev, { ...form, date: new Date().toISOString().split("T")[0] }]);
    setShowModal(false);
    setForm({ id: "", title: "", type: "BOM", version: "1.0", program: "", status: "Released" });
  };

  const statClass = s =>
    s === "Released"         ? "badge-green" :
    s === "Pending Approval" ? "badge-yellow" :
    s === "Under Review"     ? "badge-cyan"   : "badge-gray";

  const typeClass = t =>
    t === "ECO"   ? "badge-amber" : t === "BOM" ? "badge-blue" :
    t === "FAI"   ? "badge-violet": t === "Cert Pack" ? "badge-green" :
    "badge-gray";

  return (
    <Layout>
      <div className="page-header">
        <h2>Documents & Knowledge</h2>
        <p>BOMs · ECOs · Test Plans · Certifications · FAIs · Knowledge Base</p>
      </div>

      <div className="grid-4 stagger mb-5">
        <div className="stat-card">
          <div className="stat-card-label">Total Documents</div>
          <div className="stat-card-value" style={{ color: "var(--blue-bright)" }}>{docs.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Released</div>
          <div className="stat-card-value" style={{ color: "var(--emerald)" }}>
            {docs.filter(d => d.status === "Released").length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Pending Approval</div>
          <div className="stat-card-value" style={{ color: "var(--amber)" }}>
            {docs.filter(d => d.status === "Pending Approval").length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">KB Articles</div>
          <div className="stat-card-value" style={{ color: "var(--cyan)" }}>{KB.length}</div>
        </div>
      </div>

      <div className="tabs">
        <button className={"tab-btn" + (tab === "library" ? " active" : "")} onClick={() => setTab("library")}>Document Library</button>
        <button className={"tab-btn" + (tab === "kb"      ? " active" : "")} onClick={() => setTab("kb")}>Knowledge Base</button>
      </div>

      {tab === "library" && (
        <>
          <div className="flex-between mb-4" style={{ flexWrap: "wrap", gap: 10 }}>
            <div className="flex items-center gap-3" style={{ flexWrap: "wrap" }}>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text3)", fontSize: 13 }}>⌕</span>
                <input placeholder="Search documents…" value={search}
                  onChange={e => setSearch(e.target.value)} style={{ width: 220, paddingLeft: 30 }} />
              </div>
              <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
                {types.map(t => (
                  <button key={t} className={`btn btn-xs ${typeFilter === t ? "btn-primary" : "btn-ghost"}`}
                    onClick={() => setTypeFilter(t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-ghost btn-sm">⬇ Bulk Export</button>
              <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Upload</button>
            </div>
          </div>

          <div className="card">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>ID</th><th>Title</th><th>Type</th><th>Ver.</th><th>Program</th><th>Date</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filtered.map(d => (
                    <tr key={d.id}>
                      <td className="mono text-accent">{d.id}</td>
                      <td className="fw-600" style={{ maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis" }}>{d.title}</td>
                      <td><span className={`badge ${typeClass(d.type)}`}>{d.type}</span></td>
                      <td className="mono text-muted">v{d.version}</td>
                      <td className="text-muted">{d.program}</td>
                      <td className="mono text-muted">{d.date}</td>
                      <td><span className={`badge ${statClass(d.status)}`}>{d.status}</span></td>
                      <td>
                        <div className="flex gap-2">
                          <button className="btn btn-xs btn-ghost">View</button>
                          <button className="btn btn-xs btn-ghost">⬇</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === "kb" && (
        <div className="grid-3">
          {KB.map((kb, i) => (
            <div key={kb.title} className="card" style={{
              animation: `fadeUp 0.4s ease ${i * 0.05}s both`,
              cursor: "pointer",
              transition: "border-color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--blue)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{kb.icon}</div>
              <div style={{
                fontSize: 9, fontWeight: 700, color: "var(--blue-bright)",
                textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 6,
              }}>{kb.category}</div>
              <div className="fw-600" style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>{kb.title}</div>
              <button className="btn btn-ghost btn-sm" style={{ width: "100%" }}>Open Article →</button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Upload Document</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Document ID</label>
                <input placeholder="DOC-XXXX" value={form.id} onChange={e => setForm(p => ({ ...p, id: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                  {["BOM","ECO","Test Plan","Drawing","Cert Pack","FAI","SOP"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Title</label>
              <input placeholder="Document title" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Version</label>
                <input placeholder="1.0" value={form.version} onChange={e => setForm(p => ({ ...p, version: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Program</label>
                <input placeholder="Program name" value={form.program} onChange={e => setForm(p => ({ ...p, program: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                <option>Released</option><option>Pending Approval</option><option>Under Review</option><option>Draft</option>
              </select>
            </div>
            <div className="flex-end gap-3 mt-4">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={addDoc}>Upload Document</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Documents;
