import React, { useState } from 'react';
import HELP_ICON from '../assets/images/help.svg';
import '../assets/css/extension-card.css';

const ExtensionIDCard = ({
  extensionId,
  changeExtensionId,
  changeExtensionShow,
}) => {
  let [localExtensionId, setLocalExtensionId] = useState('');
  // if (!show) return null;
  return (
    <>
      <div className="extension-card-overlay">
        <div className="centralise full-height">
          <div className="extension-card-container">
            <div className="extension-header">Extension ID</div>
            <div className="extension-hr"></div>
            <div className="extension-content-container">
              <input
                type="text"
                placeholder="Chrome Extension ID"
                className="extension-content-input"
                value={localExtensionId}
                onChange={(e) => setLocalExtensionId(e.target.value)}
              />
            </div>
            <div className="extension-hr"></div>
            <div className="extension-footer">
              <div className="centralise">
                <img
                  src={HELP_ICON}
                  className="help-icon"
                  width="20px"
                  alt="Help Icons"
                  onClick={() =>
                    alert(
                      'Go to chrome://extensions > Turn ON Developer Mode > Install Diagnostics Extension > Get ID'
                    )
                  }
                />
              </div>
              <div>
                {localExtensionId && (
                  <div
                    className="fetch-system-data-button"
                    onClick={() => {
                      changeExtensionId(localExtensionId);
                      changeExtensionShow(false);
                    }}
                  >
                    Save
                  </div>
                )}
                {extensionId && (
                  <div
                    className="fetch-system-data-button back-danger"
                    onClick={() => changeExtensionShow(false)}
                  >
                    Cancel
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExtensionIDCard;
