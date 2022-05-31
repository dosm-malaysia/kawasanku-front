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
  currentLocation?: Option;
}

const Jitterplots = ({
  areaType,
  data,
  comparisons,
  currentLocation,
}: JitterplotsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/* MEDIAN INDICATORS */}
      <Indicators areaType={areaType} />
      <div className="relative h-full w-full">
        {/* JITTERPLOT CHARTS */}
        <div className="relative flex h-full w-full flex-col gap-2">
          {/* PERCENTILE OVERLAY */}
          <PercentileOverlay />
          {/* SECTION 1 TITLE */}
          <span className="inline-block w-fit bg-white font-semibold text-accent">
            {t("jitterplot.title_1")}
          </span>
          {/* SECTION 1 METRICS */}
          <JitterPlot
            label={t("jitterplot.metric_1.label")}
            data={data.metric_1}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_1.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_2.label")}
            data={data.metric_2}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_2.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_3.label")}
            data={data.metric_3}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_3.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_4.label")}
            data={data.metric_4}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_4.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_5.label")}
            data={data.metric_5}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_5.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_6.label")}
            data={data.metric_6}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_6.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_7.label")}
            data={data.metric_7}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_7.tooltip")}
          />
          {/* SECTION 2 TITLE */}
          <span className="inline-block w-fit bg-white pt-2 font-semibold text-accent">
            {t("jitterplot.title_2")}
          </span>
          {/* SECTION 2 METRICS */}
          <JitterPlot
            label={t("jitterplot.metric_8.label")}
            data={data.metric_8}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_8.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_9.label")}
            data={data.metric_9}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_9.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_10.label")}
            data={data.metric_10}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_10.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_11.label")}
            data={data.metric_11}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_11.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_12.label")}
            data={data.metric_12}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_12.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_13.label")}
            data={data.metric_13}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_13.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_14.label")}
            data={data.metric_14}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_14.tooltip")}
          />
          {/* SECTION 3 TITLE */}
          <span className="w-fit bg-white pt-2 font-semibold text-accent">
            {t("jitterplot.title_3")}
          </span>
          {/* SECTION 3 METRICS */}
          <JitterPlot
            label={t("jitterplot.metric_15.label")}
            data={data.metric_15}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_15.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_16.label")}
            data={data.metric_16}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_16.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_17.label")}
            data={data.metric_17}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_17.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_18.label")}
            data={data.metric_18}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_18.tooltip")}
          />
          {/* NOTE: no data for district level */}
          {areaType !== AREA_TYPES.District && (
            <>
              <JitterPlot
                label={t("jitterplot.metric_19.label")}
                data={data.metric_19}
                comparisons={comparisons}
                currentLocation={currentLocation}
                tooltip={t("jitterplot.metric_19.tooltip")}
              />
              <JitterPlot
                label={t("jitterplot.metric_20.label")}
                data={data.metric_20}
                comparisons={comparisons}
                currentLocation={currentLocation}
                tooltip={t("jitterplot.metric_20.tooltip")}
              />
            </>
          )}
          <JitterPlot
            label={t("jitterplot.metric_21.label")}
            data={data.metric_21}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_21.tooltip")}
          />
          {/* SECTION 4 TITLE */}
          <span className="w-fit bg-white pt-2 font-semibold text-accent">
            {t("jitterplot.title_4")}
          </span>
          {/* SECTION 4 METRICS */}
          {/* NOTE: no data for district level */}
          {areaType !== AREA_TYPES.District && (
            <>
              <JitterPlot
                label={t("jitterplot.metric_22.label")}
                data={data.metric_22}
                comparisons={comparisons}
                currentLocation={currentLocation}
                tooltip={t("jitterplot.metric_22.tooltip")}
              />
              <JitterPlot
                label={t("jitterplot.metric_23.label")}
                data={data.metric_23}
                comparisons={comparisons}
                currentLocation={currentLocation}
                tooltip={t("jitterplot.metric_23.tooltip")}
              />
            </>
          )}
          <JitterPlot
            label={t("jitterplot.metric_24.label")}
            data={data.metric_24}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_24.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_25.label")}
            data={data.metric_25}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_25.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_26.label")}
            data={data.metric_26}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_26.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_27.label")}
            data={data.metric_27}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_27.tooltip")}
          />
          <JitterPlot
            label={t("jitterplot.metric_28.label")}
            data={data.metric_28}
            comparisons={comparisons}
            currentLocation={currentLocation}
            tooltip={t("jitterplot.metric_28.tooltip")}
          />
        </div>
        <small className="inline-block pt-4 text-gray-500">
          <i>{t("jitterplot.dislaimer")}</i>
        </small>
      </div>
    </>
  );
};

export default Jitterplots;
