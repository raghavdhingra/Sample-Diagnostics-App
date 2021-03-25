import React, { useCallback, useState } from 'react';
import DashboardCard from './dashboardCard';

const SystemData = () => {
  const [fetchState, setFetchState] = useState(false);
  const [fetchValue, setFetchValue] = useState([]);

  const systemData = [
    { name: 'CPU usage', value: 85, key: 'GET_CPU_INFO' },
    { name: 'Storage', value: 20, key: 'GET_STORAGE_INFO' },
    { name: 'Display', value: 55, key: 'GET_DISPLAY_INFO' },
    { name: 'Memory', value: 100, key: 'GET_MEMORY_INFO' },
  ];
  const getSystemInfo = useCallback(() => {
    var editorExtensionId = 'nknchceahdhjncibfbjajiiiaepbfdlk';
    let chrome = window.chrome;
    chrome.runtime.sendMessage(
      editorExtensionId,
      { message: fetchValue },
      (response) => {
        console.log(response);
        if (fetchState) {
          setTimeout(() => {
            getSystemInfo();
          }, 3000);
        }
      }
    );
  }, [fetchState, fetchValue]);
  return (
    <>
      <button onClick={getSystemInfo}>Refresh</button>
      <div className="dashboard-container">
        {systemData.map((data, index) => (
          <DashboardCard
            key={`system-data-${index}`}
            index={index}
            header={data.name}
            value={data.value}
            cardKey={data.key}
            cardValue={fetchValue}
            changeCardValue={setFetchValue}
          />
        ))}
      </div>
    </>
  );
};

export default SystemData;
