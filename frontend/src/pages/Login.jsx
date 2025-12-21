import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login(){
    const [form, setForm] = useState({ 
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    function handleChange(e){
        setForm({...form, [e.target.name]:
            e.target.value });
    }

    async function handleSubmit(e){
        e.preventDefault();
        const result = await login(form);

        if(result.user){
            localStorage.setItem("user",JSON.stringify(result.user));
            navigate("/");
        }else{
            alert(result.message);
        }
    }
    return(
        <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>

      <form  <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" />
        <button className="bg-black text-white px-4 py-2 w-full">
          Login
        </button>


      </form>

        </div>
    );
}

export default Login;