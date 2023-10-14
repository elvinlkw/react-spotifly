import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ genres }) => {
  let valueArray = [];
  for (let key in genres) {
    valueArray.push(genres[key]);
  }

  const data = {
    labels: Object.keys(genres),
    datasets: [
      {
        label: "% Genre",
        backgroundColor: "#36A2EB",
        borderColor: "#4BC0C0",
        borderWidth: 1,
        hoverBackgroundColor: "#71B37C",
        hoverBorderColor: "#36A2EB",
        data: valueArray,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-center">Top Genres</h1>
      <Bar data={data} options={{ indexAxis: "y" }} />
    </div>
  );
};

export default Chart;
