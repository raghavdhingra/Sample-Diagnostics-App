import React from 'react';
import Chart from 'react-apexcharts';

const PieChart = ({ series, label }) => {
  const colorArray = ['#d6acf7', '#ff6598', '#a4aab5', '#e5da82', '#28e1ae'];
  const defaultSeries = [100000, 99324];

  const state = {
    series: series ? series : defaultSeries,
    options: {
      chart: {
        width: 380,
        type: 'donut',
      },
      colors: colorArray,
      labels: label ? label : [],
      responsive: [
        {
          breakpoint: 1400,
          options: {
            chart: {
              width: 360,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        width="500"
      />
    </>
  );
};

export default PieChart;
