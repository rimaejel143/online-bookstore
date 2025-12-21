import { useState} from "react";
import {signup} from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup(){
    const [form,setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
     
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]:e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const result = await signup(form);

        if (result.message === "User registered successfully"){
            alert("Signup successful!");
        }else{
            alert(result.message);
        }
    }
    return(
        <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Sign Up</h2> 

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