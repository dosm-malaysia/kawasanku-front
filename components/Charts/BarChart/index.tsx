import { BarDatum, ResponsiveBarCanvas } from "@nivo/bar";
import { IBarChartData } from "../../../lib/interfaces";

interface BarChartProps {
  data: BarDatum extends IBarChartData[] ? IBarChartData[] : BarDatum[];
}

const BarChart = ({ data }: BarChartProps) => {
  return (
    <div className="h-96 w-full">
      <ResponsiveBarCanvas
        data={data}
        keys={["fries", "burger", "sandwich", "kebab"]}
        indexBy="country"
        margin={{ top: 25, right: 20, bottom: 50, left: 60 }}
        padding={0.3}
        layout="horizontal"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        minValue={-200}
        maxValue={200}
        colors={{ scheme: "nivo" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 32,
          tickValues: [-200, -100, 0, 100, 200],
          format: (val) => {
            let formattedVal = val;
            if (val < 0) formattedVal *= -1;
            return formattedVal + "k";
          },
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "top",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: -25,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default BarChart;
