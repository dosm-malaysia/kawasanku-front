import { useTranslation } from "next-i18next";
import { FunctionComponent, useEffect, useState } from "react";

import { getAreaOptions } from "../../../lib/api";
import { STATES_KEY } from "../../../lib/constants";

import ComboBox from "../../Dropdowns/ComboBox";
import { Option } from "../../Dropdowns/interface";

interface SpotlightProps {
  areaType?: string;
  currentLocation?: Option;
  jitterComparisons: Option[];
  setJitterComparisons: React.Dispatch<React.SetStateAction<Option[]>>;
}

const Spotlight: FunctionComponent<SpotlightProps> = ({
  areaType,
  currentLocation,
  jitterComparisons,
  setJitterComparisons,
}) => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<Option[]>(
    Object.values(STATES_KEY).map(state => {
      return { label: t(`states.${state}`), value: state };
    })
  );

  const handleComparisons = (newOption?: Option) => {
    if (!newOption || jitterComparisons?.length === 3) return;

    setJitterComparisons([...jitterComparisons, newOption]);
  };

  const handleClearComparison = (removedOption: Option) => {
    setJitterComparisons(
      jitterComparisons.filter(option => option.value !== removedOption.value)
    );
  };

  useEffect(() => {
    if (areaType)
      getAreaOptions({ filter: areaType })
        .then(res => setOptions(res))
        .catch(err => console.log(err));
  }, [areaType]);

  return (
    <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
      <div className="flex h-full w-full items-center justify-between gap-2 md:w-auto">
        <p className="text-sm">{t("spotlight")}:</p>
        <ComboBox
          options={options}
          onChange={handleComparisons}
          placeholder={t("spotlight_placeholder")}
        ></ComboBox>
      </div>
      <div className="flex w-full flex-wrap items-start gap-3 md:w-auto md:items-center">
        {/* CURRENT LOCATION */}
        {currentLocation && (
          <Label color="bg-accent" text={currentLocation?.label} />
        )}
        {/* JITTER COMPARISONS */}
        {jitterComparisons.length !== 0 &&
          jitterComparisons.map((comparison, index) => {
            return (
              <Label
                key={index}
                color={
                  index === 0
                    ? "bg-[#D44647]"
                    : index === 1
                    ? "bg-[#2873E8]"
                    : "bg-[#EC9E29]"
                }
                text={comparison.label}
                isClearable={true}
                handleClear={() => handleClearComparison(comparison)}
              />
            );
          })}
      </div>
    </div>
  );
};

interface LabelProps {
  color: string;
  text: string;
  isClearable?: boolean;
  handleClear?: () => void;
}

const Label = ({
  color,
  text,
  isClearable = false,
  handleClear,
}: LabelProps) => {
  return (
    <div
      className={`flex items-center ${
        isClearable ? "rounded-xl bg-gray-200 px-2 py-0.5" : ""
      }`}
    >
      <div className="rounded-full bg-white p-0.5">
        <div className={`h-3 w-3 rounded-full ${color}`} />
      </div>
      <div className="mx-1 text-sm font-semibold">{text}</div>
      {isClearable && (
        <button
          className="focus:outline-none focus:ring-0"
          onClick={handleClear}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Spotlight;
