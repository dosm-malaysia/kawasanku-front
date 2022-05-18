import { promises as fs } from "fs";

export const readFile = async (filePath: string) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getGeoFilterMapping = (csvFile: string) => {
  type MappingType = {
    [key: string]: {
      [key: string]: string[];
    };
  };

  const mapping: MappingType = {};

  let rawArr = csvFile.split("\n");

  // remove column headers
  rawArr.shift();

  rawArr.forEach((line) => {
    let arr = line.split(",");

    if (arr.length === 3) {
      let state = arr[0];
      let district = arr[1];
      let mukim = arr[2];

      if (!mapping.hasOwnProperty(state)) {
        mapping[state] = {};
      }
      if (!mapping[state].hasOwnProperty(district)) {
        mapping[state][district] = [];
      }
      mapping[state][district].push(mukim);
    }
  });

  return mapping;
};

// used to preprocess mappings in lib/mapping.ts
export const getMappingsFromFile = async () => {
  const stateDistrictMukimFile = await readFile(
    "public/data/geo_state_district_mukim.csv"
  );
  const stateParliamentSlaFile = await readFile(
    "public/data/geo_state_parliament_sla.csv"
  );

  let stateDistrictMukimMapping, stateParliamentSlaMapping;

  if (stateDistrictMukimFile)
    stateDistrictMukimMapping = getGeoFilterMapping(stateDistrictMukimFile);
  if (stateParliamentSlaFile)
    stateParliamentSlaMapping = getGeoFilterMapping(stateParliamentSlaFile);

  return {
    stateDistrictMukimMapping,
    stateParliamentSlaMapping,
  };
};
