import { useState} from "react";
import {login, signup} from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Signup(){
    const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(form);

      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/");
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
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
            </div>

          </form>
        </div>


      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full" />
         <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" />
          <button className="bg-black text-white px-4 py-2 w-full">
          Sign Up
        </button>

      </form>
      </div>
    );
   
}
export default Signup;