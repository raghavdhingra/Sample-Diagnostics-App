import React, { useEffect, useMemo, useState } from 'react';
import DashboardCard from './dashboardCard';

const SystemData = ({ editorExtensionId, setEditorExtensionId }) => {
  let globalStateInterval;
  const [localExtensionId, setLocalExtensionId] = useState(editorExtensionId);
  const [isChange, setIsChange] = useState(false);
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
            <label>Chrome Extension ID: </label>
            <input
              type="text"
              value={localExtensionId}
              className={`extension-id-input ${
                isChange ? '' : 'extension-id-input-edit'
              }`}
              placeholder="Chrome Extension ID"
              readOnly={!isChange}
              onChange={(e) => setLocalExtensionId(e.target.value)}
            />
          </div>
        </div>
        <div>
          {isChange ? (
            <>
              <button
                className="fetch-system-data-button"
                onClick={() => {
                  setIsChange(false);
                  setEditorExtensionId(localExtensionId);
                }}
              >
                Save
              </button>
              <button
                className="fetch-system-data-button back-danger"
                onClick={() => {
                  setIsChange(false);
                  setLocalExtensionId(editorExtensionId);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="fetch-system-data-button"
              onClick={() => setIsChange(true)}
            >
              Change extension id
            </button>
          )}
        </div>
        <div className="centralise">
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
        </div>
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
