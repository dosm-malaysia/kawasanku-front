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
  getStatePaths,
  getJitterplots,
  getAreaType,
} from "../../lib/api";

import Card from "../../components/Card";
import Container from "../../components/Container";
import Spotlight from "../../components/Spotlight";
import Introduction from "../../components/Introduction";
import { Option } from "../../components/Dropdowns/interface";
import { translateDoughnutChart } from "../../lib/helpers";
import Head from 'next/head'

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

const State: NextPage = ({
  stateKey,
  geojson,
  areaType,
  barChartData,
  sex,
  ethnicity,
  nationality,
  religion,
  maritalStatus,
  ageGroup,
  jitterplotData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  const [jitterComparisons, setJitterComparisons] = useState<Option[]>([]);

  return (
    <>
      <Head>
        <title>{t(`states.${stateKey}`)} &middot; {t("title")}</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Introduction
        stateKey={stateKey}
        state={t(`states.${stateKey}`)}
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
            {t("section1_title1")}{" "}
            <span className="underline">{t(`states.${stateKey}`)}</span>{" "}
            {t("section1_title2")}
          </h3>
          <p className="text-sm text-gray-400">{t("census_2020")}</p>
        </div>
        <div className="mb-10 flex w-full flex-col gap-4 md:mb-15 md:flex-row">
          {/* BAR CHART */}
          <div className="w-full md:w-1/3">
            <Card className="rounded-lg border">
              <BarChart data={barChartData} />
            </Card>
          </div>
          {/* DOUGHNUT CHARTS */}
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 overflow-hidden rounded-lg border md:grid-cols-3 md:grid-rows-2">
              <DoughnutChart title={t("doughnut.metric_1")} data={sex} />
              <DoughnutChart title={t("doughnut.metric_2")} data={ethnicity} />
              <DoughnutChart
                title={t("doughnut.metric_3")}
                data={nationality}
              />
              <DoughnutChart title={t("doughnut.metric_4")} data={religion} />
              <DoughnutChart
                title={t("doughnut.metric_5")}
                data={maritalStatus}
              />
              <DoughnutChart title={t("doughnut.metric_6")} data={ageGroup} />
            </div>
          </div>
        </div>
        {/* JITTERPLOT TITLE */}
        <div className="mb-6 flex w-full flex-col items-start justify-between gap-2 md:mb-7 md:flex-row md:items-center md:gap-0">
          <h3 className="section-title">
            {t("section2_title2_1")}{" "}
            <span className="underline">{t(`states.${stateKey}`)}</span>{" "}
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
            currentLocation={{
              label: t(`states.${stateKey}`),
              value: stateKey,
            }}
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
  const statePaths = await getStatePaths();

  type StatePathsType = { params: { state: string }; locale?: string }[];

  const en: StatePathsType = [];
  const ms: StatePathsType = [];
  const zh: StatePathsType = [];
  const ta: StatePathsType = [];

  statePaths.forEach((state) => {
    // state returned as "/state"
    const formattedState = state.substring(1);
    en.push({ params: { state: formattedState } });
    ms.push({ params: { state: formattedState }, locale: "ms-MY" });
    zh.push({ params: { state: formattedState }, locale: "ta-IN" });
    ta.push({ params: { state: formattedState }, locale: "zh-CN" });
  });

  return { paths: [...en, ...ms, ...zh, ...ta], fallback: false };
};

interface IParams extends ParsedUrlQuery {
  state: string;
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { state } = params as IParams;

  const translationReq = serverSideTranslations(locale!, ["common"]);
  const geoReq = getGeojson(state);
  const snapshotReq = getSnapshot({ area: state });
  const jitterplotsReq = getJitterplots({ area: state });
  const areaTypeReq = getAreaType(state);

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

  // DOUGHNUT CHARTS DATA
  const doughnutCharts = res[2].doughnut_charts;
  const sex = doughnutCharts.sex;
  const ethnicity = doughnutCharts.ethnicity;
  const nationality = doughnutCharts.nationality;
  const religion = doughnutCharts.religion;
  const maritalStatus = doughnutCharts.marital;
  const ageGroup = doughnutCharts.agegroup;

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
  const translatedReligion = translateDoughnutChart(translationStore, religion);
  const translatedMaritalStatus = translateDoughnutChart(
    translationStore,
    maritalStatus
  );
  const translatedAgeGroup = translateDoughnutChart(translationStore, ageGroup);

  // PYRAMID CHART DATA
  const pyramidCharts = res[2].pyramid_charts;

  // JITTERPLOTS DATA
  const jitterplotData = res[3];

  const areaType = res[4].area_type;

  return {
    props: {
      stateKey: state,
      geojson,
      areaType,
      // DOUGHNUT CHARTS DATA
      sex: translatedSex,
      ethnicity: translatedEthnicity,
      nationality: translatedNationality,
      religion: translatedReligion,
      maritalStatus: translatedMaritalStatus,
      ageGroup: translatedAgeGroup,
      // PYRAMID CHART DATA
      barChartData: pyramidCharts,
      // JITTERPLOT DATA
      jitterplotData,
      ...translation,
    },
  };
};

export default State;
