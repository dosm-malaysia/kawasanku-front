import { DataFrame } from "danfojs";
import { useEffect, useState } from "react";

import { PieChart } from ".";
import Card from "../../Card";
import { SNAPSHOT_COLUMNS } from "../../../lib/constants";
import snapshotJson from "../../../data/json/snapshot.json";
import { useLocationContext } from "../../../contexts/GeoFiltersContext";

const ReligionPieChart = () => {
  const { geoFilter, state, area } = useLocationContext();

  // TODO: retrieve actual snapshot data from Putrajaya as initial data
  const [muslim, setMuslim] = useState(65);
  const [christian, setChristian] = useState(10);
  const [buddhist, setBuddhist] = useState(10);
  const [hindu, setHindu] = useState(5);
  const [atheist, setAtheist] = useState(2);
  const [other, setOther] = useState(3);

  useEffect(() => {
    const df = new DataFrame(snapshotJson);

    const areaType = (geoFilter as string) || "state";
    const areaName = area || state;

    const sub_df = df.loc({
      rows: df["area_type"].eq(areaType).and(df["area"].eq(areaName)),
      columns: [
        SNAPSHOT_COLUMNS.Muslim,
        SNAPSHOT_COLUMNS.Christian,
        SNAPSHOT_COLUMNS.Buddhist,
        SNAPSHOT_COLUMNS.Hindu,
        SNAPSHOT_COLUMNS.Atheist,
        SNAPSHOT_COLUMNS.OtherReligion,
      ],
    });

    setMuslim(sub_df[SNAPSHOT_COLUMNS.Muslim].values[0]);
    setChristian(sub_df[SNAPSHOT_COLUMNS.Christian].values[0]);
    setBuddhist(sub_df[SNAPSHOT_COLUMNS.Buddhist].values[0]);
    setHindu(sub_df[SNAPSHOT_COLUMNS.Hindu].values[0]);
    setAtheist(sub_df[SNAPSHOT_COLUMNS.Atheist].values[0]);
    setOther(sub_df[SNAPSHOT_COLUMNS.OtherReligion].values[0]);
  }, [state, area]);

  const data = {
    labels: ["Muslim", "Christian", "Buddhist", "Hindu", "Atheist", "Other"],
    datasets: [
      {
        data: [muslim, christian, buddhist, hindu, atheist, other],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  return (
    <Card>
      <p className="doughnut-chart-title">Religion</p>
      <PieChart data={data} />
    </Card>
  );
};

export default ReligionPieChart;
