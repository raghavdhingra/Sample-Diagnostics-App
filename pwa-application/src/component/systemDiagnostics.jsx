import React from 'react';
import DashboardCard from './dashboardCard';

const SystemDiagnostics = () => {
  const systemData = [
    { name: 'CPU stress test', value: 'Pass' },
    { name: 'Battery Charge test', value: 'Fail' },
    { name: 'RAM usage test', value: 'Pass' },
  ];
  return (
    <>
      <div className="dashboard-container">
        {systemData.map((data, index) => (
          <DashboardCard
            key={`system-diagnostics-${index}`}
            index={index}
            header={data.name}
            value={data.value}
          />
        ))}
      </div>
    </>
  );
};

export default SystemDiagnostics;
