import React from 'react';
import DashboardCard from './dashboardCard';

const SystemState = () => {
  const systemData = [
    { name: 'Bluetooth device connected', value: 0 },
    { name: 'Battery charging state', value: 'Yes' },
  ];
  return (
    <>
      <div className="dashboard-container">
        {systemData.map((data, index) => (
          <DashboardCard
            key={`system-state-${index}`}
            index={index}
            header={data.name}
            value={data.value}
          />
        ))}
      </div>
    </>
  );
};

export default SystemState;
