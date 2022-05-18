import { useTranslation } from "next-i18next";

import { GEO_FILTER, STATES } from "../lib/constants";
import { useLocationContext } from "../contexts/GeoFiltersContext";

import Card from "./Card";
import SelectMenu from "./SelectMenu";

const GeoFilters = () => {
  const { t } = useTranslation();
  const {
    geoFilter,
    setGeoFilter,
    state,
    setState,
    area,
    setArea,
    areaOptions,
  } = useLocationContext();

  return (
    <Card>
      <p className="mb-4 text-xl font-medium">{t("filter_title")}</p>
      <div className="mb-2 flex flex-col gap-4">
        <SelectMenu
          options={Object.values(STATES)}
          selected={state}
          onChange={setState}
          placeholder={t("filter2_placeholder")}
        />
        <SelectMenu
          options={Object.values(GEO_FILTER).map((filter) => t(filter))}
          selected={geoFilter}
          onChange={setGeoFilter}
          placeholder={t("filter1_placeholder")}
        />
        {/* TODO: make sure geo filter is selected first before allowing selection */}
        <SelectMenu
          options={areaOptions}
          selected={area}
          onChange={setArea}
          placeholder={t("filter3_placeholder")}
        />
      </div>
    </Card>
  );
};

export default GeoFilters;
