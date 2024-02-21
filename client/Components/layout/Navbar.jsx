import React, { useContext } from 'react';
import { UserContext } from "../../userContext";


const Navbar = () => {

    const ENDPOINT = import.meta.env.VITE_ENDPOINT;
    const {user, setUser} = useContext(UserContext);
    
    const logout = async ()=>{
        try {
            const res = await fetch(`${ENDPOINT}verifyuser`,{credentials: "include",});
            const data = res.json();
            console.log("logout data", data);
            setUser(null);
        } catch (error) {
            console.log(error);    
        }
    }    
    

    return (
        <>
            <nav className="green">
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo">Chat</a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signup">SignUp</a></li>
                        <li><a onClick={ logout } href="#">Logout</a></li>
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-demo">
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">SignUp</a></li>
                <li><a onClick={ logout } href="#">Logout</a></li>
            </ul>
        </>
    )
}


export default Navbar
