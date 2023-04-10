import React from 'react';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type BarChartProps = {
  attendanceArr: number[],
  eventNameArr: string[],
}

export default function EventBarChart({ attendanceArr, eventNameArr }: BarChartProps) {
  if (attendanceArr.length == 1) {return;}

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Attendance Count',
      },
    },
  };

  const labels = eventNameArr;

  const data = {
    labels,
    datasets: [
      {
        data: attendanceArr,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Bar options={options} data={data} />
  );
}
