import React from "react";
import { useTranslation } from "next-i18next";

import { AREA_TYPES } from "../lib/constants";
import { IJitterplots } from "../lib/interfaces";

import { Option } from "./Dropdowns/interface";
import JitterPlot from "./Charts/JitterPlots";
import Indicators from "./Charts/JitterPlots/Indicators";
import PercentileOverlay from "./Charts/JitterPlots/PercentileOverlay";

interface JitterplotsProps {
  areaType: AREA_TYPES;
  data: IJitterplots;
  comparisons: Option[];
}

const Jitterplots = ({ areaType, data, comparisons }: JitterplotsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/* MEDIAN INDICATORS */}
      <Indicators areaType={areaType} />
      <div className="relative h-full w-full overflow-hidden">
        {/* JITTERPLOT CHARTS */}
        <div className="relative flex h-full w-full flex-col gap-2">
          {/* PERCENTILE OVERLAY */}
          <PercentileOverlay />
          {/* SECTION 1 TITLE */}
          <p className="z-10 w-fit bg-white font-semibold text-accent">
            {t("jitterplot.title_1")}
          </p>
          {/* SECTION 1 METRICS */}
          <JitterPlot
            label={t("jitterplot.metric_1")}
            data={data.metric_1}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_2")}
            data={data.metric_2}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_3")}
            data={data.metric_3}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_4")}
            data={data.metric_4}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_5")}
            data={data.metric_5}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_6")}
            data={data.metric_6}
            comparisons={comparisons}
          />

          {/* SECTION 2 TITLE */}
          <p className="z-10 w-fit bg-white pt-2 font-semibold text-accent">
            {t("jitterplot.title_2")}
          </p>
          {/* SECTION 2 METRICS */}
          <JitterPlot
            label={t("jitterplot.metric_7")}
            data={data.metric_7}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_8")}
            data={data.metric_8}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_9")}
            data={data.metric_9}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_10")}
            data={data.metric_10}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_11")}
            data={data.metric_11}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_12")}
            data={data.metric_12}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_13")}
            data={data.metric_13}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_14")}
            data={data.metric_14}
            comparisons={comparisons}
          />

          {/* SECTION 3 TITLE */}
          <p className="z-10 w-fit bg-white pt-2 font-semibold text-accent">
            {t("jitterplot.title_3")}
          </p>
          {/* SECTION 3 METRICS */}
          <JitterPlot
            label={t("jitterplot.metric_15")}
            data={data.metric_15}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_16")}
            data={data.metric_16}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_17")}
            data={data.metric_17}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_18")}
            data={data.metric_18}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_19")}
            data={data.metric_19}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_20")}
            data={data.metric_20}
            comparisons={comparisons}
          />

          {/* SECTION 4 TITLE */}
          <p className="z-10 w-fit bg-white pt-2 font-semibold text-accent">
            {t("jitterplot.title_4")}
          </p>
          {/* SECTION 4 METRICS */}
          <JitterPlot
            label={t("jitterplot.metric_21")}
            data={data.metric_21}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_22")}
            data={data.metric_22}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_23")}
            data={data.metric_23}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_24")}
            data={data.metric_24}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_25")}
            data={data.metric_25}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_26")}
            data={data.metric_26}
            comparisons={comparisons}
          />
          <JitterPlot
            label={t("jitterplot.metric_27")}
            data={data.metric_27}
            comparisons={comparisons}
          />
        </div>
      </div>
    </>
  );
};

export default Jitterplots;
