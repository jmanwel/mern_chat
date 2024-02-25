import React, { useState, useContext } from 'react';
import { UserContext } from "../../userContext";
import { Navigate } from "react-router-dom";

const Signup = () => {

    const {user, setUser} = useContext(UserContext);
 
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ nameError, setNameError ] = useState("");
    const [ emailError, setEmailError ] = useState("");
    const [ passwordError, setPasswordError ] = useState("");

    const ENDPOINT = import.meta.env.VITE_ENDPOINT;

    const submitHandler = async e => {
        e.preventDefault();
        setNameError("");
        setEmailError("");
        setPasswordError("");
        try {
            const res = await fetch(`${ENDPOINT}signup`,{
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ name, email, password }),
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin":"*" }
            });
            const data = await res.json();
            console.log(data);
            if (data.errors) {
                setNameError(data.errors.name);
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
        <div className="text-center">
        <br/>
        <br/>
            <form className="container" onSubmit= { submitHandler }>
                <h2 className="text-center">Sign Up</h2>
                <br />
                <div className="row">
                    <div className="input-field col s12">
                        <input 
                            id="name" 
                            type="text" 
                            className="validate form-control"
                            value= { name }
                            onChange= { e=>setName(e.target.value )}
                        />
                        <label htmlFor="name">Name</label>
                        <div className="name error red-text">{ nameError }</div>
                    </div>                    
                </div>
            
                <div className="row">
                    <div className="input-field col s12">
                        <input 
                            id="email" 
                            type="email" 
                            className="validate form-control" 
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
                <button className="btn btn-large btn-primary">Sign up</button>
                <br/>
                <br/>
                <br/>
            </form>
        </div>
    )
}

export default Signup
