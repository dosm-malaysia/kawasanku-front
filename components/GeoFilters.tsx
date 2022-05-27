import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

import { GEO_FILTER, STATES_KEY } from "../lib/constants";

import SelectMenu from "./SelectMenu";
import { getAreaOptions } from "../lib/api";

interface GeoFiltersProps {
  stateKey: string;
  areaType?: string;
  area?: string;
  mapping: any;
}

const GeoFilters = ({ stateKey, areaType, area, mapping }: GeoFiltersProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  // options for area type: district, parliamen, dun
  const [selectedAreaType, setSelectedAreaType] = useState(areaType);
  const [selectedArea, setSelectedArea] = useState(area);

  // TODO: pending backend fix CORS issue
  // useEffect(() => {
  //   if (stateKey && selectedAreaType) {
  //     getAreaOptions({ state: stateKey, filter: selectedAreaType }).then(
  //       (res) => console.log(res)
  //     );
  //   }
  // }, [stateKey, selectedAreaType]);

  return (
    <div className="flex flex-col gap-4">
      <SelectMenu
        options={Object.values(STATES_KEY).map((state) => {
          return { label: t(`states.${state}`), value: state };
        })}
        selected={
          stateKey
            ? {
                label: t(`states.${stateKey}`),
                value: stateKey,
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
          stateKey && selectedAreaType
            ? mapping[stateKey][selectedAreaType].map((area: string) => {
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
            ? router.push(`/${stateKey}/${encodeURIComponent(newSelectedArea)}`)
            : {}
        }
        placeholder={t("filter3_placeholder")}
      />
    </div>
  );
};

export default GeoFilters;
