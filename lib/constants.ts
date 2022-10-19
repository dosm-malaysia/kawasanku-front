export const MALAYSIA = "mys";

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

// only used for dropdown
export enum GEO_FILTER {
  District = "district",
  Parliament = "parlimen",
  Dun = "dun",
}

// used for comparisons
export enum AREA_TYPES {
  State = "state",
  District = "district",
  Parliament = "parlimen",
  Dun = "dun",
}

export enum STATES_KEY {
  JOHOR = "jhr",
  KEDAH = "kdh",
  KELANTAN = "ktn",
  MELAKA = "mlk",
  NEGERI_SEMBILAN = "nsn",
  PAHANG = "phg",
  PERAK = "prk",
  PERLIS = "pls",
  PULAU_PINANG = "png",
  SABAH = "sbh",
  SARAWAK = "swk",
  SELANGOR = "sgr",
  TERRENGGAU = "trg",
  KUALA_LUMPUR = "kul",
  LABUAN = "lbn",
  PUTRAJAYA = "pjy",
}

export enum CHOROPLETH_METRICS {
  MaxElevation = "max_elevation",
  Ruggedness = "ruggedness",
  Treecover = "treecover",
  Treeloss = "treeloss",
  Nightlights = "nightlights",
  PopulationDensity = "population_density",
  IncomeMean = "income_mean",
  ExpenditureMean = "expenditure_mean",
  Gini = "gini",
  Poverty = "poverty",
  Electricity = "electricity",
  Water = "water",
}

export const CHOROPLETH_PRICE_OPTION = Array(31)
  .fill(0)
  .map((_, index) => `item${index + 1}`);

export const CHOROPLETH_RED_SCALE = [
  "#FFF5F0",
  "#FEE0D2",
  "#FBBCA1",
  "#FC9272",
  "#FB694A",
  "#EF3B2C",
  "#CA191D",
  "#A40F15",
  "#67000D",
];

export const CHOROPLETH_GREEN_SCALE = [
  "#F7FCF5",
  "#E5F5E0",
  "#C8E8BF",
  "#A2D89B",
  "#74C476",
  "#42AB5D",
  "#238B44",
  "#026C2C",
  "#00451B",
];

export const CHOROPLETH_BLUE_SCALE = [
  "#F7FBFF",
  "#DEEBF7",
  "#C7DAEF",
  "#9DCAE0",
  "#6AAED6",
  "#4292C6",
  "#2270B5",
  "#08529C",
  "#092F6B",
];

export const CHOROPLETH_YELLOW_GREEN_BLUE_SCALE = [
  "#061E58",
  "#215FA8",
  "#215FA8",
  "#1D91C0",
  "#41B6C4",
  "#7FCDBB",
  "#C7E9B4",
  "#EDF8B1",
  "#FFFFD9",
];

export const CHOROPLETH_RED_PURPLE_SCALE = [
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

export enum BREAKPOINTS {
  SM = 640,
  MD = 768,
  LG = 1024,
  XL = 1440,
}
