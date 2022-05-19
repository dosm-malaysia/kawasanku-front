import { DataFrame } from "danfojs";
import { useEffect, useState } from "react";

import { PieChart } from ".";
import Card from "../../Card";
import { SNAPSHOT_COLUMNS } from "../../../lib/constants";
import snapshotJson from "../../../data/json/snapshot.json";
import { useLocationContext } from "../../../contexts/GeoFiltersContext";

const AgePieChart = () => {
  const { geoFilter, state, area } = useLocationContext();

  // TODO: retrieve actual snapshot data from Putrajaya as initial data
  const [child, setChild] = useState(20);
  const [working, setWorking] = useState(50);
  const [elderly, setElderly] = useState(30);

  useEffect(() => {
    const df = new DataFrame(snapshotJson);

    const areaType = (geoFilter as string) || "state";
    const areaName = area || state;

    const sub_df = df.loc({
      rows: df["area_type"].eq(areaType).and(df["area"].eq(areaName)),
      columns: [
        SNAPSHOT_COLUMNS.Child,
        SNAPSHOT_COLUMNS.Working,
        SNAPSHOT_COLUMNS.Elderly,
      ],
    });

    setChild(sub_df[SNAPSHOT_COLUMNS.Child].values[0]);
    setWorking(sub_df[SNAPSHOT_COLUMNS.Working].values[0]);
    setElderly(sub_df[SNAPSHOT_COLUMNS.Elderly].values[0]);
  }, [state, area]);

  const data = {
    labels: ["Children", "Working", "Elderly"],
    datasets: [
      {
        data: [child, working, elderly],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
      },
    ],
  };

  return (
    <Card>
      <p className="doughnut-chart-title">Age group</p>
      <PieChart data={data} />
    </Card>
  );
};

export default AgePieChart;
