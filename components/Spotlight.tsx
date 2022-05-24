import { useTranslation } from "next-i18next";

import ComboBox from "./Dropdowns/ComboBox";
import { Option } from "../components/Dropdowns/interface";

interface SpotlightProps {
  currentLocation: Option;
  jitterComparisons: Option[];
  setJitterComparisons: React.Dispatch<React.SetStateAction<Option[]>>;
}

const Spotlight = ({
  currentLocation,
  jitterComparisons,
  setJitterComparisons,
}: SpotlightProps) => {
  const { t } = useTranslation();

  const handleComparisons = (newOption?: Option) => {
    if (!newOption || jitterComparisons?.length === 3) return;

    setJitterComparisons([...jitterComparisons, newOption]);
  };

  const handleClearComparison = (removedOption: Option) => {
    setJitterComparisons(
      jitterComparisons.filter((option) => option.value !== removedOption.value)
    );
  };

  return (
    <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
      <div className="flex h-full w-full items-center justify-between gap-2 md:w-auto">
        <p className="text-sm">{t("spotlight")}:</p>
        <ComboBox
          // TODO: use actual options based on mapping returned from backend
          options={Array(10)
            .fill(0)
            .map((_, index) => ({
              label: `Option ${index + 1}`,
              value: `option-${index + 1}`,
            }))}
          onChange={handleComparisons}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {/* CURRENT LOCATION */}
        <Label color="bg-blue-500" text={currentLocation?.label} />
        {/* JITTER COMPARISONS */}
        {jitterComparisons.length !== 0 &&
          jitterComparisons.map((comparison, index) => {
            return (
              <Label
                key={index}
                color={
                  index === 0
                    ? "bg-orange-500"
                    : index === 1
                    ? "bg-green-500"
                    : "bg-red-500"
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
