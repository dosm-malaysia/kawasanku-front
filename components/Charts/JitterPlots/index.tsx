import { ResponsiveScatterPlotCanvas, ScatterPlotMouseHandler } from "@nivo/scatterplot";
import { IJitterplotData } from "../../../lib/interfaces";
import { Option } from "../../Dropdowns/interface";
import Tooltip from '../../Tooltip'

interface JitterPlotProps {
  label: string;
  data: IJitterplotData[];
  comparisons: Option[];
  tooltip?: string
  currentLocation?: Option;
  // TODO: sync hovers
  hoverNode?: any,
  onHoverIn?: ScatterPlotMouseHandler<{ x: number; y: number; }>,
  onHoverOut?: ScatterPlotMouseHandler<{ x: number; y: number; }>
}

const JitterPlot = ({ label, data, comparisons, tooltip, currentLocation, hoverNode, onHoverIn, onHoverOut }: JitterPlotProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-2 md:flex-row md:gap-0">
      <div className="w-full z-10 md:z-auto py-2 bg-white text-sm md:w-1/3 space-x-2 flex items-center">
        <p>{label}</p>
        {tooltip && <Tooltip>{tooltip}</Tooltip>}
      </div>
      <div className="h-10 w-full rounded-full bg-gray-50 md:w-2/3">
        <ResponsiveScatterPlotCanvas
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          xScale={{ type: "linear", min: -1.15, max: 1.15 }}
          xFormat=">-.2f"
          yScale={{ type: "linear", min: 0, max: 10 }}
          yFormat=">-.2f"
          enableGridX={false}
          enableGridY={false}
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={null}
          nodeSize={data.length > 40 ? 8 : 14}
          onMouseEnter={(node) => {
            node.color = "#13293d"
          }}
          onMouseLeave={(node) => {
            node.color = "#E0E0E0CC"
          }}
          tooltip={({ node: { serieId } }) => {
            return (
              <div className="flex items-center justify-center rounded text-white bg-accent py-[5px] px-[9px] text-sm shadow">
                <p className="">{serieId}</p>
               </div>
            );
          }}
          colors={({ serieId }) => {
            if (currentLocation?.label === serieId) return "#13293d"

            if (comparisons[0]?.label === serieId) return "#D44647";
            else if (comparisons[2]?.label === serieId) return "#EC9E29";
            else if (comparisons[1]?.label === serieId) return "#2873E8";
            else return "#E0E0E0CC";
          }}
        />
      </div>
    </div>
  );
};

export default JitterPlot;
