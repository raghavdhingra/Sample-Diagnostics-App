import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';

const LineChart = ({ series, max, id, title }) => {
  let state = {
    options: {
      responsive: [
        {
          breakpoint: 1400,
          options: {
            chart: {
              width: 380,
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
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      chart: {
        type: 'line',
        id,
        height: 350,
        zoom: {
          enabled: true,
        },
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000,
          },
        },
      },
      stroke: {
        curve: 'straight',
      },
      yaxis: {
        max: max ? max : 100,
        min: 0,
      },
      title: {
        text: title,
        align: 'left',
      },
    },
  };

  useEffect(() => {
    window.ApexCharts.exec(id, 'updateSeries', series);
    // eslint-disable-next-line
  }, [series, id, series[0].data.length]);

  return (
    <>
      <Chart
        options={state.options}
        series={[...series]}
        type="line"
        width="500"
      />
    </>
  );
};

export default LineChart;
