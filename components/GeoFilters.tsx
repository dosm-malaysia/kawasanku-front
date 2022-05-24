import { useTranslation } from "next-i18next";

import { GEO_FILTER, STATES_KEY } from "../lib/constants";

import SelectMenu from "./SelectMenu";
import { useRouter } from "next/router";
import { useState } from "react";

interface GeoFiltersProps {
  state_key: string;
  state: string;
  areaType: string;
  area: string;
  mapping: any;
}

const GeoFilters = ({
  state_key,
  state,
  areaType,
  area,
  mapping,
}: GeoFiltersProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [selectedAreaType, setSelectedAreaType] = useState(
    areaType === "state" ? undefined : areaType
  );
  const [selectedArea, setSelectedArea] = useState(area);

  return (
    <div className="flex flex-col gap-4">
      <SelectMenu
        options={Object.values(STATES_KEY).map((state) => {
          return { label: mapping[state].state, value: state };
        })}
        selected={
          state_key
            ? {
                label: mapping[state_key].state,
                value: mapping[state_key].state_key,
              }
            : undefined
        }
        onChange={(newStateKey) => router.push(`/${newStateKey}`)}
        placeholder={t("filter1_placeholder")}
      />
      <SelectMenu
        options={Object.values(GEO_FILTER).map((filter) => {
          return { label: t(filter), value: filter };
        })}
        selected={
          selectedAreaType
            ? {
                label: t(selectedAreaType),
                value: selectedAreaType,
              }
            : undefined
        }
        onChange={(newAreaType) =>
          newAreaType ? setSelectedAreaType(newAreaType) : {}
        }
        placeholder={t("filter2_placeholder")}
      />
      {/* TODO: make sure geo filter is selected first before allowing selection */}
      <SelectMenu
        options={
          state_key && selectedAreaType
            ? mapping[state_key][selectedAreaType].map((area: string) => {
                return { label: area, value: area };
              })
            : []
        }
        selected={
          selectedArea
            ? {
                label: t(selectedArea),
                value: selectedArea,
              }
            : undefined
        }
        onChange={(newSelectedArea) =>
          newSelectedArea
            ? router.push(
                `/${state_key}/${encodeURIComponent(newSelectedArea)}`
              )
            : {}
        }
        placeholder={t("filter3_placeholder")}
      />
    </div>
  );
};

export default GeoFilters;
