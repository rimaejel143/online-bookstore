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

      // ✅ نحفظ user بعد login
      if (!isSignup && result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
      }

      if (result.message.toLowerCase().includes("success")) {
        navigate("/");
      }
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f1ea] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#2f5b49] px-6 py-5">
          <h2 className="text-2xl font-semibold text-white">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          {isSignup && (
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <button
            disabled={loading}
            className="w-full bg-[#2f5b49] text-white py-2 rounded"
          >
            {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
          </button>

          <p className="text-center text-sm">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}
            <button
              type="button"
              onClick={() => switchMode(isSignup ? "login" : "signup")}
              className="ml-2 text-green-700 font-semibold"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
