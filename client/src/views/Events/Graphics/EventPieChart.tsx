import React, {useState} from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

type PieChartProps = {
  attendance: number,
  totalMembers: number,
}

export default function EventPieChart({ attendance, totalMembers }: PieChartProps) {
  const [difference, setDifference] = useState(totalMembers - attendance);

  if (difference < 0) {
    setDifference(0)
  }

  const data = {
    labels: ["Attendees", "Non-Attendees"],
    options: {animations: false},
    datasets: [
      {
        label: "#",
        data: [attendance, difference],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Pie
      data={data}
    />
  )
}