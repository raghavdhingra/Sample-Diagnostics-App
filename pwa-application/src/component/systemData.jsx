import React, { useState } from 'react';
import DashboardCard from './dashboardCard';

const SystemData = () => {
  const [fetchState, setFetchState] = useState(false);

  const systemData = [
    { name: 'CPU usage', value: 85 },
    { name: 'Memory', value: 20 },
    { name: 'RAM usage', value: 55 },
  ];
  const sendMessage = () => {
    var editorExtensionId = 'nknchceahdhjncibfbjajiiiaepbfdlk';
    let chrome = window.chrome;
    chrome.runtime.sendMessage(
      editorExtensionId,
      { message: 'GET_CPU_USAGE' },
      (response) => {
        console.log(response);
        if (fetchState) {
          setTimeout(() => {
            sendMessage();
          }, 3000);
        }
      }
    );
  };
  return (
    <>
      <button onClick={sendMessage}>Refresh</button>
      <div className="dashboard-container">
        {systemData.map((data, index) => (
          <DashboardCard
            key={`system-data-${index}`}
            index={index}
            header={data.name}
            value={data.value}
          />
        ))}
      </div>
    </>
  );
};

export default SystemData;
