import { DataFrame } from "danfojs";
import { useEffect, useState } from "react";

import { PieChart } from ".";
import Card from "../../Card";
import { SNAPSHOT_COLUMNS } from "../../../lib/constants";
import snapshotJson from "../../../data/json/snapshot.json";
import { useLocationContext } from "../../../contexts/GeoFiltersContext";

const EthnicityPieChart = () => {
  const { geoFilter, state, area } = useLocationContext();

  // TODO: retrieve actual snapshot data from Putrajaya as initial data
  const [bumi, setBumi] = useState(65);
  const [chinese, setChinese] = useState(20);
  const [indian, setIndian] = useState(10);
  const [other, setOther] = useState(5);

  useEffect(() => {
    const df = new DataFrame(snapshotJson);

    const areaType = (geoFilter as string) || "state";
    const areaName = area || state;

    const sub_df = df.loc({
      rows: df["area_type"].eq(areaType).and(df["area"].eq(areaName)),
      columns: [
        SNAPSHOT_COLUMNS.Bumi,
        SNAPSHOT_COLUMNS.Chinese,
        SNAPSHOT_COLUMNS.Indian,
        SNAPSHOT_COLUMNS.OtherEthnicity,
      ],
    });

    setBumi(sub_df[SNAPSHOT_COLUMNS.Bumi].values[0]);
    setChinese(sub_df[SNAPSHOT_COLUMNS.Chinese].values[0]);
    setIndian(sub_df[SNAPSHOT_COLUMNS.Indian].values[0]);
    setOther(sub_df[SNAPSHOT_COLUMNS.OtherEthnicity].values[0]);
  }, [state, area]);

  const data = {
    labels: ["Bumi", "Indian", "Chinese", "Other"],
    datasets: [
      {
        data: [bumi, indian, chinese, other],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
      },
    ],
  };

  return (
    <Card>
      <p className="doughnut-chart-title">Ethnicity</p>
      <PieChart data={data} />
    </Card>
  );
};

export default EthnicityPieChart;
