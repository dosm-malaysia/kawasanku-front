import { promises as fs } from "fs";
import {
  STATES,
  GEO_FILTER,
  GEO_STATE_DISTRICT_MUKIM_FILE_PATH,
  GEO_STATE_PARLIAMENT_SLA_FILE_PATH,
} from "./constants";

export const readFile = async (filePath: string) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getGeoFilterMapping = (sdmFile: string, spsFile: string) => {
  type MappingType = {
    [key in STATES]: {
      [GEO_FILTER.District]: Set<string>;
      [GEO_FILTER.Mukim]: string[];
      [GEO_FILTER.Parliament]: Set<string>;
      [GEO_FILTER.Assembly]: string[];
    };
  };

  // initialize mapping object
  let mapping = {} as MappingType;
  Object.values(STATES).forEach((state) => {
    mapping[state] = {
      [GEO_FILTER.District]: new Set(),
      [GEO_FILTER.Mukim]: [],
      [GEO_FILTER.Parliament]: new Set(),
      [GEO_FILTER.Assembly]: [],
    };
  });

  let rawSdmArr = sdmFile.split("\n");
  let rawSpsArr = spsFile.split("\n");

  // remove column headers
  rawSdmArr.shift();
  rawSpsArr.shift();

  rawSdmArr.forEach((line) => {
    let arr = line.split(",");

    if (arr.length === 3) {
      let state = arr[0] as STATES;
      let district = arr[1];
      let mukim = arr[2];

      if (district) mapping[state][GEO_FILTER.District].add(district);
      if (mukim) mapping[state][GEO_FILTER.Mukim].push(mukim);
    }
  });

  rawSpsArr.forEach((line) => {
    let arr = line.split(",");

    if (arr.length === 3) {
      let state = arr[0] as STATES;
      let parliament = arr[1];
      let assembly = arr[2];

      if (parliament) mapping[state][GEO_FILTER.Parliament].add(parliament);
      if (assembly) mapping[state][GEO_FILTER.Assembly].push(assembly);
    }
  });

  let serializedMapping: any = mapping;

  // serialize mapping
  Object.values(STATES).forEach((state) => {
    serializedMapping[state][GEO_FILTER.District] = Array.from(
      mapping[state][GEO_FILTER.District]
    );
    serializedMapping[state][GEO_FILTER.Parliament] = Array.from(
      mapping[state][GEO_FILTER.Parliament]
    );
  });

  return serializedMapping;
};

// used to preprocess mappings in lib/mapping.ts
export const getMappingsFromFile = async () => {
  const stateDistrictMukimFile = await readFile(
    GEO_STATE_DISTRICT_MUKIM_FILE_PATH
  );
  const stateParliamentSlaFile = await readFile(
    GEO_STATE_PARLIAMENT_SLA_FILE_PATH
  );

  let filterMapping;

  if (stateDistrictMukimFile && stateParliamentSlaFile) {
    filterMapping = getGeoFilterMapping(
      stateDistrictMukimFile,
      stateParliamentSlaFile
    );
  }

  return filterMapping;
};
