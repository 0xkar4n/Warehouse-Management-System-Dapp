import React, { useState } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav" >
      <Link to="/" className="site-title">
        Warehouse Management

      </Link>
      <ul>
        <li>
          <Link to="/ManageWarehouse"> Manage Warehouse</Link>
        </li>
        
      </ul>
      <div    style={{
      display: 'flex',
      justifyContent: 'flex-end',
      padding: 12,
    }}>
  
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
