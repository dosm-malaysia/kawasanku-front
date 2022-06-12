import {
  CHOROPLETH_BLUE_SCALE,
  CHOROPLETH_GREEN_SCALE,
  CHOROPLETH_METRICS,
  CHOROPLETH_RED_PURPLE_SCALE,
  CHOROPLETH_RED_SCALE,
  CHOROPLETH_YELLOW_GREEN_BLUE_SCALE,
  STATES_KEY,
} from "./constants";
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
    // reds
    return CHOROPLETH_RED_SCALE;
  } else if (choropleth === CHOROPLETH_METRICS.Treecover) {
    // greens
    return CHOROPLETH_GREEN_SCALE;
  } else if (choropleth === CHOROPLETH_METRICS.Water) {
    // blues
    return CHOROPLETH_BLUE_SCALE;
  } else if (
    choropleth === CHOROPLETH_METRICS.Nightlights ||
    choropleth === CHOROPLETH_METRICS.Electricity
  ) {
    // yellow_green_blue
    return CHOROPLETH_YELLOW_GREEN_BLUE_SCALE;
  } else {
    // red_purple
    return CHOROPLETH_RED_PURPLE_SCALE;
  }
};

export const getChoroplethBorderColor = (choropleth: CHOROPLETH_METRICS) => {
  if (
    choropleth === CHOROPLETH_METRICS.Electricity 
  ) {
    // darker border
    return #ffffff;
  } else {
    // regular light border
    return #f2f2f2;
  }
};
