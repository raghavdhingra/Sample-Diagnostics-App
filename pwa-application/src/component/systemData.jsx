import React, { useEffect, useMemo, useState } from 'react';
import DashboardCard from './dashboardCard';

const SystemData = ({ editorExtensionId }) => {
  let globalStateInterval;
  const [stateInterval, setStateInterval] = useState(1);
  // const [fetchState, setFetchState] = useState(false);
  const systemArray = useMemo(
    () => [
      'GET_CPU_INFO',
      'GET_STORAGE_INFO',
      'GET_DISPLAY_INFO',
      'GET_MEMORY_INFO',
    ],
    []
  );

  const systemData = [
    { name: 'CPU usage', value: 85, key: 'GET_CPU_INFO' },
    { name: 'Storage', value: 20, key: 'GET_STORAGE_INFO' },
    { name: 'Memory', value: 100, key: 'GET_MEMORY_INFO' },
  ];
  const getSystemInfo = () => {
    try {
      window.chrome.runtime.sendMessage(
        editorExtensionId,
        {
          message: systemArray,
        },
        (res) => console.log(res)
      );
    } catch (err) {
      clearInterval(globalStateInterval);
      console.log(err);
    }
  };

  const changeInterval = (e) => {
    let timeVal = parseInt(e.target.value);
    clearInterval(globalStateInterval);
    setStateInterval(timeVal);
    globalStateInterval = setInterval(() => {
      getSystemInfo();
    }, timeVal * 1000);
  };

  useEffect(() => {
    if (editorExtensionId) {
      clearInterval(globalStateInterval);
      // eslint-disable-next-line
      globalStateInterval = setInterval(() => {
        getSystemInfo();
      }, stateInterval * 1000);
    }
  }, [editorExtensionId]);

  return (
    <>
      <div className="system-data-header">
        <div className="centralise">
          <div>
            <input type="text" />
            <div>:pencil:</div>
          </div>
        </div>
        <select value={stateInterval} onChange={(e) => changeInterval(e)}>
          <option value="1">1 second</option>
          <option value="2">2 second</option>
          <option value="3">3 second</option>
          <option value="5">5 second</option>
          <option value="10">10 second</option>
          <option value="15">15 second</option>
          <option value="20">20 second</option>
          <option value="30">30 second</option>
          <option value="60">60 second</option>
        </select>
        <button className="fetch-system-data-button">Check extension</button>
      </div>
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
