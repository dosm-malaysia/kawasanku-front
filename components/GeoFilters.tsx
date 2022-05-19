import { useTranslation } from "next-i18next";

import { GEO_FILTER, STATES } from "../lib/constants";
import { useLocationContext } from "../contexts/GeoFiltersContext";

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
    <div className="flex flex-col gap-4">
      <SelectMenu
        options={Object.values(STATES).map((state) => {
          return { label: state, value: state };
        })}
        selected={state}
        onChange={setState}
        placeholder={t("filter2_placeholder")}
      />
      <SelectMenu
        options={Object.values(GEO_FILTER).map((filter) => {
          return { label: t(filter), value: filter };
        })}
        selected={geoFilter}
        onChange={setGeoFilter}
        placeholder={t("filter1_placeholder")}
      />
      {/* TODO: make sure geo filter is selected first before allowing selection */}
      <SelectMenu
        options={areaOptions.map((area: string) => {
          return { label: area, value: area };
        })}
        selected={area}
        onChange={setArea}
        placeholder={t("filter3_placeholder")}
      />
    </div>
  );
};

export default GeoFilters;
