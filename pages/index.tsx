import React, { useState } from "react";
import dynamic from "next/dynamic";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Card from "../components/Card";
import Container from "../components/Container";
import Spotlight from "../components/Spotlight";
import Introduction from "../components/Introduction";
import { Option } from "../components/Dropdowns/interface";

import { translateDoughnutChart } from "../lib/helpers";
import { AREA_TYPES, MALAYSIA, STATES_KEY } from "../lib/constants";
import { getGeojson, getJitterplots, getSnapshot } from "../lib/api";
import Head from 'next/head';

const BarChart = dynamic(() => import("../components/Charts/BarChart"), {
  ssr: false,
});
const DoughnutChart = dynamic(
  () => import("../components/Charts/DoughnutCharts"),
  { ssr: false }
);
const JitterPlots = dynamic(() => import("../components/JitterPlots"), {
  ssr: false,
});

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
      <Head>
        <title>{t("title")} | DOSM</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Introduction geojson={geojson} />
      {/* CHARTS */}
      <Container
        backgroundColor="bg-gray-100"
        className="flex flex-col px-4 pt-5 md:pt-14 xl:px-0"
      >
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const translationReq = serverSideTranslations(locale!, ["common"]);
    
  /**
  const geoReq = getGeojson(MALAYSIA);
  const snapshotReq = getSnapshot({ area: MALAYSIA });
  // get data accross state level as default (use any state for area param)
  const jitterplotsReq = getJitterplots({ area: STATES_KEY.JOHOR });
 */
  const res = await Promise.all([
    translationReq,
    // geoReq,
    // snapshotReq,
    // jitterplotsReq,
  ]);

  // TRANSLATION
  const translation = res[0];
  const translationStore =
    translation._nextI18Next.initialI18nStore[locale!]["common"];
/**
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
   */

  return {
    props: {
    //   geojson,
    //   DOUGHNUT CHARTS DATA
    //   sex: translatedSex,
    //   ethnicity: translatedEthnicity,
    //   nationality: translatedNationality,
    //   religion: translatedReligion,
    //   maritalStatus: translatedMaritalStatus,
    //   ageGroup: translatedAgeGroup,
    //   PYRAMID CHART DATA
    //   barChartData: pyramidCharts,
    //   JITTERPLOT DATA
    //   jitterplotData,
      ...translation,
    },
  };
};

export default Home;
