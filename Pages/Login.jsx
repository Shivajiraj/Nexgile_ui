import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ROLES = ["Admin", "Customer – Engineering", "Customer – Quality", "Prod Planning", "Quality Eng"];

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 900);
  };

  return (
    <div className="login-container">
      <div className="login-bg" />
      <div className="login-bg-glow" />

      <div className="login-box">
        {/* Logo */}
        <div className="login-logo">
          <div className="login-logo-icon">N</div>
          <div className="login-brand">
            Nexgile <span>FactoryIQ</span>
          </div>
        </div>
        <p className="login-sub">Manufacturing Excellence Portal — Sign in to continue</p>

        {/* Role select */}
        <label style={{ marginBottom: 8 }}>Select Role</label>
        <div className="role-pills">
          {ROLES.map(r => (
            <button
              key={r}
              className={"role-pill" + (role === r ? " selected" : "")}
              onClick={() => setRole(r)}
            >{r}</button>
          ))}
        </div>

        {/* Fields */}
        <div className="form-group">
          <label>Username / Email</label>
          <input
            placeholder="admin@nexgile.com"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </div>

        {error && (
          <div className="alert alert-danger" style={{ marginBottom: 14 }}>
            <span>⚠</span> {error}
          </div>
        )}

        <button className="login-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Authenticating…" : `Sign In as ${role} →`}
        </button>

        <p className="login-link">
          Demo: enter any credentials and click Sign In
        </p>
      </div>
    </div>
  );
}

export default Login;
