import { useState } from "react";
import Layout from "../components/Layout";

const INIT_PO = [
  { id: "PO-77001", supplier: "Acme Components", material: "Capacitors",   value: "$42,000", lead: "14 days", status: "Confirmed", incoming: "Mar 28" },
  { id: "PO-77002", supplier: "Nexus Metals",     material: "Steel Bars",   value: "$18,500", lead: "21 days", status: "Delayed",   incoming: "Apr 05" },
  { id: "PO-77003", supplier: "PrimeTech PCB",    material: "Raw PCB",      value: "$9,200",  lead: "7 days",  status: "Shipped",   incoming: "Mar 23" },
  { id: "PO-77004", supplier: "ThermalTech",      material: "Heat Sinks",   value: "$6,800",  lead: "10 days", status: "Confirmed", incoming: "Mar 30" },
];

const SHIPMENTS = [
  { id: "SH-44201", dest: "Munich, DE",   items: 240, status: "In Transit", eta: "Mar 24", program: "Aerospace" },
  { id: "SH-44202", dest: "Austin, TX",   items: 80,  status: "Delivered",  eta: "Mar 18", program: "EV Battery" },
  { id: "SH-44203", dest: "Tokyo, JP",    items: 12,  status: "Pending",    eta: "Mar 28", program: "Medical" },
  { id: "SH-44204", dest: "London, UK",   items: 60,  status: "Exception",  eta: "Mar 21", program: "Defense" },
];

const INVENTORY = [
  { part: "Capacitor 100µF",      total: 4400, alloc: 3200, threshold: 1000 },
  { part: "MOSFET IRF540",        total: 800,  alloc: 650,  threshold: 200 },
  { part: "PCB Raw Laminate",     total: 120,  alloc: 80,   threshold: 50 },
  { part: "Stainless Housing",    total: 55,   alloc: 50,   threshold: 20 },
  { part: "Thermal Interface Pad",total: 310,  alloc: 90,   threshold: 80 },
  { part: "Power Module PS-200",  total: 44,   alloc: 38,   threshold: 15 },
];

