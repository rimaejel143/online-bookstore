import { useState } from "react";
import { login, signup } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("signup");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setForm({ name: "", email: "", password: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = isSignup
        ? form
        : { email: form.email, password: form.password };

      const result = isSignup ? await signup(payload) : await login(payload);

      alert(result.message);

      if (result.message.toLowerCase().includes("success")) {
        navigate("/");
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f1ea] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#2f5b49] px-6 py-5">
          <h2 className="text-2xl font-semibold text-white">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-sm text-white/80 mt-1">
            {isSignup ? "Join our online bookstore" : "Login to your account"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          {isSignup && (
            <div>
              <label className="block text-sm font-medium mb-1 text-[#2f5b49]">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2f5b49]/40"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1 text-[#2f5b49]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2f5b49]/40"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-[#2f5b49]">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2f5b49]/40"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2f5b49] text-white py-2.5 rounded-lg font-semibold hover:bg-[#264b38] transition"
          >
            {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
          </button>

          <div className="text-center text-sm text-gray-600">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="w-70 bg-[#2f5b49] text-white py-2 px-5 rounded-lg font-semibold"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className="w-70 bg-[#2f5b49] text-white py-2 px-5 rounded-lg font-semibold"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
