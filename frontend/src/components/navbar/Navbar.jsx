import React, { useState } from "react";
import "../navbar/Navbar.css";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenu((prevState) => !prevState);
  };
  return (
    <nav className="navbar-container">
      <img
        src="/static-images/Logo.5e7b3578.png"
        className="alura-logo"
        alt="Alura logo"
      />
      <IoMenu className="menu-icon" onClick={handleMobileMenu} />
      {mobileMenu && (
        <ul className="menu-container">
          <Link to="/">
            <li className="list-item">Home</li>
          </Link>
          <Link to="/crear">
            <li className="list-item">New video</li>
          </Link>
        </ul>
      )}
      <div className="buttons-navbar-container">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/crear">
          <button>New Video</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
