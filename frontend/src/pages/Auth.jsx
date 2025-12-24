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


      }
    }

 

