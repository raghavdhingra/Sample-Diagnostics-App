import React from 'react';

const DashboardCard = ({ header = 'Header', children }) => {
  return (
    <div className="system-process-card">
      <div className="system-process-header">{header}</div>
      <div className="extension-hr"></div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardCard;
