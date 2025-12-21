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

    async function handleSumbit(e) {
        e.preventDefault();
        const result = await signup(form);

        if (result.message === "User registered successfully"){
            alert("Signup successful!");
        }else{
            alert(result.message);
        }
    }
   
}