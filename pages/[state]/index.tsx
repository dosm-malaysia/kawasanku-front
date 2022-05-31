import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import {
  getSnapshot,
  getGeojson,
  getStatePaths,
  getJitterplots,
} from "../../lib/api";

import Card from "../../components/Card";
import Metadata from "../../components/Metadata";
import Container from "../../components/Container";
import Introduction from "../../components/Introduction";
import { Option } from "../../components/Dropdowns/interface";
import Spotlight from "../../components/Charts/Jitterplot/Spotlight";

import { AREA_TYPES } from "../../lib/constants";
import { translateDoughnutChart } from "../../lib/helpers";

const BarChart = dynamic(() => import("../../components/Charts/Bar"), {
  ssr: false,
});
const DoughnutChart = dynamic(
  () => import("../../components/Charts/Doughnut"),
  { ssr: false }
);
const JitterPlots = dynamic(
  () => import("../../components/Charts/Jitterplot/Jitterplots"),
  {
    ssr: false,
  }
);

const State: NextPage = ({
  stateKey,
  geojson,
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

  useEffect(() => {
    setJitterComparisons([]);
  }, [stateKey]);

  return (
    <>
      {/* METADATA */}
      <Metadata
        title={`${t(`states.${stateKey}`)} · ${t("title")}`}
        keywords={`${t(`states.${stateKey}`)} kawasanku statistics dosm`}
      />
      {/* INTRODUCTION */}
      <Introduction
        stateKey={stateKey}
        state={t(`states.${stateKey}`)}
        geojson={geojson}
      />
      {/* SNAPSHOT */}
      <Container
        backgroundColor="snapshot-container-background"
        className="snapshot-container"
      >
        {/* BAR CHART TITLE */}
        <div className="bar-chart-title">
          <h3 className="section-title">
            {t("section1_title1")}{" "}
            <span className="underline">{t(`states.${stateKey}`)}</span>{" "}
            {t("section1_title2")}
          </h3>
          <p className="census-text">{t("census_2020")}</p>
        </div>
        <div className="snapshot-layout">
          {/* BAR CHART */}
          <div className="w-full lg:w-1/3">
            <Card className="rounded-lg border">
              <BarChart data={barChartData} />
            </Card>
          </div>
          {/* DOUGHNUT CHARTS */}
          <div className="w-full lg:w-2/3">
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
        <div className="jitterplot-title">
          <h3 className="section-title">
            {t("section2_title2_1")}{" "}
            <span className="underline">{t(`states.${stateKey}`)}</span>{" "}
            {t("section2_title2_2", {
              area_types: t(`area_types.${AREA_TYPES.State}`),
            })}
          </h3>
          <p className="census-text">{t("census_2020")}</p>
        </div>
      </Container>
      <Container
        backgroundColor="jitterplot-container-background"
        className="jitterplot-container"
      >
        <Card padding="jitterplot-card-padding" className="jitterplot-card">
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
            areaType={AREA_TYPES.State}
            data={jitterplotData}
            comparisons={jitterComparisons}
            currentLocation={{
              label: t(`states.${stateKey}`),
              value: stateKey,
            }}
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

  statePaths.forEach(state => {
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

  const res = await Promise.all([
    translationReq,
    geoReq,
    snapshotReq,
    jitterplotsReq,
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

  return {
    props: {
      stateKey: state,
      geojson,
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
