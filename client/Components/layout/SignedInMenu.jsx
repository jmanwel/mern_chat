import React from 'react';

const SignedInMenu = ({ logout }) => {
  return (
    <li><a onClick={ logout } href="#">Logout</a></li>
  )
}

export default SignedInMenu;