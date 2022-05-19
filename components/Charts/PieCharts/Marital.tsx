import { DataFrame } from "danfojs";
import { useEffect, useState } from "react";

import { PieChart } from ".";
import Card from "../../Card";
import { SNAPSHOT_COLUMNS } from "../../../lib/constants";
import snapshotJson from "../../../data/json/snapshot.json";
import { useLocationContext } from "../../../contexts/GeoFiltersContext";

const MaritalPieChart = () => {
  const { geoFilter, state, area } = useLocationContext();

  // TODO: retrieve actual snapshot data from Putrajaya as initial data
  const [single, setSingle] = useState(30);
  const [married, setMarried] = useState(60);
  const [widowed, setWidowed] = useState(5);
  const [divorced, setDivorced] = useState(5);

  useEffect(() => {
    const df = new DataFrame(snapshotJson);

    const areaType = (geoFilter as string) || "state";
    const areaName = area || state;

    const sub_df = df.loc({
      rows: df["area_type"].eq(areaType).and(df["area"].eq(areaName)),
      columns: [
        SNAPSHOT_COLUMNS.Single,
        SNAPSHOT_COLUMNS.Married,
        SNAPSHOT_COLUMNS.Widowed,
        SNAPSHOT_COLUMNS.Divorced,
      ],
    });

    setSingle(sub_df[SNAPSHOT_COLUMNS.Single].values[0]);
    setMarried(sub_df[SNAPSHOT_COLUMNS.Married].values[0]);
    setWidowed(sub_df[SNAPSHOT_COLUMNS.Widowed].values[0]);
    setDivorced(sub_df[SNAPSHOT_COLUMNS.Divorced].values[0]);
  }, [state, area]);

  const data = {
    labels: ["Single", "Married", "Widowed", "Divorced"],
    datasets: [
      {
        data: [single, married, widowed, divorced],
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
      <p className="doughnut-chart-title">Marital status</p>
      <PieChart data={data} />
    </Card>
  );
};

export default MaritalPieChart;
