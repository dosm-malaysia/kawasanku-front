import { ResponsivePie } from "@nivo/pie";
import { IDoughnutChartData } from "../../../lib/interfaces";
import Card from "../../Card";

interface DoughnutChartProps {
  data: IDoughnutChartData[];
}

const DoughnutChart = ({ data }: DoughnutChartProps) => {
  return (
    <Card>
      <div className="h-44 w-full">
        <ResponsivePie
          data={data}
          margin={{ top: 0, right: 100, bottom: 0, left: 0 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          enableArcLinkLabels={false}
          legends={[
            {
              anchor: "right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemWidth: 75,
              itemHeight: 20,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </Card>
  );
};

export default DoughnutChart;
