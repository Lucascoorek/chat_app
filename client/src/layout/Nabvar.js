import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <p>Navbar Component</p>
    </nav>
  );
};

export default Navbar;
