import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";
import { IJitterplotData } from "../../../lib/interfaces";
import { Option } from "../../Dropdowns/interface";

interface JitterPlotProps {
  label: string;
  data: IJitterplotData[];
  comparisons: Option[];
}

const JitterPlot = ({ label, data, comparisons }: JitterPlotProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-2 md:flex-row md:gap-0">
      <div className="z-10 w-full bg-white text-sm md:w-1/3">
        <p>{label}</p>
      </div>
      <div className="h-10 w-full rounded-lg bg-gray-50 md:w-2/3">
        <ResponsiveScatterPlotCanvas
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          xScale={{ type: "linear", min: -1, max: 1 }}
          xFormat=">-.2f"
          yScale={{ type: "linear", min: 0, max: 10 }}
          yFormat=">-.2f"
          enableGridX={false}
          enableGridY={false}
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={null}
          tooltip={({ node: { serieId } }) => {
            return (
              <div className="flex items-center justify-center rounded-[2px] bg-white py-[5px] px-[9px] text-sm shadow">
                <p className="">{serieId}</p>
              </div>
            );
          }}
          colors={({ serieId }) => {
            if (comparisons[0]?.label === serieId) return "#D44647";
            else if (comparisons[2]?.label === serieId) return "#EC9E29";
            else if (comparisons[1]?.label === serieId) return "#2873E8";
            else return "#E0E0E0";
          }}
        />
      </div>
    </div>
  );
};

export default JitterPlot;
