const path = require("path");
const fs = require("fs").promises;

const STATES = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Perak",
  "Perlis",
  "Pulau Pinang",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "W.P. Kuala Lumpur",
  "W.P. Labuan",
  "W.P. Putrajaya",
];

const files = [
  // data files
  fs.readFile(path.join(process.cwd(), "/data/csv/jitter.csv"), "utf8"),
  fs.readFile(path.join(process.cwd(), "/data/csv/snapshot.csv"), "utf8"),
  // mapping files
  fs.readFile(
    path.join(process.cwd(), "/data/csv/geo_state_district_mukim.csv"),
    "utf8"
  ),
  fs.readFile(
    path.join(process.cwd(), "/data/csv/geo_state_parliament_sla.csv"),
    "utf8"
  ),
];

Promise.all(files).then((data) => {
  // JITTER DATA
  const jitterFile = data[0];

  // split each line into an array
  let jitterArr = jitterFile.split("\n");
  // get column headers
  const jitterCols = jitterArr.shift().trim().split(",");

  let jitterJson = [];
  jitterArr.forEach((row) => {
    const cleanRow = row.trim();
    const rowObj = {};
    cleanRow.split(",").forEach((col, i) => {
      rowObj[jitterCols[i]] = col;
    });
    jitterJson.push(rowObj);
  });

  // SNAPSHOT DATA
  const snapshotFile = data[1];

  // split each line into an array
  let snapshotArr = snapshotFile.split("\n");
  // get column headers
  const snapshotCols = snapshotArr.shift().trim().split(",");

  let snapshotJson = [];
  snapshotArr.forEach((row) => {
    const cleanRow = row.trim();
    const rowObj = {};
    cleanRow.split(",").forEach((col, i) => {
      rowObj[snapshotCols[i]] = col;
    });
    snapshotJson.push(rowObj);
  });

  // MAPPING DATA
  let mapping = {};
  STATES.forEach((state) => {
    mapping[state] = {
      district: new Set(),
      mukim: [],
      parliament: new Set(),
      sla: [],
    };
  });

  const geoStateDistrictMukimFile = data[2];
  const geoStateParliamentSlaFile = data[3];

  // split each line into an array
  let geoStateDistrictMukimArr = geoStateDistrictMukimFile.split("\n");
  let geoStateParliamentSlaArr = geoStateParliamentSlaFile.split("\n");

  // remove column headers
  geoStateDistrictMukimArr.shift();
  geoStateParliamentSlaArr.shift();

  geoStateDistrictMukimArr.forEach((row) => {
    const cleanRow = row.trim();
    const arr = cleanRow.split(",");

    if (arr.length === 3) {
      let state = arr[0];
      let district = arr[1];
      let mukim = arr[2];

      if (!mapping[state]) {
        console.log(`${state} not found in mapping`);
      }

      if (district) mapping[state]["district"].add(district);
      if (mukim) mapping[state]["mukim"].push(mukim);
    }
  });

  geoStateParliamentSlaArr.forEach((row) => {
    const cleanRow = row.trim();
    const arr = cleanRow.split(",");

    if (arr.length === 3) {
      let state = arr[0];
      let parliament = arr[1];
      let sla = arr[2];

      if (parliament) mapping[state]["parliament"].add(parliament);
      if (sla) mapping[state]["sla"].push(sla);
    }
  });

  let serializedMapping = mapping;
  STATES.forEach((state) => {
    serializedMapping[state]["district"] = Array.from(
      mapping[state]["district"]
    );
    serializedMapping[state]["parliament"] = Array.from(
      mapping[state]["parliament"]
    );
  });

  // write to file
  const writeFiles = [
    fs.writeFile(
      path.join(process.cwd(), "data/json/jitter.json"),
      JSON.stringify(jitterJson)
    ),
    fs.writeFile(
      path.join(process.cwd(), "data/json/snapshot.json"),
      JSON.stringify(snapshotJson)
    ),
    fs.writeFile(
      path.join(process.cwd(), "data/json/mapping.json"),
      JSON.stringify(serializedMapping)
    ),
  ];

  Promise.all(writeFiles).then(() => {
    console.log("---- FILES WRITTEN ----");
    console.log("data/json/jitter.json");
    console.log("data/json/snapshot.json");
    console.log("data/json/mapping.json");
    console.log("-----------------------");
  });
});
