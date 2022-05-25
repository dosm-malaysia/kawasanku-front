import { IDoughnutChartData } from "./interfaces";

export const translateDoughnutChart = (
  translationStore: any,
  chartData: IDoughnutChartData[]
) => {
  return chartData.map((data) => {
    return {
      ...data,
      id: translationStore["doughnut"][data.id],
    };
  });
};
