import { DataFrame } from "danfojs";
import { useEffect, useState } from "react";

import { PieChart } from ".";
import Card from "../../Card";
import { SNAPSHOT_COLUMNS } from "../../../lib/constants";
import snapshotJson from "../../../data/json/snapshot.json";
import { useLocationContext } from "../../../contexts/GeoFiltersContext";

const DevelopmentPieChart = () => {
  const { geoFilter, state, area } = useLocationContext();

  // TODO: retrieve actual snapshot data from Putrajaya as initial data
  const [rural, setRural] = useState(35);
  const [urban, setUrban] = useState(65);

  useEffect(() => {
    const df = new DataFrame(snapshotJson);

    const areaType = (geoFilter as string) || "state";
    const areaName = area || state;

    const sub_df = df.loc({
      rows: df["area_type"].eq(areaType).and(df["area"].eq(areaName)),
      columns: [SNAPSHOT_COLUMNS.Urban, SNAPSHOT_COLUMNS.Rural],
    });

    setUrban(sub_df[SNAPSHOT_COLUMNS.Urban].values[0]);
    setRural(sub_df[SNAPSHOT_COLUMNS.Rural].values[0]);
  }, [state, area]);

  const data = {
    labels: ["Urban", "Rural"],
    datasets: [
      {
        data: [urban, rural],
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      },
    ],
  };

  return (
    <Card>
      <p className="doughnut-chart-title">Development status</p>
      <PieChart data={data} />
    </Card>
  );
};

export default DevelopmentPieChart;
