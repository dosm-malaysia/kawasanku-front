import { FunctionComponent } from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { useWindowWidth } from "@react-hook/window-size";

import { IChoroplethData } from "../../../lib/interfaces";
import { getChoroplethColors } from "../../../lib/helpers";
import { getChoroplethBorderColor } from "../../../lib/helpers";
import {
  BREAKPOINTS,
  CHOROPLETH_METRICS,
  GEO_FILTER,
} from "../../../lib/constants";

import dunGeojson_mobile from "../../../geojson/dun_mobile.json";
import parlimenGeojson_mobile from "../../../geojson/parlimen_mobile.json";
import dunGeojson_desktop from "../../../geojson/dun_desktop.json";
import parlimenGeojson_desktop from "../../../geojson/parlimen_desktop.json";

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
  const width = useWindowWidth();
  const isMobile = width < BREAKPOINTS.SM;

  return (
    <div className="h-[388px] sm:h-[588px]">
      <ResponsiveChoropleth
        data={data}
        features={
          geoFilter === GEO_FILTER.Dun && isMobile ? dunGeojson_mobile.features :
          geoFilter === GEO_FILTER.Dun ? dunGeojson_desktop.features :
          isMobile ? parlimenGeojson_mobile.features : 
          parlimenGeojson_desktop.features
        }
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors={metric ? getChoroplethColors(metric) : ["#FFF"]}
        domain={[0, 100]}
        unknownColor="#fff"
        valueFormat=".2s"
        projectionScale={isMobile ? 1750 : 3000}
        projectionTranslation={[isMobile ? 0.5 : 0.63, isMobile ? 0.97 : 0.85]}
        projectionRotation={[-114, 0, 0]}
        borderWidth={metric ? 0.1 : 0.25}
        borderColor={metric ? getChoroplethBorderColor(metric) : "#13293d"}
        tooltip={({ feature: { data } }) => {
          return data?.id ? (
            <div className="nivo-tooltip">{data.id}</div>
          ) : (
            <></>
          );
        }}
      />
    </div>
  );
};

export default ChoroplethChart;
