import { useState } from "react";
import Layout from "../components/Layout";

const INIT_RMA = [
  { id: "RMA-3301", customer: "AeroTech GmbH",  reason: "Functional Failure",  status: "Diagnostics", received: "2026-03-14", unit: "AVI-Board-v4" },
  { id: "RMA-3302", customer: "Volta Motors",    reason: "Cosmetic Damage",     status: "Quote Sent",  received: "2026-03-17", unit: "EV-Cell-Pack" },
  { id: "RMA-3303", customer: "MediCore Inc",    reason: "Warranty Claim",      status: "Repaired",    received: "2026-03-10", unit: "MED-Sensor-A" },
  { id: "RMA-3304", customer: "StratDef Ltd",    reason: "Out-of-Spec Output",  status: "Open",        received: "2026-03-20", unit: "COMM-PCB-v2" },
];

const SPARE_PARTS = [
  { sku: "SP-PS200", name: "Power Supply PS-200",       stock: 14, price: "$320" },
  { sku: "SP-DPA10", name: "Display Panel Assembly",    stock: 3,  price: "$510" },
  { sku: "SP-TIP50", name: "Thermal Interface Pad",     stock: 82, price: "$12" },
  { sku: "SP-FAN60", name: "Fan Assembly 60mm",         stock: 0,  price: "$48" },
  { sku: "SP-MPCB2", name: "Main Control PCB Rev 2",    stock: 5,  price: "$1,240" },
  { sku: "SP-CHK3",  name: "Cable Harness Kit",         stock: 28, price: "$95" },
];

function Service() {
  const [rmas, setRmas] = useState(INIT_RMA);
  const [tab, setTab] = useState("rma");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ id: "", customer: "", reason: "", unit: "", status: "Open" });

  const addRMA = () => {
    if (!form.id || !form.customer) return;
    setRmas(prev => [...prev, { ...form, received: new Date().toISOString().split("T")[0] }]);
    setShowModal(false);
    setForm({ id: "", customer: "", reason: "", unit: "", status: "Open" });
  };

  const updateStatus = (id, status) => setRmas(prev => prev.map(r => r.id === id ? { ...r, status } : r));

  const statClass = s =>
    s === "Repaired"   ? "badge-green" :
    s === "Diagnostics"? "badge-cyan"  :
    s === "Quote Sent" ? "badge-yellow":
    "badge-red";

  return (
    <Layout>
      <div className="page-header">
        <h2>After-Sales & Service</h2>
        <p>RMA intake · Repair workflow · Warranty claims · Spare parts catalog</p>
      </div>

      <div className="grid-4 stagger mb-5">
        <div className="stat-card">
          <div className="stat-card-label">Open RMAs</div>
          <div className="stat-card-value" style={{ color: "var(--rose)" }}>
            {rmas.filter(r => r.status !== "Repaired").length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Under Repair</div>
          <div className="stat-card-value" style={{ color: "var(--amber)" }}>
            {rmas.filter(r => r.status === "Diagnostics").length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Closed / Repaired</div>
          <div className="stat-card-value" style={{ color: "var(--emerald)" }}>
            {rmas.filter(r => r.status === "Repaired").length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Out-of-Stock Parts</div>
          <div className="stat-card-value" style={{ color: "var(--amber)" }}>
            {SPARE_PARTS.filter(s => s.stock === 0).length}
          </div>
        </div>
      </div>

      <div className="tabs">
        <button className={"tab-btn" + (tab === "rma"   ? " active" : "")} onClick={() => setTab("rma")}>RMA Cases</button>
        <button className={"tab-btn" + (tab === "parts" ? " active" : "")} onClick={() => setTab("parts")}>Spare Parts</button>
      </div>

      {tab === "rma" && (
        <>
          <div className="flex-end mb-4">
            <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ New RMA</button>
          </div>
          <div className="card">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>RMA #</th><th>Customer</th><th>Unit</th><th>Reason</th><th>Received</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {rmas.map(r => (
                    <tr key={r.id}>
                      <td className="mono text-accent">{r.id}</td>
                      <td className="fw-600">{r.customer}</td>
                      <td className="mono text-muted">{r.unit}</td>
                      <td className="text-muted">{r.reason}</td>
                      <td className="mono text-muted">{r.received}</td>
                      <td><span className={`badge ${statClass(r.status)}`}>{r.status}</span></td>
                      <td>
                        <div className="flex gap-2">
                          {r.status === "Open" && (
                            <button className="btn btn-xs btn-ghost" onClick={() => updateStatus(r.id, "Diagnostics")}>Start Diag</button>
                          )}
                          {r.status === "Diagnostics" && (
                            <button className="btn btn-xs btn-ghost" onClick={() => updateStatus(r.id, "Quote Sent")}>Send Quote</button>
                          )}
                          {r.status === "Quote Sent" && (
                            <button className="btn btn-xs btn-ghost" onClick={() => updateStatus(r.id, "Repaired")}>Mark Repaired ✓</button>
                          )}
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

      {tab === "parts" && (
        <div className="grid-3">
          {SPARE_PARTS.map(sp => (
            <div key={sp.sku} className="card" style={{
              borderLeft: `3px solid ${sp.stock === 0 ? "var(--rose)" : sp.stock < 5 ? "var(--amber)" : "var(--emerald)"}`,
              animation: "fadeUp 0.4s ease both",
            }}>
              <div className="mono text-muted" style={{ fontSize: 10, marginBottom: 4 }}>{sp.sku}</div>
              <div className="fw-700" style={{ fontSize: 13, marginBottom: 10 }}>{sp.name}</div>
              <div className="flex-between">
                <div>
                  <div className="text-muted" style={{ fontSize: 11 }}>Stock</div>
                  <div style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 22, fontWeight: 700,
                    color: sp.stock === 0 ? "var(--rose)" : sp.stock < 5 ? "var(--amber)" : "var(--emerald)"
                  }}>{sp.stock}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="text-muted" style={{ fontSize: 11 }}>Unit Price</div>
                  <div className="mono fw-700" style={{ fontSize: 14 }}>{sp.price}</div>
                </div>
              </div>
              <div className="flex-between mt-4">
                {sp.stock === 0
                  ? <span className="badge badge-red">Out of Stock</span>
                  : sp.stock < 5
                  ? <span className="badge badge-yellow">Low Stock</span>
                  : <span className="badge badge-green">Available</span>
                }
                <button className={`btn btn-xs ${sp.stock > 0 ? "btn-primary" : "btn-ghost"}`}
                  disabled={sp.stock === 0}>
                  {sp.stock > 0 ? "Order →" : "Backorder"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Log New RMA</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>RMA ID</label>
                <input placeholder="RMA-XXXX" value={form.id} onChange={e => setForm(p => ({ ...p, id: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Customer</label>
                <input placeholder="Customer name" value={form.customer} onChange={e => setForm(p => ({ ...p, customer: e.target.value }))} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Unit / Product</label>
                <input placeholder="Unit ID or product" value={form.unit} onChange={e => setForm(p => ({ ...p, unit: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Reason</label>
                <input placeholder="Failure reason" value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} />
              </div>
            </div>
            <div className="flex-end gap-3 mt-4">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={addRMA}>Create RMA</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Service;
