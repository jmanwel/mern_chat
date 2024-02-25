import React from 'react';

const SignedInMenu = ({ logout }) => {
  return (
    <li className="nav-link"><a onClick={ logout } href="#">Logout</a></li>
  )
}

export default SignedInMenu;