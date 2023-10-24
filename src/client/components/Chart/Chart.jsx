import React from "react";
import { useGetQuestionByIdQuery } from "../../reducers/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ questionId }) => {
  const { data = [], isLoading } = useGetQuestionByIdQuery(questionId);
  console.log(data, "chartData");
  if (isLoading) return <p>Loading...</p>;

  const chartData = {
    labels: data.Submission.map((sub) => sub.link),
    datasets: [
      {
        label: "# of Votes",
        data: data.Submission.map((sub) => sub.Vote.length),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 0.2)",
        borderWidth: 2,
      },
    ],
  };
  const options = {
    responsive: true,
  };

  return <Bar data={chartData} />;
  return;
};
export default Chart;
