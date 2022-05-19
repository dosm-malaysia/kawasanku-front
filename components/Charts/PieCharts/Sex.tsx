import { DataFrame } from "danfojs";
import { useEffect, useState } from "react";

import { PieChart } from ".";
import Card from "../../Card";
import { SNAPSHOT_COLUMNS } from "../../../lib/constants";
import snapshotJson from "../../../data/json/snapshot.json";
import { useLocationContext } from "../../../contexts/GeoFiltersContext";

const SexPieChart = () => {
  const { geoFilter, state, area } = useLocationContext();

  const [male, setMale] = useState(60);
  const [female, setFemale] = useState(40);

  useEffect(() => {
    const df = new DataFrame(snapshotJson);

    const areaType = (geoFilter as string) || "state";
    const areaName = area || state;

    const sub_df = df.loc({
      rows: df["area_type"].eq(areaType).and(df["area"].eq(areaName)),
      columns: [SNAPSHOT_COLUMNS.Male, SNAPSHOT_COLUMNS.Female],
    });

    setMale(sub_df[SNAPSHOT_COLUMNS.Male].values[0]);
    setFemale(sub_df[SNAPSHOT_COLUMNS.Female].values[0]);
  }, [state, area]);

  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [male, female],
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      },
    ],
  };

  return (
    <Card>
      <p className="doughnut-chart-title">Sex</p>
      <PieChart data={data} />
    </Card>
  );
};

export default SexPieChart;
