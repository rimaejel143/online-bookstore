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
      const result = await login(form);
      if (result?.message === "Login successful") {

         navigate("/");
      } else {
        setError(result?.message || "Login failed. Please check your email/password.");
      }
    } catch (err) {
      setError("Login failed. Please check your email/password.");
    } finally {
      setLoading(false);
    }
  };

   return (
    <div className="min-h-[calc(100vh-160px)] bg-[#f6f1ea] flex items-center justify-center px-4 py-10 pt-24">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-black/10 overflow-hidden">
          <div className="px-6 py-5 bg-[#2f5b49]">
            <h2 className="text-2xl font-semibold text-white">Login</h2>
            <p className="text-white/80 text-sm mt-1">
              Welcome back! Please login to continue.
            </p>
          </div>

          <div className="px-6 py-6">
            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-[#2f5b49] mb-1">
                  Email
                </label>
                <input
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none
                             focus:ring-2 focus:ring-[#2f5b49]/40 focus:border-[#2f5b49]/40"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2f5b49] mb-1">
                  Password
                </label>
                <input
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none
                             focus:ring-2 focus:ring-[#2f5b49]/40 focus:border-[#2f5b49]/40"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                className="w-full rounded-xl bg-[#2f5b49] text-white py-3 font-semibold
                           hover:bg-[#264b38] transition disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
                type="submit"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="text-center text-sm text-black/60">
                Don’t have an account?{" "}
                <Link to="/signup" className="font-semibold text-[#2f5b49] hover:underline">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-black/50 mt-4">
          Online Bookstore • Secure Login
        </p>
      </div>
    </div>
  );

}

export default Login;
