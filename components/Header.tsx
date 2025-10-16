import React, { useEffect, useState } from "react";
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header">
      {/* Top Bar: Logo + Social Icons */}
      <div className="top-bar">
        <div className="logo-container">
          <img
            src="https://themeger.shop/wordpress/katen/classic/wp-content/uploads/sites/4/2022/08/logo.svg"
            alt="Katen"
            width="118"
            height="26"
          />
        </div>
        <div className="social-icons">
          <a href="#" className="social-icon"><FacebookFilled /></a>
          <a href="#" className="social-icon"><TwitterSquareFilled /></a>
          <a href="#" className="social-icon"><InstagramOutlined /></a>
          <a href="#" className="social-icon"><YoutubeFilled /></a>
        </div>
      </div>
      <div className="katen-logo">
      {/* Navigation Links */}
      <nav className={`nav-links ${isScrolled ? "scrolled-nav" : ""}`}>
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/details" className="nav-item">Details</Link>
        <Link to="/contact" className="nav-item">Contact</Link>
      </nav>
      </div>
    </header>
  );
};

export default Header;
