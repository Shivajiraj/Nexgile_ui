import { useState } from "react";

function Header({ title }) {
  const [notifs] = useState(3);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="header">
      <div className="flex items-center gap-3">
        <span className="header-title">{title || "FactoryIQ Portal"}</span>
      </div>

      <div className="header-right">
        {/* Search */}
        <div className="header-search">
          <span className="header-search-icon">⌕</span>
          <input
            placeholder="Search anything…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
          />
        </div>

        {/* Notification bell */}
        <div className="icon-btn" data-tip="Notifications">
          🔔
          {notifs > 0 && <span className="badge-dot" />}
        </div>

        {/* Theme / settings */}
        <div className="icon-btn" data-tip="Settings">⚙</div>
      </div>
    </div>
  );
}

export default Header;
