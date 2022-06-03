import { AnalyticsEvent, IDoughnutChartData } from "./interfaces";

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

/** https://developers.google.com/analytics/devguides/collection/gtagjs/pages  */
export const pageview = (url: string) => {
  window.gtag("config", process.env.NEXT_PUBLIC_GA_TAG as string, {
    page_path: url,
  });
};

/** https://developers.google.com/analytics/devguides/collection/gtagjs/events */
export const event = ({ action, category, label, value }: AnalyticsEvent) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
