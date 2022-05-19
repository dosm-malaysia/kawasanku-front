export const LANG = [
  {
    display: "EN",
    locale: "en-GB",
  },
  {
    display: "BM",
    locale: "ms-MY",
  },
  {
    display: "中",
    locale: "zh-CN",
  },
  {
    display: "த",
    locale: "ta-IN",
  },
];

export enum GEO_FILTER {
  District = "district",
  Mukim = "mukim",
  Parliament = "parliament",
  Assembly = "sla",
}

export enum STATES {
  JOHOR = "Johor",
  KEDAH = "Kedah",
  KELANTAN = "Kelantan",
  MELAKA = "Melaka",
  NEGERI_SEMBILAN = "Negeri Sembilan",
  PAHANG = "Pahang",
  PERAK = "Perak",
  PERLIS = "Perlis",
  PULAU_PINANG = "Pulau Pinang",
  SABAH = "Sabah",
  SARAWAK = "Sarawak",
  SELANGOR = "Selangor",
  TERRENGGAU = "Terengganu",
  KUALA_LUMPUR = "W.P. Kuala Lumpur",
  LABUAN = "W.P. Labuan",
  PUTRAJAYA = "W.P. Putrajaya",
}

export const GEO_STATE_DISTRICT_MUKIM_FILE_PATH =
  "public/static/data/geo_state_district_mukim.csv";

export const GEO_STATE_PARLIAMENT_SLA_FILE_PATH =
  "public/static/data/geo_state_parliament_sla.csv";
