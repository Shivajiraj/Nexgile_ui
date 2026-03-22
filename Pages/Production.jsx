import { useState } from "react";
import Layout from "../components/Layout";

const INITIAL_ORDERS = [
  { id: "WO-10421", product: "Avionics Main Board",  qty: 500, stage: "Build",    line: "Line A", shift: "Day",   yield: 96.2, progress: 78 },
  { id: "WO-10422", product: "EV Battery Cell Pack", qty: 200, stage: "Test",     line: "Line B", shift: "Night", yield: 89.1, progress: 45 },
  { id: "WO-10423", product: "Medical Sensor Unit",  qty: 80,  stage: "Inspect",  line: "Line C", shift: "Day",   yield: 99.8, progress: 92 },
  { id: "WO-10424", product: "Comms PCB Assembly",   qty: 340, stage: "Rework",   line: "Line A", shift: "Day",   yield: 72.3, progress: 15 },
  { id: "WO-10425", product: "Robot Arm Servo Kit",  qty: 60,  stage: "Complete", line: "Line D", shift: "Day",   yield: 98.0, progress: 100 },
];

const LINES = ["Line A", "Line B", "Line C", "Line D"];

function Production() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState("orders");
  const [form, setForm] = useState({ id: "", product: "", qty: "", stage: "Build", line: "Line A", shift: "Day" });
  const [search, setSearch] = useState("");

  const stageColor = s => {
    if (s === "Complete") return "badge-green";
    if (s === "Rework")   return "badge-red";
    if (s === "Inspect")  return "badge-cyan";
    if (s === "Test")     return "badge-violet";
    return "badge-blue";
  };

  const lineUtil = LINES.map(l => {
    const lineOrders = orders.filter(o => o.line === l);
    return { line: l, count: lineOrders.length, util: lineOrders.length > 0 ? Math.round(lineOrders.reduce((a, o) => a + o.progress, 0) / lineOrders.length) : 0 };
  });

  const displayed = orders.filter(o =>
    o.product.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())
  );

  const addOrder = () => {
    if (!form.id || !form.product) return;
    setOrders(prev => [...prev, { ...form, qty: Number(form.qty) || 0, yield: 100, progress: 0 }]);
    setShowModal(false);
    setForm({ id: "", product: "", qty: "", stage: "Build", line: "Line A", shift: "Day" });
  };

  return (
    <Layout>
      <div className="page-header">
        <h2>Production Visibility</h2>
        <p>Real-time multi-site floor view — work orders, capacity, yield tracking</p>
      </div>

      {/* Stat row */}
      <div className="grid-4 stagger mb-5">
        <div className="stat-card">
          <div className="stat-card-label">Total WIP Units</div>
          <div className="stat-card-value" style={{ color: "var(--cyan)" }}>
            {orders.reduce((a, o) => a + Number(o.qty), 0).toLocaleString()}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Avg Yield</div>
          <div className="stat-card-value" style={{ color: "var(--emerald)" }}>
            {(orders.reduce((a, o) => a + o.yield, 0) / orders.length).toFixed(1)}%
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Rework Orders</div>
          <div className="stat-card-value" style={{ color: "var(--rose)" }}>
            {orders.filter(o => o.stage === "Rework").length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Completed Today</div>
          <div className="stat-card-value" style={{ color: "var(--emerald)" }}>
            {orders.filter(o => o.stage === "Complete").length}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={"tab-btn" + (tab === "orders" ? " active" : "")}   onClick={() => setTab("orders")}>Work Orders</button>
        <button className={"tab-btn" + (tab === "capacity" ? " active" : "")} onClick={() => setTab("capacity")}>Line Capacity</button>
      </div>

      {tab === "orders" && (
        <>
          <div className="flex-between mb-4">
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text3)", fontSize: 13 }}>⌕</span>
              <input placeholder="Search orders…" value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: 220, paddingLeft: 30 }} />
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ New Work Order</button>
          </div>

          <div className="card">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th><th>Product</th><th>Qty</th>
                    <th>Stage</th><th>Line</th><th>Shift</th><th>Yield</th><th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {displayed.map(o => (
                    <tr key={o.id}>
                      <td className="mono text-accent">{o.id}</td>
                      <td className="fw-600">{o.product}</td>
                      <td className="mono">{o.qty.toLocaleString()}</td>
                      <td><span className={`badge ${stageColor(o.stage)}`}>{o.stage}</span></td>
                      <td className="text-muted">{o.line}</td>
                      <td className="text-muted">{o.shift}</td>
                      <td>
                        <span style={{ color: o.yield > 95 ? "var(--emerald)" : o.yield > 85 ? "var(--amber)" : "var(--rose)", fontFamily: "var(--mono)", fontWeight: 700 }}>
                          {o.yield}%
                        </span>
                      </td>
                      <td style={{ minWidth: 130 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ flex: 1 }}>
                            <div className="progress-track">
                              <div className="progress-fill" style={{
                                width: `${o.progress}%`,
                                background: o.progress === 100 ? "var(--emerald)" : o.stage === "Rework" ? "var(--rose)" : "var(--blue-bright)"
                              }} />
                            </div>
                          </div>
                          <span className="mono text-muted" style={{ fontSize: 11, flexShrink: 0 }}>{o.progress}%</span>
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

      {tab === "capacity" && (
        <div className="grid-2">
          {lineUtil.map(l => {
            const color = l.util > 80 ? "var(--emerald)" : l.util > 50 ? "var(--amber)" : l.util > 0 ? "var(--rose)" : "var(--text3)";
            const deg = l.util * 3.6;
            return (
              <div key={l.line} className="card" style={{ display: "flex", alignItems: "center", gap: 24 }}>
                {/* Donut */}
                <div style={{ position: "relative", width: 88, height: 88, flexShrink: 0 }}>
                  <svg width="88" height="88" viewBox="0 0 88 88">
                    <circle cx="44" cy="44" r="34" fill="none" stroke="var(--border)" strokeWidth="10" />
                    <circle cx="44" cy="44" r="34" fill="none" stroke={color} strokeWidth="10"
                      strokeDasharray={`${l.util * 2.136} ${213.6 - l.util * 2.136}`}
                      strokeLinecap="round"
                      transform="rotate(-90 44 44)"
                      style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: "stroke-dasharray 0.6s ease" }}
                    />
                  </svg>
                  <div style={{
                    position: "absolute", inset: 0, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)"
                  }}>
                    {l.util > 0 ? `${l.util}%` : "OFF"}
                  </div>
                </div>

                <div>
                  <div className="fw-700" style={{ fontSize: 16 }}>{l.line}</div>
                  <div className="text-muted fs-12" style={{ marginTop: 2 }}>{l.count} active order{l.count !== 1 ? "s" : ""}</div>
                  <div style={{ marginTop: 8 }}>
                    <span style={{ color, fontSize: 12, fontWeight: 600 }}>
                      {l.util > 80 ? "● High Utilization" : l.util > 0 ? "● Active" : "● Idle"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">New Work Order</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Order ID</label>
                <input placeholder="WO-XXXXX" value={form.id} onChange={e => setForm(p => ({ ...p, id: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Product</label>
                <input placeholder="Product name" value={form.product} onChange={e => setForm(p => ({ ...p, product: e.target.value }))} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Quantity</label>
                <input type="number" placeholder="0" value={form.qty} onChange={e => setForm(p => ({ ...p, qty: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Stage</label>
                <select value={form.stage} onChange={e => setForm(p => ({ ...p, stage: e.target.value }))}>
                  {["Build","Test","Inspect","Rework","Complete"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Line</label>
                <select value={form.line} onChange={e => setForm(p => ({ ...p, line: e.target.value }))}>
                  {LINES.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Shift</label>
                <select value={form.shift} onChange={e => setForm(p => ({ ...p, shift: e.target.value }))}>
                  <option>Day</option><option>Night</option>
                </select>
              </div>
            </div>
            <div className="flex-end gap-3 mt-4">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={addOrder}>Create Order</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Production;
