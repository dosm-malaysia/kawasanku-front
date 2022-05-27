import { useTranslation } from "next-i18next";

import { AREA_TYPES } from "../../../lib/constants";

interface IndicatorsProps {
  areaType: AREA_TYPES;
}

const Indicators = ({ areaType }: IndicatorsProps) => {
  const { t } = useTranslation();

  return (
    <div className="mb-3 flex h-full w-full items-center">
      <div className="w-0 md:w-1/3" />
      <div className="flex w-full items-center md:w-2/3">
        {/* WORSE THAN MEDIAN */}
        <div className="flex w-1/3 items-center justify-start text-gray-400 md:justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1 h-2.5 w-2.5 -rotate-90 transform"
            fill="#9ca3af"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-sm">{t("worse_than_median")}</p>
        </div>
        {/* MEDIAN */}
        <div className="flex w-1/3 flex-col items-center text-accent">
          <p className="text-sm font-semibold">
            {t("median", { area_type: areaType })}
          </p>
        </div>
        {/* BETTER THAN MEDIAN */}
        <div className="flex w-1/3 items-center justify-end text-gray-400 md:justify-center">
          <p className="text-sm text-gray-400">{t("better_than_median")}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 h-2.5 w-2.5 rotate-90 transform"
            fill="#9ca3af"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Indicators;
