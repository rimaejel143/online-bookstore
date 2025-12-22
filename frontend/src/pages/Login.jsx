import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
 const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
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
        <p className="auth-subtitle">
            Welcome back! Please login to continue.
          </p>

    </div>
    <div className="auth-body">
      {error && <div className="auth-error">{error}</div>}
      <form  className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-row">
          <label className="auth-label">Email</label>

        </div>

      </form>

    </div>
    </div>
  );
}

export default Login;
