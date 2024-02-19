import React, { useState } from 'react';

const Signup = () => {

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ nameError, setNameError ] = useState("");
    const [ emailError, setEmailError ] = useState("");
    const [ passwordError, setPasswordError ] = useState("");

    const ENDPOINT = import.meta.env.VITE_ENDPOINT;

    const submitHandler = async e => {
        e.preventDefault();
        try {
            const res = await fetch(`${ENDPOINT}signup`,{
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ name, email, password }),
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin":"*" }
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);            
        }
    }

    return (
        <div className="row">
            <h1>Sign Up Page</h1>
            <form className="container" onSubmit= { submitHandler }>
                <div className="row">
                    <div className="input-field col s12">
                        <input 
                            id="name" 
                            type="text" 
                            className="validate"
                            value= { name }
                            onChange= { e=>setName(e.target.value )}
                        />
                        <label htmlFor="name">Name</label>
                        <div className="name error red-text"></div>
                    </div>                    
                </div>
            
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
                        <div className="email error red-text"></div>
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
                        <div className="password error red-text"></div>
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <button className="btn btn-large col">Sign up</button>
            </form>
        </div>
    )
}

export default Signup
