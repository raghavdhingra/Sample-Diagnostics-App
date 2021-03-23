import React from 'react';
import '../assets/css/header.css';

const Header = ({ heading, setState, state }) => {
  return (
    <div className="header">
      <div className="centralise">
        <div className="profile-icon centralise">R</div>
      </div>
      <div className="centralise collapsable-text">{heading}</div>
      <div className="centralise">
        <div
          className="hamburger-icon-container"
          onClick={() =>
            setState({ ...state, mobileNavOpen: !state.mobileNavOpen })
          }
        >
          <div
            className={
              !state.mobileNavOpen
                ? 'hamburger-icon-line'
                : 'hamburger-icon-line-tilt-1'
            }
          ></div>
          <div
            className={
              !state.mobileNavOpen
                ? 'hamburger-icon-line-mid'
                : 'hamburger-icon-line-mid-close'
            }
          ></div>
          <div
            className={
              !state.mobileNavOpen
                ? 'hamburger-icon-line'
                : 'hamburger-icon-line-tilt-2'
            }
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
