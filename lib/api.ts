import axios from "axios";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getStatePaths = async () =>
  await API.get<string[]>("/links?type=state").then((res) => res.data);

export const getAreaPaths = async () =>
  await API.get<string[]>("/links?type=area").then((res) => res.data);
