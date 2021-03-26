import React from 'react';
import '../assets/css/extension-card.css';

const ExtensionIDCard = ({ show, extensionId, changeExtensionId }) => {
  if (!show) return null;
  return (
    <>
      <div className="extension-card-overlay">
        <div className="centralise full-height">
          <div className="extension-card-container">
            <div className="extension-header">Extension ID</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExtensionIDCard;
