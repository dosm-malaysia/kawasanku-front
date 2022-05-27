import axios from "axios";
import {
  IAreaOptions,
  IBarChartData,
  IDoughnutChartData,
  IGeojson,
  IJitterplotData,
} from "./interfaces";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getStatePaths = async () =>
  await API.get<string[]>("/links?type=state").then((res) => res.data);

export const getAreaPaths = async () =>
  await API.get<string[]>("/links?type=area").then((res) => res.data);

export const getGeojson = async (area: string) =>
  await API.get<IGeojson>(`/geo?area=${area}`).then((res) => {
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
  state: string;
  district?: string;
  parliamen?: string;
  dun?: string;
};

export const getSnapshot = async ({
  state,
  district,
  parliamen,
  dun,
}: GetSnapshotReq) =>
  await API.get<{
    doughnut_charts: { [key: string]: IDoughnutChartData[] }[];
    pyramid_charts: IBarChartData[];
  }>("/snapshot", {
    params: {
      state,
      ...(district && { district }),
      ...(parliamen && { parliamen }),
      ...(dun && { dun }),
    },
  }).then((res) => {
    const new_doughnut_charts: { [key: string]: IDoughnutChartData[] } = {};
    res.data.doughnut_charts.forEach((chart) => {
      Object.entries(chart).forEach(([key, value]) => {
        new_doughnut_charts[key] = value;
      });
    });

    return { ...res.data, doughnut_charts: new_doughnut_charts };
  });

type GetJitterplotsReq = {
  area: string;
};

export const getJitterplots = async ({ area }: GetJitterplotsReq) =>
  await API.get<{ [key: string]: IJitterplotData[] }[]>(
    `/jitter?area=${area}`
  ).then((res) => {
    const new_jitterplots: { [key: string]: IJitterplotData[] } = {};
    res.data.forEach((metric) => {
      Object.entries(metric).forEach(([key, value]) => {
        new_jitterplots[key] = value;
      });
    });

    return new_jitterplots;
  });

type GetAreaOptionsReq = {
  state: string;
  filter: string;
};

export const getAreaOptions = async ({ state, filter }: GetAreaOptionsReq) =>
  await API.get<IAreaOptions[]>("/dropdown", {
    params: {
      state,
      filter,
    },
  }).then((res) => res.data);
