import { useState } from "react";
import { login } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("LOGIN DATA:", form);
    } catch (err) {
      setError("Login failed. Please check your email/password.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>
        <p className="auth-subtitle">Welcome back! Please login to continue.</p>
      </div>
      <div className="auth-body">
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-row">
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="auth-row">
            <label className="auth-label">Password</label>
            <input
              className="auth-input"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={onChange}
              required
            />
          </div>
          <div className="auth-actions">
            <button className="auth-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="auth-foot">
            Don’t have an account?{" "}
            <Link className="auth-link" to="/signup">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
