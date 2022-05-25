import React from "react";
import { useTranslation } from "next-i18next";

import { IJitterplots } from "../lib/interfaces";
import JitterPlot from "./Charts/JitterPlots";
import Indicators from "./Charts/JitterPlots/Indicators";
import PercentileOverlay from "./Charts/JitterPlots/PercentileOverlay";

interface JitterplotsProps {
  data: IJitterplots;
}

const Jitterplots = ({ data }: JitterplotsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/* MEDIAN INDICATORS */}
      <Indicators />
      <div className="relative h-full w-full">
        {/* JITTERPLOT CHARTS */}
        <div className="relative flex h-full w-full flex-col gap-2">
          {/* PERCENTILE OVERLAY */}
          <PercentileOverlay />
          {/* SECTION 1 TITLE */}
          <p className="z-10 w-fit bg-white font-semibold text-accent">
            {t("jitterplot.title_1")}
          </p>
          {/* SECTION 1 METRICS */}
          <JitterPlot label={t("jitterplot.metric_1")} data={data.metric_1} />
          <JitterPlot label={t("jitterplot.metric_2")} data={data.metric_2} />
          <JitterPlot label={t("jitterplot.metric_3")} data={data.metric_3} />
          <JitterPlot label={t("jitterplot.metric_4")} data={data.metric_4} />
          <JitterPlot label={t("jitterplot.metric_5")} data={data.metric_5} />
          <JitterPlot label={t("jitterplot.metric_6")} data={data.metric_6} />

          {/* SECTION 2 TITLE */}
          <p className="z-10 w-fit bg-white pt-2 font-semibold text-accent">
            {t("jitterplot.title_2")}
          </p>
          {/* SECTION 2 METRICS */}
          <JitterPlot label={t("jitterplot.metric_7")} data={data.metric_7} />
          <JitterPlot label={t("jitterplot.metric_8")} data={data.metric_8} />
          <JitterPlot label={t("jitterplot.metric_9")} data={data.metric_9} />
          <JitterPlot label={t("jitterplot.metric_10")} data={data.metric_10} />
          <JitterPlot label={t("jitterplot.metric_11")} data={data.metric_11} />
          <JitterPlot label={t("jitterplot.metric_12")} data={data.metric_12} />
          <JitterPlot label={t("jitterplot.metric_13")} data={data.metric_13} />
          <JitterPlot label={t("jitterplot.metric_14")} data={data.metric_14} />

          {/* SECTION 3 TITLE */}
          <p className="z-10 w-fit bg-white pt-2 font-semibold text-accent">
            {t("jitterplot.title_3")}
          </p>
          {/* SECTION 3 METRICS */}
          <JitterPlot label={t("jitterplot.metric_15")} data={data.metric_15} />
          <JitterPlot label={t("jitterplot.metric_16")} data={data.metric_16} />
          <JitterPlot label={t("jitterplot.metric_17")} data={data.metric_17} />
          <JitterPlot label={t("jitterplot.metric_18")} data={data.metric_18} />
          <JitterPlot label={t("jitterplot.metric_19")} data={data.metric_19} />
          <JitterPlot label={t("jitterplot.metric_20")} data={data.metric_20} />

          {/* SECTION 4 TITLE */}
          <p className="z-10 w-fit bg-white pt-2 font-semibold text-accent">
            {t("jitterplot.title_4")}
          </p>
          {/* SECTION 4 METRICS */}
          <JitterPlot label={t("jitterplot.metric_21")} data={data.metric_21} />
          <JitterPlot label={t("jitterplot.metric_22")} data={data.metric_22} />
          <JitterPlot label={t("jitterplot.metric_23")} data={data.metric_23} />
          <JitterPlot label={t("jitterplot.metric_24")} data={data.metric_24} />
          <JitterPlot label={t("jitterplot.metric_25")} data={data.metric_25} />
          <JitterPlot label={t("jitterplot.metric_26")} data={data.metric_26} />
          <JitterPlot label={t("jitterplot.metric_27")} data={data.metric_27} />
        </div>
      </div>
    </>
  );
};

export default Jitterplots;
