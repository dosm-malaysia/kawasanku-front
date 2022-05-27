import React, { useState } from "react";
import dynamic from "next/dynamic";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// TODO: remove after getting actual mapping from backend
import mappingJson from "../data/json/mapping.json";

import Card from "../components/Card";
import Container from "../components/Container";
import Spotlight from "../components/Spotlight";
import Introduction from "../components/Introduction";
import { Option } from "../components/Dropdowns/interface";
import ShareButton from "../components/Share/Button";

import { translateDoughnutChart } from "../lib/helpers";
import { MALAYSIA, STATES_KEY } from "../lib/constants";
import { getGeojson, getJitterplots, getSnapshot } from "../lib/api";

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
  mapping,
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

  return <></>;

  return (
    <>
      <Introduction geojson={geojson} mapping={mapping} />
      {/* CHARTS */}
      <Container
        backgroundColor="bg-gray-100"
        className="flex flex-col px-4 pt-5 md:pt-14 lg:px-0"
      >
        {/* BAR CHART TITLE */}
        <div className="mb-5 flex w-full flex-col items-start justify-between gap-2 md:mb-7 md:flex-row md:items-center md:gap-0">
          <h3 className="section-title">{t("section1_title")}</h3>
          <p className="text-sm text-gray-400">{t("census_2020")}</p>
        </div>
        <div className="mb-10 flex w-full flex-col gap-4 md:mb-15 md:flex-row">
          {/* BAR CHART */}
          <div className="w-full md:w-1/3">
            <div className="flex h-full w-full flex-col divide-y overflow-hidden rounded-lg border bg-white">
              <Card>
                <BarChart data={barChartData} />
              </Card>
              <ShareButton />
            </div>
          </div>
          {/* DOUGHNUT CHARTS */}
          <div className="w-full md:w-2/3">
            <div className="flex h-full w-full flex-col divide-y-0.5 overflow-hidden rounded-lg border bg-white">
              <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2">
                <DoughnutChart title={t("doughnut.metric_1")} data={sex} />
                <DoughnutChart
                  title={t("doughnut.metric_2")}
                  data={ethnicity}
                />
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
              <ShareButton />
            </div>
          </div>
        </div>
        {/* JITTERPLOT TITLE */}
        <div className="mb-6 flex w-full flex-col items-start justify-between gap-2 md:mb-7 md:flex-row md:items-center md:gap-0">
          <h3 className="section-title">{t("section2_title")}</h3>
          <p className="text-sm text-gray-400">{t("census_2020")}</p>
        </div>
      </Container>
      <Container
        backgroundColor="bg-white md:bg-gray-100"
        className="pb-5 md:pb-8"
      >
        <div className="flex h-full w-full flex-col divide-y overflow-hidden border-0 border-b bg-white md:rounded-lg md:border">
          <Card className="relative">
            {/* SPOTLIGHT */}
            <Spotlight
              // TODO: set current location based on location returned from backend
              currentLocation={{ label: "Ipoh", value: "Ipoh" }}
              jitterComparisons={jitterComparisons}
              setJitterComparisons={setJitterComparisons}
            />
            {/* JITTERPLOTS */}
            <JitterPlots
              data={jitterplotData}
              comparisons={jitterComparisons}
            />
          </Card>
          <ShareButton />
        </div>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translationReq = serverSideTranslations(locale!, ["common"]);
  const geoReq = getGeojson(MALAYSIA);
  const snapshotReq = Promise.resolve(null);
  // const snapshotReq = getSnapshot({ state: MALAYSIA });
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

  // // DOUGHNUT CHARTS DATA
  // const doughnutCharts = res[2].doughnut_charts;
  // const sex = doughnutCharts.sex;
  // const ethnicity = doughnutCharts.ethnicity;
  // const nationality = doughnutCharts.nationality;
  // const religion = doughnutCharts.religion;
  // const maritalStatus = doughnutCharts.marital;
  // const ageGroup = doughnutCharts.agegroup;

  // // TRANSLATED DOUGHNUT CHARTS DATA
  // const translatedSex = translateDoughnutChart(translationStore, sex);
  // const translatedEthnicity = translateDoughnutChart(
  //   translationStore,
  //   ethnicity
  // );
  // const translatedNationality = translateDoughnutChart(
  //   translationStore,
  //   nationality
  // );
  // const translatedReligion = translateDoughnutChart(translationStore, religion);
  // const translatedMaritalStatus = translateDoughnutChart(
  //   translationStore,
  //   maritalStatus
  // );
  // const translatedAgeGroup = translateDoughnutChart(translationStore, ageGroup);

  // PYRAMID CHART DATA
  // const pyramidCharts = res[2].pyramid_charts;

  // JITTERPLOTS DATA
  const jitterplotData = res[3];

  const mappingData = mappingJson;

  const barChartData = [
    {
      country: "AD",
      fries: 50,
      burger: 60,
      sandwich: -60,
      kebab: -50,
    },
    {
      country: "AC",
      fries: 40,
      burger: 50,
      sandwich: -50,
      kebab: -40,
    },
    {
      country: "AB",
      fries: 30,
      burger: 40,
      sandwich: -40,
      kebab: -30,
    },

    {
      country: "AA",
      fries: 20,
      burger: 30,
      sandwich: -30,
      kebab: -20,
    },
  ];

  return {
    props: {
      geojson,
      mapping: mappingData,
      // DOUGHNUT CHARTS DATA
      // sex: translatedSex,
      // ethnicity: translatedEthnicity,
      // nationality: translatedNationality,
      // religion: translatedReligion,
      // maritalStatus: translatedMaritalStatus,
      // ageGroup: translatedAgeGroup,
      // PYRAMID CHART DATA
      barChartData,
      // JITTERPLOT DATA
      jitterplotData,
      ...translation,
    },
  };
};

export default Home;
