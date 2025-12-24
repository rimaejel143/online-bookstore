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

 }

}