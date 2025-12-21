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
}