import { useState} from "react";
import {login, signup} from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Signup(){
    const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signup(form);

      if (result.message === "User registered successfully") {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(result.message);
      }
    } finally {
      setLoading(false);
    }
  }

    return(
        <div className="min-h-screen bg-[#f6f1ea] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div  className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-black/10 overflow-hidden">
          
          <div className="px-6 py-5 bg-[#2f5b49]">
            <h2 className="text-2xl font-semibold text-white">Welcome Back</h2>
            <p className="text-white/80 text-sm mt-1">
              Login to continue to your bookstore account.
            </p>

          </div>
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            <div>
             <label className="block text-sm font-medium text-[#2f5b49] mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                value={form.email}
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#2f5b49]/40 focus:border-[#2f5b49]/40"
                required
              />
            </div>
            <div>
                <label className="block text-sm font-medium text-[#2f5b49] mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                value={form.password}
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#2f5b49]/40 focus:border-[#2f5b49]/40"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#2f5b49] text-white py-3 font-semibold shadow-md hover:brightness-110 active:scale-[0.99] transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="text-center text-sm text-black/60">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-[#2f5b49] hover:underline"
              >
                Sign Up
              </Link>
            </div>
               
          </form>
        </div>
         <p className="text-center text-xs text-black/50 mt-4">
          Online Bookstore • Secure Login
        </p>
      </div>
      </div>
    );
   
}
export default Signup;