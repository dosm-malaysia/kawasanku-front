import axios from "axios";
import { ISnapshot } from "./interfaces";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getStatePaths = async () =>
  await API.get<string[]>("/links?type=state").then((res) => res.data);

export const getAreaPaths = async () =>
  await API.get<string[]>("/links?type=area").then((res) => res.data);

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
  await API.get<{ doughnut_charts: ISnapshot }>("/snapshot", {
    params: {
      state,
      ...(district && { district }),
      ...(parliamen && { parliamen }),
      ...(dun && { dun }),
    },
  }).then((res) => res.data);
