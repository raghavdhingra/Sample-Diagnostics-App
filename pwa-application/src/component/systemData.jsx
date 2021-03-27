import React, { useCallback, useEffect, useMemo, useState } from 'react';
import EDIT_ICON from '../assets/images/edit.svg';
import DashboardCard from './utilisationCard';
import LineChart from '../common/charts/lineChart';
import PieChart from '../common/charts/pieChart';

const SystemData = ({ editorExtensionId, changeExtensionId }) => {
  let [globalStateInterval, setGlobalStateInterval] = useState(null);

  const [stateInterval, setStateInterval] = useState(5);
  const systemArray = useMemo(
    () => ['GET_CPU_INFO', 'GET_STORAGE_INFO', 'GET_MEMORY_INFO'],
    []
  );

  const [memoryState, setMemoryState] = useState({
    total: 0,
    available: 0,
  });
  const [usedMemorySeries, setUsedMemorySeries] = useState([]);

  const [storageUsage, setStorageUsage] = useState([]);

  const processData = ({ cpuInfo, memoryInfo, storageInfo }) => {
    // Memory Info
    if (memoryInfo) {
      let usedPercentage =
        (toGiB(memoryInfo.capacity - memoryInfo.availableCapacity) /
          toGiB(memoryInfo.capacity)) *
        100;
      usedPercentage = Math.round(usedPercentage * 1e2) / 1e2;
      setMemoryState({
        available: memoryInfo.availableCapacity,
        total: memoryInfo.capacity,
      });
      usedMemorySeries.push(usedPercentage);
      if (usedMemorySeries.length > 10) usedMemorySeries.shift();
      setUsedMemorySeries(usedMemorySeries);
    }

    // Storage Info
    if (storageInfo) setStorageUsage(storageInfo);
  };
  const getSystemInfo = () => {
    return new Promise((res, rej) => {
      try {
        window.chrome.runtime.sendMessage(
          editorExtensionId,
          {
            message: systemArray,
          },
          (resp) => {
            return res(resp);
          }
        );
      } catch (err) {
        clearInterval(globalStateInterval);
        setGlobalStateInterval(null);
        return rej('Invalid Extension ID');
      }
    });
  };

  const changeInterval = (e) => {
    let timeVal = parseInt(e.target.value);
    clearInterval(globalStateInterval);
    setGlobalStateInterval(null);
    setStateInterval(timeVal);
  };
  useEffect(() => {
    let yo = async () => {
      let response = await getSystemInfo();
      processData(response);
    };
    yo();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (editorExtensionId) {
      clearInterval(globalStateInterval);
      setGlobalStateInterval(null);
      const newglobalStateInterval = setInterval(async () => {
        try {
          let response = await getSystemInfo();
          processData(response);
        } catch (err) {
          alert(err);
        }
      }, stateInterval * 1000);
      setGlobalStateInterval(newglobalStateInterval);
    }
    // eslint-disable-next-line
  }, [stateInterval, editorExtensionId]);

  const toGiB = (byte) => {
    return Math.round((byte / (1024 * 1024 * 1024)) * 1e2) / 1e2;
  };

  return (
    <>
      <div className="dashboard-header">
        <div className="dashboard-left-grid">
          <div className="centralise">Extension id: {editorExtensionId} </div>
          <div className="centralise">
            <img
              src={EDIT_ICON}
              alt="edit icon"
              width="15px"
              className="help-icon"
              onClick={() => changeExtensionId(true)}
            />
          </div>
        </div>
        <div>
          <select
            value={stateInterval}
            className="dashboard-timer-select"
            onChange={(e) => changeInterval(e)}
          >
            <option value="1">1 second</option>
            <option value="2">2 second</option>
            <option value="3">3 second</option>
            <option value="5">5 second</option>
            <option value="10">10 second</option>
            <option value="15">15 second</option>
            <option value="20">20 second</option>
            <option value="30">30 seconds</option>
            <option value="60">60 seconds</option>
          </select>
        </div>
      </div>
      <div className="">
        <DashboardCard header="CPU Usage">
          <div className="system-process-graph"></div>
        </DashboardCard>
        <DashboardCard header="RAM Usage">
          <div className="system-process-graph-3">
            <div>Total Memory Available: {toGiB(memoryState.total)} GiB</div>
            <div>Available Memory: {toGiB(memoryState.available)} GiB</div>
            <div>
              Used Memory: {toGiB(memoryState.total - memoryState.available)}{' '}
              GiB
            </div>
          </div>
          <div className="extension-hr"></div>
          <div className="system-process-graph">
            <div className="align-center">
              <LineChart
                series={[
                  { name: 'Memory Utilization', data: usedMemorySeries },
                ]}
                id="memory-utilization"
              />
            </div>
            <div className="align-center">
              <PieChart
                series={[
                  toGiB(memoryState.available),
                  toGiB(memoryState.total - memoryState.available),
                ]}
                label={['Available memory', 'Used memory']}
              />
            </div>
          </div>
        </DashboardCard>
        <DashboardCard series={memoryState} chart="pie" header="Storage Usage">
          {storageUsage && (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Type</td>
                  <td>Storage</td>
                </tr>
              </thead>
              <tbody>
                {storageUsage.map((storage, index) => (
                  <tr>
                    <td>{storage.name}</td>
                    <td>{storage.type}</td>
                    <td>{toGiB(storage.capacity)} GiB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </DashboardCard>
      </div>
    </>
  );
};

export default SystemData;
