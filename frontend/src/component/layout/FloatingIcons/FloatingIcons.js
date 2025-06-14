// src/component/layout/FloatingIcons/FloatingIcons.js

import React from "react";
import { FaSearch, FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./FloatingIcons.css";

const FloatingIcons = () => {
  return (
    <div className="floating-icons">
      <Link to="/search"><FaSearch /></Link>
      <Link to="/login"><FaUserAlt /></Link>
      <Link to="/cart"><FaShoppingCart /></Link>
    </div>
  );
};

export default FloatingIcons;
