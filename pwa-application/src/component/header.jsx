import React from 'react';
import '../assets/css/header.css';

const Header = ({ heading }) => {
  return (
    <div className="header">
      <div className="centralise">{heading}</div>
      <div className="centralise">
        <div className="hamburger-icon-container">
          <div className="hamburger-icon-line"></div>
          <div className="hamburger-icon-line-mid"></div>
          <div className="hamburger-icon-line"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
