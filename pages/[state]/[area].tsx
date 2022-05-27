import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ParsedUrlQuery } from "querystring";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import {
  getSnapshot,
  getGeojson,
  getJitterplots,
  getAreaType,
  getAreaPaths,
} from "../../lib/api";
import { GEO_FILTER } from "../../lib/constants";
import { IDoughnutCharts } from "../../lib/interfaces";
import { translateDoughnutChart } from "../../lib/helpers";

import Card from "../../components/Card";
import Container from "../../components/Container";
import Spotlight from "../../components/Spotlight";
import ShareButton from "../../components/Share/Button";
import Introduction from "../../components/Introduction";
import { Option } from "../../components/Dropdowns/interface";

const BarChart = dynamic(() => import("../../components/Charts/BarChart"), {
  ssr: false,
});
const DoughnutChart = dynamic(
  () => import("../../components/Charts/DoughnutCharts"),
  { ssr: false }
);
const JitterPlots = dynamic(() => import("../../components/JitterPlots"), {
  ssr: false,
});

const Area: NextPage = ({
  stateKey,
  geojson,
  areaKey,
  areaType,
  areaName,
  barChartData,
  sex,
  ethnicity,
  nationality,
  ageGroup,
  religion,
  maritalStatus,
  housing,
  labour,
  jitterplotData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  const [jitterComparisons, setJitterComparisons] = useState<Option[]>([]);

  return (
    <>
      <Introduction
        stateKey={stateKey}
        state={t(`states.${stateKey}`)}
        areaKey={areaKey}
        areaType={areaType}
        area={areaName}
        geojson={geojson}
      />
      {/* CHARTS */}
      <Container
        backgroundColor="bg-gray-100"
        className="flex flex-col px-4 pt-5 md:pt-14 lg:px-0"
      >
        {/* BAR CHART TITLE */}
        <div className="mb-5 flex w-full flex-col items-start justify-between gap-2 md:mb-7 md:flex-row md:items-center md:gap-0">
          <h3 className="section-title">
            {t("section1_title1")} <span className="underline">{areaName}</span>{" "}
            {t("section1_title2")}
          </h3>
          <p className="text-sm text-gray-400">{t("census_2020")}</p>
        </div>
        <div className="mb-10 flex w-full flex-col gap-4 md:mb-15 md:flex-row">
          {/* BAR CHART (DISTRICT ONLY) */}
          {areaType === GEO_FILTER.District && (
            <div className="w-full md:w-1/3">
              <Card className="rounded-lg border">
                <BarChart data={barChartData} />
              </Card>
            </div>
          )}
          {/* DOUGHNUT CHARTS */}
          <div
            className={
              areaType === GEO_FILTER.District ? "w-full md:w-2/3" : "w-full"
            }
          >
            <div className="grid grid-cols-1 overflow-hidden rounded-lg border md:grid-cols-3 md:grid-rows-2">
              <DoughnutChart title={t("doughnut.metric_1")} data={sex} />
              <DoughnutChart title={t("doughnut.metric_2")} data={ethnicity} />
              <DoughnutChart
                title={t("doughnut.metric_3")}
                data={nationality}
              />
              {areaType === GEO_FILTER.District ? (
                <>
                  <DoughnutChart
                    title={t("doughnut.metric_4")}
                    data={religion}
                  />
                  <DoughnutChart
                    title={t("doughnut.metric_5")}
                    data={maritalStatus}
                  />
                </>
              ) : (
                <>
                  <DoughnutChart
                    title={t("doughnut.metric_7")}
                    data={housing}
                  />
                  <DoughnutChart title={t("doughnut.metric_8")} data={labour} />
                </>
              )}
              <DoughnutChart title={t("doughnut.metric_6")} data={ageGroup} />
            </div>
          </div>
        </div>
        {/* JITTERPLOT TITLE */}
        <div className="mb-6 flex w-full flex-col items-start justify-between gap-2 md:mb-7 md:flex-row md:items-center md:gap-0">
          <h3 className="section-title">
            {t("section2_title2_1")}{" "}
            <span className="underline">{areaName}</span>{" "}
            {t("section2_title2_2", {
              area_types: t(`area_types.${areaType}`),
            })}
          </h3>
          <p className="text-sm text-gray-400">{t("census_2020")}</p>
        </div>
      </Container>
      <Container
        backgroundColor="bg-white md:bg-gray-100"
        className="pb-5 md:pb-8"
      >
        <Card className="relative overflow-hidden rounded-lg md:border">
          {/* SPOTLIGHT */}
          <Spotlight
            currentLocation={{ label: areaName, value: areaKey }}
            jitterComparisons={jitterComparisons}
            setJitterComparisons={setJitterComparisons}
          />
          {/* JITTERPLOTS */}
          <JitterPlots
            areaType={areaType}
            data={jitterplotData}
            comparisons={jitterComparisons}
          />
        </Card>
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const areaPaths = await getAreaPaths();

  type AreaPathsType = {
    params: { state: string; area: string };
    locale?: string;
  }[];

  const en: AreaPathsType = [];
  const ms: AreaPathsType = [];
  // const zh: AreaPathsType = [];
  // const ta: AreaPathsType = [];

  areaPaths.forEach((area) => {
    // area returned as "/state/area"
    const areaArr = area.substring(1).split("/");

    en.push({ params: { state: areaArr[0], area: areaArr[1] } });
    ms.push({
      params: { state: areaArr[0], area: areaArr[1] },
      locale: "ms-MY",
    });
    // ta.push({
    //   params: { state: areaArr[0], area: areaArr[1] },
    //   locale: "ta-IN",
    // });
    // zh.push({
    //   params: { state: areaArr[0], area: areaArr[1] },
    //   locale: "zh-CN",
    // });
  });

  // TODO: build all paths but just test if 1 language can build on Netlify
  return { paths: [...en], fallback: false };
  // return { paths: [...en, ...ms, ...zh, ...ta], fallback: false };
};

interface IParams extends ParsedUrlQuery {
  state: string;
  area: string;
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { state, area } = params as IParams;

  const translationReq = serverSideTranslations(locale!, ["common"]);
  const geoReq = getGeojson(area);
  const snapshotReq = getSnapshot({ area });
  const jitterplotsReq = getJitterplots({ area: area });
  const areaTypeReq = getAreaType(area);

  const res = await Promise.all([
    translationReq,
    geoReq,
    snapshotReq,
    jitterplotsReq,
    areaTypeReq,
  ]);

  // TRANSLATION
  const translation = res[0];
  const translationStore =
    translation._nextI18Next.initialI18nStore[locale!]["common"];

  // GEOJSON
  const geojson = res[1];

  // AREA INFORMATION
  const areaType = res[4].area_type;
  const areaName = res[4].area_name;

  // DOUGHNUT CHARTS DATA
  const doughnutCharts = res[2].doughnut_charts as unknown as IDoughnutCharts;
  const sex = doughnutCharts.sex;
  const ethnicity = doughnutCharts.ethnicity;
  const nationality = doughnutCharts.nationality;
  const ageGroup = doughnutCharts.agegroup;
  const religion = doughnutCharts.religion; // district only
  const maritalStatus = doughnutCharts.marital; // district only
  const housing = doughnutCharts.housing; // parliament and assembly only
  const labour = doughnutCharts.labour; // parliament and assembly only

  // TRANSLATED DOUGHNUT CHARTS DATA
  const translatedSex = translateDoughnutChart(translationStore, sex);
  const translatedEthnicity = translateDoughnutChart(
    translationStore,
    ethnicity
  );
  const translatedNationality = translateDoughnutChart(
    translationStore,
    nationality
  );
  const translatedAgeGroup = translateDoughnutChart(translationStore, ageGroup);
  const translatedReligion = religion
    ? translateDoughnutChart(translationStore, religion)
    : null;
  const translatedMaritalStatus = maritalStatus
    ? translateDoughnutChart(translationStore, maritalStatus)
    : null;
  const translatedHousing = housing
    ? translateDoughnutChart(translationStore, housing)
    : null;
  const translatedLabour = labour
    ? translateDoughnutChart(translationStore, labour)
    : null;

  // PYRAMID CHART DATA
  const pyramidCharts = res[2].pyramid_charts ?? null; // district only

  // JITTERPLOTS DATA
  const jitterplotData = res[3];

  console.log(res);

  return {
    props: {
      stateKey: state,
      geojson,
      areaKey: area,
      areaType,
      areaName,
      // DOUGHNUT CHARTS DATA
      sex: translatedSex,
      ethnicity: translatedEthnicity,
      nationality: translatedNationality,
      ageGroup: translatedAgeGroup,
      religion: translatedReligion,
      maritalStatus: translatedMaritalStatus,
      housing: translatedHousing,
      labour: translatedLabour,
      // PYRAMID CHART DATA
      barChartData: pyramidCharts,
      // JITTERPLOT DATA
      jitterplotData,
      ...translation,
    },
  };
};

export default Area;
