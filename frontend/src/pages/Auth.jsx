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

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
 function switchMode(nextMode) {
    setMode(nextMode);
    setLoading(false);
     setForm((prev) => ({
      ...prev,
      name: nextMode === "login" ? "" : prev.name,
    }));
    async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

      try {
      const payload =
        mode === "login"
          ? { email: form.email, password: form.password }
          : { name: form.name, email: form.email, password: form.password };

      const result = mode === "login" ? await login(payload) : await signup(payload);
       if (result?.message) {
         if (
          result.message.toLowerCase().includes("success") ||
          result.message.toLowerCase().includes("logged") ||
          result.message.toLowerCase().includes("registered")
        ) {
            alert(mode === "login" ? "Login successful!" : "Signup successful!");
             if (result.token) localStorage.setItem("token", result.token);
              navigate("/");
        } else {
          alert(result.message);
        }
      } else {
        alert("Unexpected response from server.");
      }
    } catch (err) {
        console.error(err);
      alert(
        err?.message ||
          "Request failed. Check backend URL / server running / CORS."
      );
    } finally {
      setLoading(false);
    }
  }

    const isSignup = mode === "signup";

    return(
        <div className="min-h-[calc(100vh-160px)] bg-[#f6f1ea] flex items-center justify-center px-4 py-10 mt-10">
            <div className="w-full max-w-md">
               <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-black/10 overflow-hidden">
               <div className="px-6 py-5 bg-[#2f5b49]">
                <h2 className="text-2xl font-semibold text-white">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>
             <p className="text-white/80 text-sm mt-1">
              {isSignup ? "Join our online bookstore 📚" : "Login to continue 📚"}
            </p>

               </div>
               <form  onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-[#2f5b49] mb-1">
                  Name
                </label>
                <input
                  name="name"
                  placeholder="Your full name"
                  onChange={handleChange}
                  value={form.name}
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none
                             focus:ring-2 focus:ring-[#2f5b49]/40 focus:border-[#2f5b49]/40"
                  required
                />
              </div>
            )}

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
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none
                           focus:ring-2 focus:ring-[#2f5b49]/40 focus:border-[#2f5b49]/40"
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
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none
                           focus:ring-2 focus:ring-[#2f5b49]/40 focus:border-[#2f5b49]/40"
                required
              />
            </div>
                 <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#2f5b49] text-white py-3 font-semibold
                         hover:bg-[#264b38] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? isSignup
                  ? "Creating account..."
                  : "Logging in..."
                : isSignup
                ? "Sign Up"
                : "Login"}
            </button>
            
            <div className="text-center text-sm text-black/60">
            {isSignup ? (
                <>
                 Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className="font-semibold text-[#2f5b49] hover:underline"
                  >
                    Login
                  </button>
                </>

            ): (
                <>
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("signup")}
                    className="font-semibold text-[#2f5b49] hover:underline"
                  >
                    Sign Up
                  </button>
                </>
            )}

            </div>
               </form>
                </div> 
               <p className="text-center text-xs text-black/50 mt-4">
          Online Bookstore • Secure {isSignup ? "Signup" : "Login"}
        </p>
                
            </div>

        </div>
    );


      }
    }

 

