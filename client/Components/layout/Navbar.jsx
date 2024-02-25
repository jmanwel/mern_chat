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
        <nav className="navbar navbar-expand-lg bg-success">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Chat</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        { menu }
                    </div>
                </div>
            </div>
        </nav>
        {/* <nav className="green">
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
            </ul> */}
        </>
    )
}


export default Navbar
