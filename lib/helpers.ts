import { CHOROPLETH_METRICS, STATES_KEY } from "./constants";
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

export const isFederalTerritory = (stateKey: string) => {
  return (
    stateKey === STATES_KEY.KUALA_LUMPUR ||
    stateKey === STATES_KEY.LABUAN ||
    stateKey === STATES_KEY.PUTRAJAYA
  );
};

export const getChoroplethColors = (choropleth: CHOROPLETH_METRICS) => {
  if (
    choropleth === CHOROPLETH_METRICS.MaxElevation ||
    choropleth === CHOROPLETH_METRICS.Ruggedness ||
    choropleth === CHOROPLETH_METRICS.Treeloss ||
    choropleth === CHOROPLETH_METRICS.Gini ||
    choropleth === CHOROPLETH_METRICS.Poverty
  ) {
    // reds (inverted)
    return [
      "#67000D",
      "#A40F15",
      "#CA191D",
      "#EF3B2C",
      "#FB694A",
      "#FC9272",
      "#FBBCA1",
      "#FEE0D2",
      "#FFF5F0",
      "#FFFFFF",
    ];
  } else if (choropleth === CHOROPLETH_METRICS.Treecover) {
    // greens (inverted)
    return [
      "#00451B",
      "#026C2C",
      "#238B44",
      "#42AB5D",
      "#74C476",
      "#A2D89B",
      "#C8E8BF",
      "#E5F5E0",
      "#F7FCF5",
      "#FFFFFF",
    ];
  } else if (choropleth === CHOROPLETH_METRICS.Water) {
    // blues (inverted)
    return [
      "#092F6B",
      "#08529C",
      "#2270B5",
      "#4292C6",
      "#6AAED6",
      "#9DCAE0",
      "#C7DAEF",
      "#DEEBF7",
      "#F7FBFF",
      "#FFFFFF",
    ];
  } else if (
    choropleth === CHOROPLETH_METRICS.Nightlights ||
    choropleth === CHOROPLETH_METRICS.Electricity
  ) {
    // yellow_green_blue (inverted)
    return [
      "#061E58",
      "#215FA8",
      "#215FA8",
      "#1D91C0",
      "#41B6C4",
      "#7FCDBB",
      "#C7E9B4",
      "#EDF8B1",
      "#FFFFD9",
      "#FFFFFF",
    ];
  } else {
    // red_purple
    return [
      "#FFFFFF",
      "#FFF7F2",
      "#FDE0DD",
      "#FBC5C0",
      "#FBC5C0",
      "#FA9FB5",
      "#F768A1",
      "#DD3597",
      "#AD017E",
      "#7A0177",
      "#49006A",
    ];
  }
};
