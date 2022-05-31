import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import Card from "../components/Card";
import Metadata from "../components/Metadata";
import Container from "../components/Container";
import Introduction from "../components/Introduction";
import { Option } from "../components/Dropdowns/interface";
import Spotlight from "../components/Charts/Jitterplot/Spotlight";

import { translateDoughnutChart } from "../lib/helpers";
import { AREA_TYPES, MALAYSIA, STATES_KEY } from "../lib/constants";
import { getGeojson, getJitterplots, getSnapshot } from "../lib/api";

const BarChart = dynamic(() => import("../components/Charts/Bar"), {
  ssr: false,
});
const DoughnutChart = dynamic(() => import("../components/Charts/Doughnut"), {
  ssr: false,
});
const JitterPlots = dynamic(
  () => import("../components/Charts/Jitterplot/Jitterplots"),
  {
    ssr: false,
  }
);

const Home: NextPage = ({
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

  return (
    <>
      <Metadata title={t("title")} />
      <Introduction geojson={geojson} />
      {/* CHARTS */}
      <Container
        backgroundColor="bg-gray-100"
        className="flex flex-col pt-5 md:pt-14"
      >
        {/* BAR CHART TITLE */}
        <div className="mb-5 flex w-full flex-col items-start justify-between gap-2 md:mb-7 md:flex-row md:items-center md:gap-0">
          <h3 className="section-title">
            {t("section1_title1")}{" "}
            <span className="capitalize underline">{t("malaysia")}</span>{" "}
            {t("section1_title2")}
          </h3>
          <p className="text-sm text-gray-400">{t("census_2020")}</p>
        </div>
        <div className="mb-10 flex w-full flex-col gap-4 md:mb-15 lg:flex-row">
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
        <div className="mb-6 flex w-full flex-col items-start justify-between gap-2 md:mb-7 md:flex-row md:items-center md:gap-0">
          <h3 className="section-title">{t("section2_title1")}</h3>
          <p className="text-sm text-gray-400">{t("census_2020")}</p>
        </div>
      </Container>
      <Container
        backgroundColor="bg-white md:bg-gray-100"
        className="sm:mb-10 md:rounded-lg"
      >
        <Card
          padding="px-0 pt-4 pb-10 sm:p-4"
          className="relative overflow-hidden rounded-lg md:border"
        >
          {/* SPOTLIGHT */}
          <Spotlight
            jitterComparisons={jitterComparisons}
            setJitterComparisons={setJitterComparisons}
          />
          {/* JITTERPLOTS */}
          <JitterPlots
            areaType={AREA_TYPES.State}
            data={jitterplotData}
            comparisons={jitterComparisons}
          />
        </Card>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translationReq = serverSideTranslations(locale!, ["common"]);

  const geoReq = getGeojson(MALAYSIA);
  const snapshotReq = getSnapshot({ area: MALAYSIA });
  // get data accross state level as default (use any state for area param)
  const jitterplotsReq = getJitterplots({ area: STATES_KEY.JOHOR });
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
      geojson,
      //   DOUGHNUT CHARTS DATA
      sex: translatedSex,
      ethnicity: translatedEthnicity,
      nationality: translatedNationality,
      religion: translatedReligion,
      maritalStatus: translatedMaritalStatus,
      ageGroup: translatedAgeGroup,
      //   PYRAMID CHART DATA
      barChartData: pyramidCharts,
      //   JITTERPLOT DATA
      jitterplotData,
      ...translation,
    },
  };
};

export default Home;
