import { useTranslation } from "next-i18next";

import { useLocationContext } from "../contexts/GeoFiltersContext";
import Container from "./Container";
import GeoFilters from "./GeoFilters";

const Introduction = () => {
  const { t } = useTranslation();
  const { state, area } = useLocationContext();

  return (
    <Container backgroundColor="bg-white" className="flex gap-16 pt-28 pb-14">
      <div className="w-2/5">
        {/* TITLE */}
        <h2 className="mb-4 text-xl font-semibold">{t("title")}</h2>
        {/* DESCRIPTION */}
        <p className="mb-12">{t("description")}</p>
        {/* GEO FILTER */}
        <h3 className="mb-5 text-xl font-semibold">{t("filter_title")}</h3>
        <GeoFilters />
      </div>
      <div className="flex w-3/5 flex-col">
        <div className="mb-4 flex items-center gap-3">
          {/* ICON */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          {/* LOCATION */}
          <p className="text-xl font-semibold">
            {area ? `${area}, ` : ""}
            {state}
          </p>
        </div>
        <div className="h-full rounded-lg bg-gray-200" />
      </div>
    </Container>
  );
};

export default Introduction;
