// -----------------------------------------------------------------------------
// GEO MAPPING
// -----------------------------------------------------------------------------

export interface IGeoSelection {
  state_key: string;
  state: string;
  area_type: string;
  area: string;
}

// -----------------------------------------------------------------------------
// JITTERPLOT CHART
// -----------------------------------------------------------------------------
export interface IJitterplotData {
  id: string;
  data: [
    {
      x: number; // normalized value
      y: number; // random value to simulate jitter
    }
  ];
}

export interface IJitterplots {
  metric_1: IJitterplotData[];
  metric_2: IJitterplotData[];
  metric_3: IJitterplotData[];
  metric_4: IJitterplotData[];
  metric_5: IJitterplotData[];
  metric_6: IJitterplotData[];
  metric_7: IJitterplotData[];
  metric_8: IJitterplotData[];
  metric_9: IJitterplotData[];
  metric_10: IJitterplotData[];
  metric_11: IJitterplotData[];
  metric_12: IJitterplotData[];
  metric_13: IJitterplotData[];
  metric_14: IJitterplotData[];
  metric_15: IJitterplotData[];
  metric_16: IJitterplotData[];
  metric_17: IJitterplotData[];
  metric_18: IJitterplotData[];
  metric_19: IJitterplotData[];
  metric_20: IJitterplotData[];
  metric_21: IJitterplotData[];
  metric_22: IJitterplotData[];
  metric_23: IJitterplotData[];
  metric_24: IJitterplotData[];
  metric_25: IJitterplotData[];
  metric_26: IJitterplotData[];
  metric_27: IJitterplotData[];
}

// EXAMPLE
// [
//   {
//     id: "Perak",
//     data: [
//       {
//         x: 1,
//         y: 2,
//       },
//     ],
//   },
//   {
//     id: "Selangor",
//     data: [
//       {
//         x: 1,
//         y: 2,
//       },
//     ],
//   },
//   // ...
// ];

// -----------------------------------------------------------------------------
// DOUGHNUT CHART
// -----------------------------------------------------------------------------
export interface IDoughnutChartData {
  id: string; // e.g. sex_female, ethnicity_other
  value: number;
}

export interface ISnapshot {
  sex: IDoughnutChartData[];
  ethnicity: IDoughnutChartData[];
  nationality: IDoughnutChartData;
  age_group: IDoughnutChartData;
  religion: IDoughnutChartData;
  marital_status: IDoughnutChartData;
  households: IDoughnutChartData;
  employment_status: IDoughnutChartData;
}

// EXAMPLE
// [
//   { id: "sex_female", value: 50 },
//   { id: "sex_male", value: 50 },
// ];

// -----------------------------------------------------------------------------
// PYRAMID STACKED BAR CHART
// -----------------------------------------------------------------------------
export interface IBarChartData {
  // keys must be in this exact order
  id: string; // age range
  male_surplus: number; // negative of actual value
  male: number; // negative of actual value
  female: number;
  female_surplus: number;
}

// EXAMPLE
// [
//   {
//     id: "0-4",
//     male_surplus: -2,
//     male: -48,
//     female: 47,
//     female_surplus: 3,
//   },
//   {
//     id: "5-9",
//     male_surplus: -2,
//     male: -48,
//     female: 47,
//     female_surplus: 3,
//   },
//   // ...
// ];
