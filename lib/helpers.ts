import { IDoughnutChartData } from "./interfaces";

export const translateDoughnutChart = (
  translationStore: any,
  chartData: IDoughnutChartData[]
) => {
  return chartData.map(data => {
    return {
      ...data,
      id: translationStore["doughnut"][data.id],
    };
  });
};

export const formatKOrM = (n: number) => {
  if (n > 999999) return `${(n / 1000000).toFixed(1)}M`;
  else return n > 999 ? `${(n / 1000).toFixed(0)}k` : n;
};
