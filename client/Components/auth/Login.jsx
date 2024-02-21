import React, { useState, useContext } from 'react';
import { UserContext } from "../../userContext";
import { Navigate } from "react-router-dom";

const Login = () => {

    const {user, setUser} = useContext(UserContext);
 
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ emailError, setEmailError ] = useState("");
    const [ passwordError, setPasswordError ] = useState("");

    const ENDPOINT = import.meta.env.VITE_ENDPOINT;

    const submitHandler = async e => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");
        try {
            const res = await fetch(`${ENDPOINT}login`,{
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin":"*" }
            });
            const data = await res.json();
            console.log(data);
            if (data.errors) {
                setEmailError(data.errors.email);
                setPasswordError(data.errors.password);
            }
            if (data.user) {
                setUser(data.user)
            }
        } catch (error) {
            console.log(error);            
        }
    }

    if (user) {
        return <Navigate to="/" />
    }

    return (
        <div className="row">
            <h1>Login Page</h1>
            <form className="container" onSubmit= { submitHandler }>
            
                <div className="row">
                    <div className="input-field col s12">
                        <input 
                            id="email" 
                            type="email" 
                            className="validate" 
                            value= { email }
                            onChange= { e=>setEmail(e.target.value )}
                        />
                        <label htmlFor="email">Email</label>
                        <div className="email error red-text">{ emailError }</div>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input 
                            id="password" 
                            type="password" 
                            className="validate" 
                            value= { password }
                            onChange= { e=>setPassword(e.target.value )}
                        />
                        <div className="password error red-text">{ passwordError }</div>
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <button className="btn btn-large col">Login</button>
            </form>
        </div>
    )
}

export default Login
