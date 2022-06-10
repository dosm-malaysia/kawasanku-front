import { FunctionComponent } from "react";
import { ResponsiveChoroplethCanvas } from "@nivo/geo";

import { IChoroplethData } from "../../../lib/interfaces";
import { getChoroplethColors } from "../../../lib/helpers";
import { CHOROPLETH_METRICS, GEO_FILTER } from "../../../lib/constants";

import dunGeojson from "../../../geojson/dun.json";
import parlimenGeojson from "../../../geojson/parlimen.json";

interface ChoroplethChartProps {
  metric?: CHOROPLETH_METRICS;
  geoFilter?: GEO_FILTER.Parliament | GEO_FILTER.Dun;
  data: IChoroplethData[];
}

const ChoroplethChart: FunctionComponent<ChoroplethChartProps> = ({
  metric,
  geoFilter,
  data,
}) => {
  return (
    <div className="h-96">
      <ResponsiveChoroplethCanvas
        data={data}
        features={
          geoFilter === GEO_FILTER.Dun
            ? dunGeojson.features
            : parlimenGeojson.features
        }
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors={metric ? getChoroplethColors(metric) : ["#FFF"]}
        domain={[0, 100]}
        unknownColor="#fff"
        valueFormat=".2s"
        projectionScale={2000}
        projectionTranslation={[0.5, 1.05]}
        projectionRotation={[-114, 0, 0]}
        borderWidth={0.5}
        borderColor="#101b42"
        legends={[
          {
            anchor: "right",
            direction: "column",
            itemHeight: 14,
            itemWidth: 100,
          },
        ]}
      />
    </div>
  );
};

export default ChoroplethChart;
