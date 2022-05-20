import { useTranslation } from "next-i18next";

import Container from "./Container";
import GeoFilters from "./GeoFilters";

interface IntroductionProps {
  state_key: string;
  state: string;
  areaType: string;
  area: string;
  mapping: any;
}

const Introduction = ({
  state_key,
  state,
  areaType,
  area,
  mapping,
}: IntroductionProps) => {
  const { t } = useTranslation();

  return (
    <Container backgroundColor="bg-white" className="flex gap-16 pt-28 pb-14">
      <div className="w-2/5">
        {/* TITLE */}
        <h2 className="mb-4 text-xl font-semibold">{t("title")}</h2>
        {/* DESCRIPTION */}
        <p className="mb-12">{t("description")}</p>
        {/* GEO FILTER */}
        <div className="mb-5 flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path d="M288 256C288 273.7 273.7 288 256 288C238.3 288 224 273.7 224 256C224 238.3 238.3 224 256 224C273.7 224 288 238.3 288 256zM0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM325.1 306.7L380.6 162.4C388.1 142.1 369 123.9 349.6 131.4L205.3 186.9C196.8 190.1 190.1 196.8 186.9 205.3L131.4 349.6C123.9 369 142.1 388.1 162.4 380.6L306.7 325.1C315.2 321.9 321.9 315.2 325.1 306.7V306.7z" />
          </svg>
          <h3 className="text-xl font-semibold">{t("filter_title")}</h3>
        </div>
        <GeoFilters
          state_key={state_key}
          state={state}
          areaType={areaType}
          area={area}
          mapping={mapping}
        />
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
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
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
