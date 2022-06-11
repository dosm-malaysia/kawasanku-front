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
const DoughnutCharts = dynamic(
  () => import("../components/Charts/Doughnut/DoughnutCharts"),
  {
    ssr: false,
  }
);
const Jitterplots = dynamic(
  () => import("../components/Charts/Jitterplot/Jitterplots"),
  {
    ssr: false,
  }
);

const Home: NextPage = ({
  geojson,
  barChartData,
  doughnutChartData,
  jitterplotData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  const [jitterComparisons, setJitterComparisons] = useState<Option[]>([]);

  return (
    <>
      {/* METADATA */}
      <Metadata title={t("title")} />
      {/* INTRODUCTION */}
      <Introduction geojson={geojson} />
      {/* SNAPSHOT */}
      <Container
        backgroundColor="snapshot-container-background"
        className="snapshot-container"
      >
        {/* BAR CHART TITLE */}
        <div className="section-title-layout">
          <h3 className="section-title">
            {t("section1_title1")}{" "}
            <span className="capitalize underline">{t("malaysia")}</span>{" "}
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
            <DoughnutCharts {...doughnutChartData} />
          </div>
        </div>
        {/* JITTERPLOT TITLE */}
        <div className="section-title-layout">
          <h3 className="section-title">{t("section2_title1")}</h3>
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
            jitterComparisons={jitterComparisons}
            setJitterComparisons={setJitterComparisons}
          />
          {/* JITTERPLOTS */}
          <Jitterplots
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

  const geoReq = getGeojson({ area: MALAYSIA });
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
      // DOUGHNUT CHARTS DATA
      doughnutChartData: {
        sex: translatedSex,
        ethnicity: translatedEthnicity,
        nationality: translatedNationality,
        religion: translatedReligion,
        marital: translatedMaritalStatus,
        agegroup: translatedAgeGroup,
      },
      // PYRAMID CHART DATA
      barChartData: pyramidCharts,
      // JITTERPLOT DATA
      jitterplotData,
      ...translation,
    },
  };
};

export default Home;
