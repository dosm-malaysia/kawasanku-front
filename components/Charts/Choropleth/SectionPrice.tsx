import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

import { getChoroPrices } from "../../../lib/api";
import { IChoroplethData } from "../../../lib/interfaces";
import { generateOption } from "../../../lib/helpers";
import { CHOROPLETH_RED_SCALE, GEO_FILTER } from "../../../lib/constants";

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

  const [data, setData] = useState<IChoroplethData[]>([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  const choroplethPriceOptions = generateOption("item", 31).map(item => ({
    label: t(`choropleth_price.${item}`),
    value: item,
  }));

  useEffect(() => {
    if (selected) {
      setLoading(true);
      getChoroPrices(selected)
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
          <h3 className="section-title">{t("choropleth_price_title")}</h3>
          <DateSignature />
        </div>
      </Container>
      <Container backgroundColor="bg-white md:bg-gray-100" className="md:mb-10">
        <Card padding="pt-4 pb-8 md:p-4" className="md:rounded-lg md:border">
          <div className="flex h-full w-full flex-col items-center gap-2 md:flex-row md:gap-7">
            {/* INDICATOR */}
            <div className="flex h-full w-full items-center gap-2 md:w-auto">
              <p className="text-sm">{t("choropleth_price_indicator")}:</p>
              <div className="w-full md:w-[240px]">
                <SelectMenu
                  placeholder={t("choropleth_price_indicator_placeholder")}
                  options={choroplethPriceOptions}
                  loading={loading}
                  selected={
                    selected
                      ? {
                          label: t(`choropleth_price.${selected}`),
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
            color={CHOROPLETH_RED_SCALE}
            decimal={2}
            unitY="RM "
          />
          {/* CHOROPLETH SCALE */}
          <div className="flex h-full w-full justify-end">
            <div className="w-full sm:w-1/3">
              <ChoroplethScale
                colorScale={data.length ? CHOROPLETH_RED_SCALE : undefined}
              />
            </div>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default ChoroplethSection;
