import { useState} from "react";
import {signup} from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup(){
    const [form,setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

   
}