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

export enum SNAPSHOT_COLUMNS {
  AreaType = "area_type",
  Area = "area",
  Male = "sex_male",
  Female = "sex_female",
  Bumi = "ethnicity_bumi",
  Chinese = "ethnicity_chinese",
  Indian = "ethnicity_indian",
  OtherEthnicity = "ethnicity_other",
  Muslim = "religion_muslim",
  Christian = "religion_christian",
  Buddhist = "religion_buddhist",
  Hindu = "religion_hindu",
  Atheist = "religion_atheist",
  OtherReligion = "religion_other",
  Urban = "dev_urban",
  Rural = "dev_rural",
  Single = "marital_never_married",
  Married = "marital_married",
  Widowed = "marital_widowed",
  Divorced = "marital_divorced",
  Child = "agegroup_child",
  Working = "agegroup_working",
  Elderly = "agegroup_elderly",
}
