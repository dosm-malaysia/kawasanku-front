import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

import { getChoropleth } from "../../../lib/api";
import { IChoroplethData } from "../../../lib/interfaces";
import { getChoroplethColors } from "../../../lib/helpers";
import { CHOROPLETH_METRICS, GEO_FILTER } from "../../../lib/constants";

import Card from "../../Card";
import ChoroplethScale from "./Scale";
import Container from "../../Container";
import SelectMenu from "../../Dropdowns/Select";
import DateSignature from "../../DateSignature";

const ChoroplethChart = dynamic(() => import("."), {
  ssr: false,
});

const ChoroplethSection = () => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [metric, setMetric] = useState<string>("");
  const [geoFilter, setGeoFilter] = useState<string>("parlimen");

  const choroplethMetricOptons = Object.values(CHOROPLETH_METRICS).map(
    metric => ({
      label: t(`choropleth.${metric}`),
      value: metric,
    })
  );

  useEffect(() => {
    if (metric && geoFilter) {
      fetchData();
    } else {
      setData([]);
    }
  }, [metric, geoFilter]);

  const fetchData = async () => {
    if (!metric && !geoFilter) return;
    const result = await getChoropleth({ metric, geoFilter });
    setData(result);
  };

  return (
    <>
      <Container backgroundColor="bg-gray-100" className="mt-10">
        <div className="section-title-layout">
          <h3 className="section-title">{t("choropleth_title")}</h3>
          <DateSignature
            date="2020"
            option={{ year: "numeric", month: undefined, day: undefined }}
          />
        </div>
      </Container>
      <Container backgroundColor="bg-white md:bg-gray-100" className="md:mb-10">
        <Card padding="pt-4 pb-8 md:p-4" className="md:rounded-lg md:border">
          <div className="flex h-full w-full flex-col items-center gap-2 md:flex-row md:gap-7">
            {/* INDICATOR */}
            <div className="flex h-full w-full items-center gap-2 md:w-auto">
              <p className="text-sm">{t("indicator")}:</p>
              <div className="w-full md:w-[238px]">
                <SelectMenu
                  placeholder={t("choropleth_metric_placeholder")}
                  options={choroplethMetricOptons}
                  selected={
                    metric
                      ? {
                          label: t(`choropleth.${metric}`),
                          value: metric,
                        }
                      : undefined
                  }
                  onChange={metric => setMetric(metric)}
                />
              </div>
            </div>
            {/* PARLIAMENT CHECKBOX */}
            <div className="relative flex w-full items-center md:w-auto">
              <div className="flex h-5 items-center">
                <input
                  id="parliament"
                  name="parliament"
                  type="checkbox"
                  checked={geoFilter === GEO_FILTER.Parliament}
                  onChange={() => setGeoFilter(GEO_FILTER.Parliament)}
                  className="h-5 w-5 cursor-pointer rounded-full border-gray-300 text-accent focus:outline-none focus:ring-0 focus:ring-transparent"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="parliament" className="cursor-pointer">
                  {t(GEO_FILTER.Parliament)}
                </label>
              </div>
            </div>
            {/* DUN CHECKBOX */}
            <div className="relative flex w-full items-center md:w-auto">
              <div className="flex h-5 items-center">
                <input
                  id="dun"
                  name="dun"
                  type="checkbox"
                  checked={geoFilter === GEO_FILTER.Dun}
                  onChange={() => setGeoFilter(GEO_FILTER.Dun)}
                  className="h-5 w-5 cursor-pointer rounded-full border-gray-300 text-accent focus:outline-none focus:ring-0 focus:ring-transparent"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="dun" className="cursor-pointer">
                  {t(GEO_FILTER.Dun)}
                </label>
              </div>
            </div>
          </div>
          {/* CHOROPLETH CHART */}
          <ChoroplethChart
            metric={metric}
            feature={geoFilter as GEO_FILTER}
            data={data}
            showValue={false}
          />
          {/* CHOROPLETH SCALE */}
          <div className="flex h-full w-full justify-end">
            <div className="w-full sm:w-1/3">
              <ChoroplethScale
                colorScale={metric ? getChoroplethColors(metric) : undefined}
              />
            </div>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default ChoroplethSection;
