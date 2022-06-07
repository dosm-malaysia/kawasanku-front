import { ResponsivePie } from "@nivo/pie";
import { FunctionComponent } from "react";

import { IDoughnutChartData } from "../../../lib/interfaces";

import Card from "../../Card";

interface DoughnutChartProps {
  title?: string;
  data: IDoughnutChartData[];
}

interface LegendItemProps {
  color?: string;
  children: string;
}

const colorScheme = [
  "#2A3343",
  "#465570",
  "#62789D",
  "#8F9EB9",
  "#BCC5D5",
  "#E9ECF1",
];

const DoughnutChart: FunctionComponent<DoughnutChartProps> = ({
  title,
  data,
}) => {
  console.log(data);
  return (
    <Card className="border-0.5">
      {title && <p className="pb-1 text-sm">{title}</p>}
      <div className="grid h-44 grid-cols-12 gap-2">
        <div className="col-span-7">
          <ResponsivePie
            data={data}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            innerRadius={0.5}
            borderWidth={1}
            theme={{
              textColor: "white",
            }}
            colors={colorScheme}
            borderColor="white"
            enableArcLinkLabels={false}
            arcLabelsSkipAngle={15}
            valueFormat={value => `${value.toFixed(0)}%`}
            tooltip={({ datum: { label, value, color } }) => {
              return (
                <div className="flex items-center justify-center rounded-[2px] bg-white py-[5px] px-[9px] shadow">
                  <div
                    className="mr-2 h-3 w-3"
                    style={{ backgroundColor: color }}
                  />
                  <p>
                    {label}:{" "}
                    <span className="font-bold">{value.toFixed(1)}%</span>
                  </p>
                </div>
              );
            }}
          />
        </div>

        {data.length > 0 && (
          <div className="col-span-5 flex flex-col justify-center gap-1">
            {data.map((item, index) => (
              <LegendItem color={colorScheme[index]}>{item.id}</LegendItem>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

const LegendItem: FunctionComponent<LegendItemProps> = ({
  color,
  children,
}) => {
  return (
    <div
      className="inline-flex items-center gap-2 overflow-auto text-xs"
      title={children}
    >
      <div
        className="h-4 w-4 rounded-3xl"
        style={{ background: color, flex: "0 0 auto" }}
      ></div>
      <span className="truncate">{children}</span>
    </div>
  );
};

export default DoughnutChart;