function SupplyChain() {
  const [pos, setPos] = useState(INIT_PO);
  const [tab, setTab] = useState("po");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ id: "", supplier: "", material: "", value: "", lead: "", status: "Confirmed", incoming: "" });

  const addPO = () => {
    if (!form.id || !form.supplier) return;
    setPos(prev => [...prev, form]);
    setShowModal(false);
    setForm({ id: "", supplier: "", material: "", value: "", lead: "", status: "Confirmed", incoming: "" });
  };

  const statClass = s =>
    s === "Confirmed" ? "badge-green" : s === "Delayed" ? "badge-red" :
    s === "Shipped"   ? "badge-cyan"  : "badge-gray";

  const shipClass = s =>
    s === "Delivered"  ? "badge-green" : s === "Exception" ? "badge-red" :
    s === "In Transit" ? "badge-cyan"  : "badge-gray";

  return (
    <Layout>
      <div className="page-header">
        <h2>Supply Chain & Materials</h2>
        <p>PO tracking · Inventory · Shipments · Supplier scorecards</p>
      </div>

      <div className="grid-4 stagger mb-5">
        <div className="stat-card">
          <div className="stat-card-label">Open POs</div>
          <div className="stat-card-value" style={{ color: "var(--blue-bright)" }}>{pos.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Delayed Suppliers</div>
          <div className="stat-card-value" style={{ color: "var(--rose)" }}>
            {pos.filter(p => p.status === "Delayed").length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Low Stock Items</div>
          <div className="stat-card-value" style={{ color: "var(--amber)" }}>
            {INVENTORY.filter(i => i.total - i.alloc < i.threshold).length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Shipments Active</div>
          <div className="stat-card-value" style={{ color: "var(--cyan)" }}>
            {SHIPMENTS.filter(s => s.status === "In Transit").length}
          </div>
        </div>
      </div>

      <div className="tabs">
        <button className={"tab-btn" + (tab === "po"        ? " active" : "")} onClick={() => setTab("po")}>Purchase Orders</button>
        <button className={"tab-btn" + (tab === "shipments" ? " active" : "")} onClick={() => setTab("shipments")}>Shipments</button>
        <button className={"tab-btn" + (tab === "inventory" ? " active" : "")} onClick={() => setTab("inventory")}>Inventory</button>
      </div>

      {tab === "po" && (
        <>
          <div className="flex-end mb-4">
            <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ New PO</button>
          </div>
          <div className="card">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>PO #</th><th>Supplier</th><th>Material</th><th>Value</th><th>Lead Time</th><th>Incoming</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {pos.map(p => (
                    <tr key={p.id}>
                      <td className="mono text-accent">{p.id}</td>
                      <td className="fw-600">{p.supplier}</td>
                      <td className="text-muted">{p.material}</td>
                      <td className="mono fw-600">{p.value}</td>
                      <td className="text-muted">{p.lead}</td>
                      <td className="mono text-muted">{p.incoming}</td>
                      <td><span className={`badge ${statClass(p.status)}`}>{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === "shipments" && (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Shipment</th><th>Destination</th><th>Items</th><th>Program</th><th>ETA</th><th>Status</th></tr>
              </thead>
              <tbody>
                {SHIPMENTS.map(s => (
                  <tr key={s.id}>
                    <td className="mono text-accent">{s.id}</td>
                    <td className="fw-600">{s.dest}</td>
                    <td className="mono">{s.items}</td>
                    <td className="text-muted">{s.program}</td>
                    <td className="mono text-muted">{s.eta}</td>
                    <td><span className={`badge ${shipClass(s.status)}`}>{s.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "inventory" && (
        <div className="grid-3">
          {INVENTORY.map(inv => {
            const avail = inv.total - inv.alloc;
            const pct = Math.round((avail / inv.total) * 100);
            const alert = avail < inv.threshold;
            return (
              <div key={inv.part} className="card" style={{
                borderLeft: `3px solid ${alert ? "var(--rose)" : "var(--emerald)"}`,
                animation: "fadeUp 0.4s ease both",
              }}>
                <div className="fw-600" style={{ fontSize: 13, marginBottom: 6 }}>{inv.part}</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span className="text-muted fs-12">{avail} available</span>
                  <span className="mono text-muted" style={{ fontSize: 11 }}>{inv.total} total</span>
                </div>
                <div className="progress-track" style={{ height: 6 }}>
                  <div className="progress-fill" style={{
                    width: `${pct}%`,
                    background: alert ? "var(--rose)" : "var(--emerald)",
                  }} />
                </div>
                <div className="flex-between mt-4">
                  <span className="mono" style={{ fontSize: 11, color: "var(--text3)" }}>Min: {inv.threshold}</span>
                  {alert
                    ? <span className="badge badge-red">⚠ Low Stock</span>
                    : <span className="badge badge-green">In Stock</span>
                  }
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">New Purchase Order</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>PO Number</label>
                <input placeholder="PO-XXXXX" value={form.id} onChange={e => setForm(p => ({ ...p, id: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Supplier</label>
                <input placeholder="Supplier name" value={form.supplier} onChange={e => setForm(p => ({ ...p, supplier: e.target.value }))} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Material</label>
                <input placeholder="Material description" value={form.material} onChange={e => setForm(p => ({ ...p, material: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Value</label>
                <input placeholder="$0,000" value={form.value} onChange={e => setForm(p => ({ ...p, value: e.target.value }))} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Lead Time</label>
                <input placeholder="e.g. 14 days" value={form.lead} onChange={e => setForm(p => ({ ...p, lead: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Expected Incoming</label>
                <input placeholder="e.g. Apr 10" value={form.incoming} onChange={e => setForm(p => ({ ...p, incoming: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                <option>Confirmed</option><option>Delayed</option><option>Shipped</option><option>Pending</option>
              </select>
            </div>
            <div className="flex-end gap-3 mt-4">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={addPO}>Create PO</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default SupplyChain;
