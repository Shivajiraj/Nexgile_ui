import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV = [
  { to: "/dashboard", icon: "◈", label: "Dashboard" },
  { to: "/program",   icon: "⬡", label: "Program Tracking" },
  { to: "/production",icon: "⚙", label: "Production" },
  { to: "/quality",   icon: "✦", label: "Quality" },
  { to: "/supply",    icon: "⬢", label: "Supply Chain" },
  { to: "/service",   icon: "↩", label: "After-Sales" },
  { to: "/documents", icon: "⊞", label: "Documents" },
];

function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">N</div>
        <div>
          <div className="sidebar-logo-text">Nexgile <span style={{ color: "var(--cyan)" }}>FIQ</span></div>
          <div className="sidebar-logo-sub">Manufacturing Portal</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav stagger">
        <div className="sidebar-section" style={{ padding: "12px 4px 4px", marginBottom: 4 }}>Main Menu</div>
        {NAV.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className={"nav-link" + (pathname === item.to ? " active" : "")}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User footer */}
      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">A</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="user-name">Admin User</div>
            <div className="user-role">Super Admin</div>
          </div>
          <div
            className="icon-btn"
            style={{ width: 26, height: 26, borderRadius: 6, fontSize: 13 }}
            data-tip="Sign out"
            onClick={() => navigate("/")}
          >⏏</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
