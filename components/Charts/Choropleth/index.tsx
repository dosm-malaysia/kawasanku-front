import Image from "next/image";
import { FunctionComponent } from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { useWindowWidth } from "@react-hook/window-size";

import { IChoroplethData } from "../../../lib/interfaces";
import { getChoroplethColors } from "../../../lib/helpers";
import {
  BREAKPOINTS,
  CHOROPLETH_METRICS,
  GEO_FILTER,
} from "../../../lib/constants";

import stateBorders from "../../../geojson/states.svg";
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
  const width = useWindowWidth();
  const isMobile = width < BREAKPOINTS.SM;

  return (
    <div className="relative h-[388px] w-full sm:h-[588px]">
      {metric && (
        <div className="absolute z-10 flex h-[388px] w-full items-center justify-center sm:h-[588px]">
          <div className="-mt-1 block h-[319px] w-[324px] object-contain sm:mt-0 sm:h-[547px] sm:w-[557px]">
            <Image
              // NOTE: update SVG in geojson/state.svg and refresh to test
              src={stateBorders}
              width={isMobile ? 324.6 : 556.5}
              height={isMobile ? 319 : 546.87}
              layout="responsive"
              className="object-contain"
            />
          </div>
        </div>
      )}
      {/* NOTE: comment code outside of start and end tags to hide state borders */}
      {/* --- START --- */}
      <div className="h-[388px] sm:h-[588px]">
        <ResponsiveChoropleth
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
          projectionScale={isMobile ? 1750 : 3000}
          projectionTranslation={[0.5, isMobile ? 0.97 : 1.04]}
          projectionRotation={[-114, 0, 0]}
          borderWidth={metric ? 0.1 : 0.25}
          borderColor={metric ? "#f2f2f2" : "#13293d"}
          tooltip={({ feature: { data } }) => {
            return data?.id ? (
              <div className="nivo-tooltip">{data.id}</div>
            ) : (
              <></>
            );
          }}
        />
      </div>
      {/* --- END --- */}
    </div>
  );
};

export default ChoroplethChart;
