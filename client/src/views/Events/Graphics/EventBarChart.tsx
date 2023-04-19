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
        text: '',
      },
    },
  };

  const labels = eventNameArr;

  const data = {
    labels,
    datasets: [
      {
        label: "Attendance",
        data: attendanceArr,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  if (attendanceArr.length == 1) {
    return (null)
  } else {
    return (
      <Bar options={options} data={data} />
    )
  }

}
