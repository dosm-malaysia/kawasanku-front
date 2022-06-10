import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

import { getChoropleth } from "../../../lib/api";
import { IChoroplethData } from "../../../lib/interfaces";
import { CHOROPLETH_METRICS, GEO_FILTER } from "../../../lib/constants";

import SelectMenu from "../../Dropdowns/Select";

const ChoroplethChart = dynamic(() => import("."), {
  ssr: false,
});

const ChoroplethSection = () => {
  const { t } = useTranslation();

  const [data, setData] = useState<IChoroplethData[]>([]);
  const [metric, setMetric] = useState<CHOROPLETH_METRICS>();
  const [geoFilter, setGeoFilter] = useState<
    GEO_FILTER.Parliament | GEO_FILTER.Dun
  >();

  const choroplethMetricOptons = Object.values(CHOROPLETH_METRICS).map(
    metric => ({
      label: t(metric),
      value: metric,
    })
  );

  const geoFilterOptions = [
    {
      label: t(GEO_FILTER.Parliament),
      value: GEO_FILTER.Parliament,
    },
    {
      label: t(GEO_FILTER.Dun),
      value: GEO_FILTER.Dun,
    },
  ];

  useEffect(() => {
    if (metric && geoFilter) {
      getChoropleth({
        metric,
        geoFilter,
      })
        .then(data => {
          setData(data);
          console.log(data);
        })
        .catch(err => console.log(err));
    } else {
      setData([]);
    }
  }, [metric, geoFilter]);

  return (
    <div>
      <SelectMenu
        placeholder={t("choropleth_metric_placeholder")}
        options={choroplethMetricOptons}
        selected={
          metric
            ? {
                label: t(metric),
                value: metric,
              }
            : undefined
        }
        onChange={metric => setMetric(metric as CHOROPLETH_METRICS)}
      />
      <SelectMenu
        placeholder={t("choropleth_geo_filter_placeholder")}
        options={geoFilterOptions}
        selected={
          geoFilter
            ? {
                label: t(geoFilter),
                value: geoFilter,
              }
            : undefined
        }
        onChange={geoFilter =>
          setGeoFilter(geoFilter as GEO_FILTER.Parliament | GEO_FILTER.Dun)
        }
      />
      <ChoroplethChart metric={metric} geoFilter={geoFilter} data={data} />
    </div>
  );
};

export default ChoroplethSection;
