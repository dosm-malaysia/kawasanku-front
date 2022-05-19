import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: ChartData<"doughnut">;
  options?: ChartOptions<"doughnut">;
}

export const PieChart = ({ data }: PieChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
        boxWidth: 10,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};
