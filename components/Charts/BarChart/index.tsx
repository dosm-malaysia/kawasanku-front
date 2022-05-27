import { useTranslation } from "next-i18next";
import { BarDatum, ResponsiveBarCanvas } from "@nivo/bar";

import { formatKOrM } from "../../../lib/helpers";
import { IBarChartData } from "../../../lib/interfaces";

interface BarChartProps {
  data: BarDatum extends IBarChartData[] ? IBarChartData[] : BarDatum[];
}

const BarChart = ({ data }: BarChartProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center justify-between pl-10 text-xs font-bold">
        <p className="text-accent">{t("pyramid.male")}</p>
        <p className="text-[#8F9EB9]">{t("pyramid.female")}</p>
      </div>
      <div className="h-96 min-h-full w-full">
        <ResponsiveBarCanvas
          data={data}
          indexBy="id"
          keys={["male", "male_surplus", "female", "female_surplus"]}
          margin={{ top: 0, right: 20, bottom: 20, left: 40 }}
          padding={0.3}
          layout="horizontal"
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          valueFormat=">-,"
          colors={["#465570", "#2A3343", "#8F9EB9", "#62789D"]}
          enableLabel={false}
          axisBottom={{
            format: (value) => formatKOrM(Math.abs(value)),
          }}
          tooltip={({ id, formattedValue, color }) => {
            return (
              <div className="flex items-center justify-center rounded-[2px] bg-white py-[5px] px-[9px] shadow">
                <div
                  className="mr-2 h-3 w-3"
                  style={{ backgroundColor: color }}
                />
                <p>
                  {t(`pyramid.${id}`)}:{" "}
                  <span className="font-bold">
                    {formattedValue[0] === "-"
                      ? formattedValue.substring(1)
                      : formattedValue}
                  </span>
                </p>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;
