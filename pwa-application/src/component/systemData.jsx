import React from 'react';
import DashboardCard from './dashboardCard';

const SystemData = () => {
  const systemData = [
    { name: 'CPU usage', value: 85 },
    { name: 'Memory', value: 20 },
    { name: 'RAM usage', value: 55 },
  ];
  return (
    <>
      {systemData.map((data, index) => (
        <DashboardCard index={index} header={data.name} value={data.value} />
      ))}
    </>
  );
};

export default SystemData;
