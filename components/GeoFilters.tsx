import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

import { getAreaOptions } from "../lib/api";
import { GEO_FILTER, STATES_KEY } from "../lib/constants";

import { useAreaOptions } from "../contexts/AreaOptionsContext";

import SelectMenu from "./SelectMenu";

interface GeoFiltersProps {
  stateKey?: string;
  areaType?: string;
  area?: string;
  mapping: any;
}

const GeoFilters = ({ stateKey, areaType, area, mapping }: GeoFiltersProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { options, setOptions } = useAreaOptions();

  // options for area type: district, parliamen, dun
  const [selectedAreaType, setSelectedAreaType] = useState(areaType);
  const [selectedArea, setSelectedArea] = useState(area);

  useEffect(() => {
    if (stateKey && selectedAreaType) {
      getAreaOptions({ state: stateKey, filter: selectedAreaType }).then(
        (res) => setOptions(res)
      );
    } else if (!stateKey || (stateKey && !selectedAreaType)) {
      setOptions(
        Object.values(STATES_KEY).map((state) => {
          return { label: t(`states.${state}`), value: state };
        })
      );
    }
  }, [stateKey, selectedAreaType]);

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
      <SelectMenu
        options={options}
        selected={
          selectedArea
            ? {
                label: t(selectedArea), // TODO: figure how to map area key to actual area name
                value: selectedArea,
              }
            : undefined
        }
        onChange={(newSelectedArea) =>
          newSelectedArea ? router.push(`/${stateKey}/${newSelectedArea}`) : {}
        }
        placeholder={t("filter3_placeholder")}
      />
    </div>
  );
};

export default GeoFilters;
