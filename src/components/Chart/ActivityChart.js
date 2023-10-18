import React from "react";
import { prettyDate } from "../../funktioner";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ activities, x }) {
  activities = activities.map((activity) => activity).reverse();
  const options = {
    type: "line",
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = activities.map((activity) => {
    return prettyDate(activity.start_date);
  });

  const data = {
    labels,
    datasets: [
      {
        label: x,
        data: activities.map((activity) => {
          return activity[x];
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  console.log(data);
  return <Line options={options} data={data}></Line>;
}

export default LineChart;
