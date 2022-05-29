import { ResponsiveScatterPlotCanvas, ScatterPlotMouseHandler } from "@nivo/scatterplot";
import {useEffect} from 'react'
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
    useEffect(() => {
        data.forEach((item, index) => {
            // console.log(item.id)
            // if ([...comparisons, currentLocation].some(highlight => highlight?.label === item.id))
            if ([...comparisons, currentLocation].some(highlight => highlight?.label === item.id)) {
                const temp = data!.splice(index, 1).pop()
                data.push(temp!)
            }
        })
    }, [comparisons])

  return (
    <div className="flex h-full w-full flex-col items-center gap-2 md:flex-row md:gap-0">
      <div className="w-full z-10 md:z-auto py-2 bg-white text-sm md:w-1/3 space-x-2 flex items-center">
        <p>{label}</p>
        {tooltip && <Tooltip>{tooltip}</Tooltip>}
      </div>
      <div className="h-10 w-full rounded-full bg-gray-50 md:w-2/3 px-3">
        <ResponsiveScatterPlotCanvas
          data={data}
          margin={{ top: 2, right: 5, bottom: 2, left: 5 }}
          xScale={{ type: "linear", min: -1.0, max: 1.0 }}
          xFormat=">-0.2f"
          yScale={{ type: "linear", min: 0, max: 10 }}
          yFormat=">-.2f"
          enableGridX={false}
          enableGridY={false}
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={null}
          renderNode={(canvas, node) => {
            canvas.beginPath()
            canvas.arc(node.x, node.y, node.size / 2, 0, 2 * Math.PI)
            canvas.fillStyle = node.color
            canvas.fill()
          }}
          nodeSize={node => { 
            if ([...comparisons, currentLocation].some(item => item?.label === node.serieId)) {
                node.index = 200
                return 14
            }
            return 8
          }}
          onMouseEnter={(node) => {
              if (comparisons.some(item => item.label === node.serieId)) return
              node.color = "#13293d"
          }}
          onMouseLeave={(node) => {
            // ACCENT
            if (currentLocation?.label === node.serieId) node.color = "#13293d"
            // RED
            else if (comparisons[0]?.label === node.serieId) node.color = "#D44647"
            // BLUE
            else if (comparisons[1]?.label === node.serieId) node.color = "#EC9E29";
            // YELLOW
            else if (comparisons[2]?.label === node.serieId) node.color = "#2873E8";
            // GRAY
            else node.color = "#E0E0E0CC"

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
