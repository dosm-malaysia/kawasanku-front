import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FunctionComponent, useEffect, useState } from "react";

import { getAreaOptions } from "../../lib/api";
import { isFederalTerritory } from "../../lib/helpers";
import { GEO_FILTER, STATES_KEY } from "../../lib/constants";

import SelectMenu from "../Dropdowns/Select";
import { Option } from "../Dropdowns/interface";

interface GeoFiltersProps {
  stateKey?: string;
  areaType?: string;
  areaKey?: string;
  area?: string;
}

const GeoFilters: FunctionComponent<GeoFiltersProps> = ({
  stateKey,
  areaType,
  areaKey,
  area,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { query } = router;

  const defaultGeoFilters = Object.values(GEO_FILTER).map(filter => {
    return { label: t(filter), value: filter };
  });

  // options for area type: district, parlimen, dun
  const [selectedAreaType, setSelectedAreaType] = useState(areaType);
  const [options, setOptions] = useState<Option[]>([]);

  const [geoFilterOptions, setGeoFilterOptions] = useState(
    Object.values(GEO_FILTER).map(filter => {
      return { label: t(filter), value: filter };
    })
  );

  // HIDE DUN OPTION IF SELECTED STATE IS A FEDERAL TERRITORY
  useEffect(() => {
    if (stateKey && isFederalTerritory(stateKey)) {
      setGeoFilterOptions(
        defaultGeoFilters.filter(
          geoFilter => geoFilter.value !== GEO_FILTER.Dun
        )
      );
    } else if (stateKey && !isFederalTerritory(stateKey)) {
      setGeoFilterOptions(defaultGeoFilters);
    }
  }, [stateKey]);

  useEffect(() => {
    if (stateKey && selectedAreaType) {
      getAreaOptions({ state: stateKey, filter: selectedAreaType }).then(res =>
        setOptions(res)
      );
    }
  }, [stateKey, selectedAreaType]);

  return (
    <div className="flex flex-col gap-4">
      {/* SELECT STATE */}
      <SelectMenu
        options={Object.values(STATES_KEY).map(state => {
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
        onChange={newStateKey => router.push(`/${newStateKey}`)}
        placeholder={t("filter1_placeholder")}
      />
      {/* SELECT GEO FILTER */}
      <SelectMenu
        options={geoFilterOptions}
        selected={
          selectedAreaType
            ? {
                label: t(selectedAreaType),
                value: selectedAreaType,
              }
            : undefined
        }
        onChange={newAreaType => setSelectedAreaType(newAreaType)}
        disabled={!query.state}
        placeholder={t("filter2_placeholder")}
      />
      {/* SELECT SUB-NATIONAL AREA */}
      <SelectMenu
        options={options.sort((a, b) => a.label.localeCompare(b.label))}
        selected={
          area && areaKey
            ? {
                label: area,
                value: areaKey,
              }
            : undefined
        }
        onChange={newArea =>
          newArea ? router.push(`/${stateKey}/${newArea}`) : {}
        }
        disabled={!selectedAreaType}
        placeholder={t("filter3_placeholder")}
      />
    </div>
  );
};

export default GeoFilters;
