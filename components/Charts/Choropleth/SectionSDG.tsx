import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

import { getChoroSDG } from "../../../lib/api";
import { generateOption } from "../../../lib/helpers";
import { IChoroplethData } from "../../../lib/interfaces";
import { CHOROPLETH_BLUE_SCALE, GEO_FILTER } from "../../../lib/constants";

import Card from "../../Card";
import ChoroplethScale from "./Scale";
import Container from "../../Container";
import SelectMenu from "../../Dropdowns/Select";

const ChoroplethChart = dynamic(() => import("."), {
  ssr: false,
});

const ChoroplethSection = () => {
  const { t } = useTranslation();

  const [data, setData] = useState<IChoroplethData[]>([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  const choroplethSdgOptions = generateOption("sdg", 15).map(item => ({
    label: t(`choropleth_sdg.${item}`),
    value: item,
  }));

  useEffect(() => {
    if (selected) {
      setLoading(true);
      getChoroSDG(selected)
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(err => console.log(err));
    } else {
      setData([]);
    }
  }, [selected]);

  return (
    <>
      <Container backgroundColor="bg-gray-100" className="mt-10">
        <div className="section-title-layout">
          <h3 className="section-title">{t("choropleth_sdg_title")}</h3>
          <p className="census-text">{t("census_2020", { year: 2021 })}</p>
        </div>
      </Container>
      <Container backgroundColor="bg-white md:bg-gray-100" className="md:mb-10">
        <Card padding="pt-4 pb-8 md:p-4" className="md:rounded-lg md:border">
          <div className="flex h-full w-full flex-col items-center gap-2 md:flex-row md:gap-7">
            {/* INDICATOR */}
            <div className="flex h-full w-full items-center gap-2 md:w-auto">
              <p className="text-sm">{t("choropleth_sdg_indicator")}:</p>
              <div className="w-full md:w-[240px]">
                <SelectMenu
                  placeholder={t("choropleth_sdg_indicator_placeholder")}
                  options={choroplethSdgOptions}
                  loading={loading}
                  selected={
                    selected
                      ? {
                          label: t(`choropleth_sdg.${selected}`),
                          value: selected,
                        }
                      : undefined
                  }
                  onChange={item => setSelected(item)}
                />
              </div>
            </div>
          </div>

          {/* CHOROPLETH CHART */}
          <ChoroplethChart
            data={data}
            feature={GEO_FILTER.District}
            color={CHOROPLETH_BLUE_SCALE}
          />
          {/* CHOROPLETH SCALE */}
          <div className="flex h-full w-full justify-end">
            <div className="w-full sm:w-1/3">
              <ChoroplethScale
                colorScale={data.length ? CHOROPLETH_BLUE_SCALE : undefined}
              />
            </div>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default ChoroplethSection;
