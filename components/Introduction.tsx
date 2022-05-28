import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router'
import Link from 'next/link'

import Container from "./Container";
import GeoFilters from "./GeoFilters";
import Map from "./Map";

interface IntroductionProps {
  stateKey?: string;
  state?: string;
  areaType?: string;
  areaKey?: string;
  area?: string;
  geojson: any;
}

const Introduction = ({
  stateKey,
  state,
  areaType,
  areaKey,
  area,
  geojson,
}: IntroductionProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { query, locale, defaultLocale } = router;

  const isQueryEmpty = () => {
      return Object.keys(query).length === 0
  }

  return (
    <Container
      backgroundColor="bg-white"
      className="flex flex-col gap-7 pt-18 pb-5 lg:flex-row lg:gap-16 lg:pt-28 lg:pb-14"
    >
      <div className="w-full lg:w-1/3 md:px-0">
        {/* TITLE */}
        <h2 className="mb-4 text-xl font-semibold">{t("header")}</h2>
        {/* DESCRIPTION */}
        <p className="mb-7 lg:mb-12">{t("description")}</p>
        {/* GEO FILTER */}
        <div className="mb-5 flex justify-between">
            <div className="flex items-center gap-3">
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

          { 
            !isQueryEmpty() && 
            <Link href={`/${locale === defaultLocale ? "" : locale}`}>
              <a className="flex items-center text-sm gap-2">
                 <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 3.75V0.75L2.25 4.5L6 8.25V5.25C8.4825 5.25 10.5 7.2675 10.5 9.75C10.5 12.2325 8.4825 14.25 6 14.25C3.5175 14.25 1.5 12.2325 1.5 9.75H0C0 13.065 2.685 15.75 6 15.75C9.315 15.75 12 13.065 12 9.75C12 6.435 9.315 3.75 6 3.75Z" fill="#898989"/>
                 </svg>
                 <span>{t('filter_clear')}</span>
              </a>
            </Link>
          }
          
        </div>
        <GeoFilters
          stateKey={stateKey}
          areaKey={areaKey}
          area={area}
          areaType={areaType}
        />
      </div>
      <div className="flex w-full flex-col px-4 lg:w-2/3 lg:px-0">
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
            {state || t("malaysia")}
          </p>
        </div>
        {/* MAP */}
        <Map geojson={geojson} />
        <div className='flex items-center gap-2 pt-1 text-gray-700'>
            <svg fill="#898989" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="16px" height="16px">
                <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16,21h-2v-7h2V21z M15,11.5 c-0.828,0-1.5-0.672-1.5-1.5s0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5S15.828,11.5,15,11.5z"/>
            </svg>
            <small>Scroll down to learn about your area!</small>
        </div>
      </div>
    </Container>
  );
};

export default Introduction;
