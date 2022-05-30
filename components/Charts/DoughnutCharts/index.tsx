import { ResponsivePie } from "@nivo/pie";
import { IDoughnutChartData } from "../../../lib/interfaces";
import Card from "../../Card";

interface DoughnutChartProps {
  title?: string;
  data: IDoughnutChartData[];
}

const DoughnutChart = ({ title, data }: DoughnutChartProps) => {
  return (
    <Card className="border-0.5">
      {title && <p className="text-sm">{title}</p>}
      <div className="h-44 w-full">
        <ResponsivePie
          data={data}
          margin={{ top: 0, right: 100, bottom: 0, left: 0 }}
          innerRadius={0.5}
          borderWidth={1}
          theme={{
            textColor: "white",
          }}
          colors={[
            "#2A3343",
            "#465570",
            "#62789D",
            "#8F9EB9",
            "#BCC5D5",
            "#E9ECF1",
          ]}
          borderColor="white"
          enableArcLinkLabels={false}
          arcLabelsSkipAngle={15}
          valueFormat={value => `${value.toFixed(0)}%`}
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
            },
          ]}
        />
      </div>
    </Card>
  );
};

export default DoughnutChart;
