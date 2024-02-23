import React, { useContext } from 'react';
import { UserContext } from "../../userContext";
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";

const Navbar = () => {

    const ENDPOINT = import.meta.env.VITE_ENDPOINT;
    const {user, setUser} = useContext(UserContext);
    
    const logout = async ()=>{
        try {
            const res = await fetch(`${ENDPOINT}logout`,{credentials: "include",});
            const data = res.json();
            console.log("logout data =>", data);
            setUser(null);
        } catch (error) {
            console.log(error);    
        }
    }    
    
    const menu = user ? <SignedInMenu logout={ logout } /> : <SignedOutMenu />
    
    return (
        <>
            <nav className="green">
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo">Chat</a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        { menu }
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-demo">
                { menu }
            </ul>
        </>
    )
}


export default Navbar
