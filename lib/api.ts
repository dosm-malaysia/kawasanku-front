import axios from "axios";
import {
  IAreaOptions,
  IBarChartData,
  IChoroplethData,
  IDoughnutChartData,
  IGeojson,
  IJitterplotData,
} from "./interfaces";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getStatePaths = async () =>
  await API.get<string[]>("/links?type=state").then(res => res.data);

export const getAreaPaths = async () =>
  await API.get<{ district: string[]; parlimen: string[]; dun: string[] }>(
    "/links"
  ).then(res => {
    const { district, parlimen, dun } = res.data;
    return [...district, ...parlimen, ...dun];
  });

type GetGeojsonReq = {
  area: string;
};

export const getGeojson = async ({ area }: GetGeojsonReq) =>
  await API.get<IGeojson>(`/geo?area=${area}`).then(res => {
    const geojsonData = res.data;
    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: geojsonData.shape_type,
            coordinates: geojsonData.coordinates,
          },
        },
      ],
    };
  });

type GetSnapshotReq = {
  area: string;
};

export const getSnapshot = async ({ area }: GetSnapshotReq) =>
  await API.get<{
    doughnut_charts: { [key: string]: IDoughnutChartData[] }[];
    pyramid_charts: IBarChartData[];
  }>(`/snapshot?area=${area}`).then(res => {
    const formattedDoughnutCharts: { [key: string]: IDoughnutChartData[] } = {};
    res.data.doughnut_charts.forEach(chart => {
      Object.entries(chart).forEach(([key, value]) => {
        formattedDoughnutCharts[key] = value;
      });
    });

    return { ...res.data, doughnut_charts: formattedDoughnutCharts };
  });

type GetDoughnutChartsReq = {
  state: string;
  area: string;
};

export const getDoughnutCharts = async ({
  state,
  area,
}: GetDoughnutChartsReq) =>
  await API.get<{ [key: string]: IDoughnutChartData[] }[]>("/doughnut", {
    params: {
      state,
      area,
    },
  }).then(res => {
    const formattedDoughnutCharts: { [key: string]: IDoughnutChartData[] } = {};
    res.data.forEach(chart => {
      Object.entries(chart).forEach(([key, value]) => {
        formattedDoughnutCharts[key] = value;
      });
    });

    return formattedDoughnutCharts;
  });

type GetJitterplotsReq = {
  area: string;
};

export const getJitterplots = async ({ area }: GetJitterplotsReq) =>
  await API.get<{ [key: string]: IJitterplotData[] }[]>(
    `/jitter?area=${area}`
  ).then(res => {
    const new_jitterplots: { [key: string]: IJitterplotData[] } = {};

    Object.values(res.data).forEach(metric => {
      Object.entries(metric).forEach(([key, value]) => {
        new_jitterplots[key] = value;
      });
    });

    return new_jitterplots;
  });

type GetAreaOptionsReq = {
  state?: string;
  filter: string;
};

export const getAreaOptions = async ({ state, filter }: GetAreaOptionsReq) =>
  await API.get<IAreaOptions[]>("/dropdown", {
    params: {
      state,
      filter,
    },
  }).then(res => res.data);

export const getAreaType = async (area: string) =>
  await API.get<{ area_type: string; area_name: string }>(
    `/area-type?area=${area}`
  ).then(res => res.data);

type GetChoroplethReq = {
  metric: string;
  geoFilter: string;
};

export const getChoropleth = async ({ metric, geoFilter }: GetChoroplethReq) =>
  await API.get<IChoroplethData[]>("/choropleth", {
    params: {
      metric: metric,
      filter: geoFilter,
    },
  }).then(res => res.data);
