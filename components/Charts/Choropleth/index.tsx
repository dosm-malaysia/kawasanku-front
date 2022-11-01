import { FunctionComponent, useMemo } from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { useWindowWidth } from "@react-hook/window-size";

import { IChoroplethData } from "../../../lib/interfaces";
import { getChoroplethColors, numFormat } from "../../../lib/helpers";
import { getChoroplethBorderColor } from "../../../lib/helpers";
import {
  BREAKPOINTS,
  CHOROPLETH_METRICS,
  GEO_FILTER,
} from "../../../lib/constants";

import dunGeojsonMobile from "../../../geojson/dun_mobile.json";
import dunGeojsonDesktop from "../../../geojson/dun_desktop.json";
import parlimenGeojsonMobile from "../../../geojson/parlimen_mobile.json";
import parlimenGeojsonDesktop from "../../../geojson/parlimen_desktop.json";
import districtGeojsonMobile from "../../../geojson/district_mobile.json";
import districtGeojsonDesktop from "../../../geojson/district_desktop.json";

interface ChoroplethChartProps {
  metric?: string;
  feature?: GEO_FILTER;
  color?: any;
  data: IChoroplethData[];
  unitY?: string;
  decimal?: number;
}

type ChoroplethConfigType = {
  colors: string[];
  projectionScale: number;
  projectionTranslation: [number, number];
  borderWidth: number;
  borderColor: string;
};

const ChoroplethChart: FunctionComponent<ChoroplethChartProps> = ({
  metric,
  feature,
  color,
  data,
  unitY,
  decimal = 0,
}) => {
  const width = useWindowWidth();
  const isMobile = width < BREAKPOINTS.SM;
  const isTablet = width <= BREAKPOINTS.MD;

  const choroplethConfig: ChoroplethConfigType = {
    colors:
      color && data ? color : metric ? getChoroplethColors(metric) : ["#FFF"],
    projectionScale: isMobile ? 1750 : 3000,
    projectionTranslation: [
      isMobile ? 0.5 : isTablet ? 0.52 : 0.65,
      isMobile ? 0.97 : isTablet ? 1.05 : 0.85,
    ],
    borderWidth: metric ? 0.1 : 0.25,
    borderColor: metric ? getChoroplethBorderColor(metric) : "#13293d",
  };

  const getChoroplethFeatures = () => {
    if (isTablet) {
      switch (feature) {
        case GEO_FILTER.Dun:
          return dunGeojsonMobile.features;
        case GEO_FILTER.District:
          return districtGeojsonMobile.features;
        case GEO_FILTER.Parliament:
          return parlimenGeojsonMobile.features;
        default:
          return parlimenGeojsonMobile.features;
      }
    } else {
      switch (feature) {
        case GEO_FILTER.Dun:
          return dunGeojsonDesktop.features;
        case GEO_FILTER.District:
          return districtGeojsonDesktop.features;
        case GEO_FILTER.Parliament:
          return parlimenGeojsonDesktop.features;
        default:
          return parlimenGeojsonDesktop.features;
      }
    }
  };

  const maxAuto = useMemo(
    () =>
      data.length
        ? data.reduce((a, b) => (a.value > b.value ? a : b)).value
        : 100,
    [data]
  );

  return (
    <div className="h-[388px] sm:h-[588px]">
      <ResponsiveChoropleth
        data={data}
        features={getChoroplethFeatures()}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors={choroplethConfig.colors}
        domain={[0, maxAuto]}
        unknownColor="#fff"
        valueFormat=".2s"
        projectionScale={choroplethConfig.projectionScale}
        projectionTranslation={choroplethConfig.projectionTranslation}
        projectionRotation={[-114, 0, 0]}
        borderWidth={choroplethConfig.borderWidth}
        borderColor={choroplethConfig.borderColor}
        tooltip={({ feature: { data } }) => {
          return data?.id ? (
            <div className="nivo-tooltip">
              {data.id}:{" "}
              {data.value === -1 ? (
                "-"
              ) : (
                <>
                  {unitY}
                  {numFormat(data.value, "standard", decimal)}
                </>
              )}
            </div>
          ) : (
            <></>
          );
        }}
      />
    </div>
  );
};

export default ChoroplethChart;
