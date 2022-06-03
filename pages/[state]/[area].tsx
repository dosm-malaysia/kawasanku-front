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
  getJitterplots,
  getAreaType,
  getAreaPaths,
} from "../../lib/api";
import { AREA_TYPES } from "../../lib/constants";
import { IDoughnutCharts } from "../../lib/interfaces";
import { translateDoughnutChart } from "../../lib/helpers";

import Card from "../../components/Card";
import Metadata from "../../components/Metadata";
import Container from "../../components/Container";
import Introduction from "../../components/Introduction";
import { Option } from "../../components/Dropdowns/interface";
import Spotlight from "../../components/Charts/Jitterplot/Spotlight";

const DoughnutCharts = dynamic(
  () => import("../../components/Charts/Doughnut/DoughnutCharts"),
  {
    ssr: false,
  }
);
const Jitterplots = dynamic(
  () => import("../../components/Charts/Jitterplot/Jitterplots"),
  {
    ssr: false,
  }
);

const Area: NextPage = ({
  stateKey,
  geojson,
  areaKey,
  areaType,
  areaName,
  doughnutChartData,
  jitterplotData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  const [jitterComparisons, setJitterComparisons] = useState<Option[]>([]);

  useEffect(() => {
    setJitterComparisons([]);
  }, [areaKey]);

  return (
    <>
      {/* METADATA */}
      <Metadata
        title={`${areaName} · ${t("title")}`}
        keywords={`${areaName} ${t(
          `states.${stateKey}`
        )} ${areaType} kawasanku statistics dosm`}
      />
      {/* INTRODUCTION */}
      <Introduction
        stateKey={stateKey}
        state={t(`states.${stateKey}`)}
        areaKey={areaKey}
        areaType={areaType}
        area={areaName}
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
            {t("section1_title1")} <span className="underline">{areaName}</span>{" "}
            {t("section1_title2")}
          </h3>
          <p className="census-text">{t("census_2020")}</p>
        </div>
        {/* DOUGHNUT CHARTS */}
        <div className="mb-10 w-full md:mb-15">
          <DoughnutCharts {...doughnutChartData} />
        </div>
        {/* JITTERPLOT TITLE */}
        <div className="jitterplot-title">
          <h3 className="section-title">
            {t("section2_title2_1")}{" "}
            <span className="underline">{areaName}</span>{" "}
            {t("section2_title2_2", {
              area_types: t(`area_types.${areaType}`),
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
            areaType={areaType}
            currentLocation={{ label: areaName, value: areaKey }}
            jitterComparisons={jitterComparisons}
            setJitterComparisons={setJitterComparisons}
          />
          {/* JITTERPLOTS */}
          <Jitterplots
            areaType={areaType}
            data={jitterplotData}
            comparisons={jitterComparisons}
            currentLocation={{ label: areaName, value: areaKey }}
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
  const zh: AreaPathsType = [];
  const ta: AreaPathsType = [];

  areaPaths.forEach(area => {
    // area returned as "/state/area"
    const areaArr = area.substring(1).split("/");

    en.push({ params: { state: areaArr[0], area: areaArr[1] } });
    ms.push({
      params: { state: areaArr[0], area: areaArr[1] },
      locale: "ms-MY",
    });
    ta.push({
      params: { state: areaArr[0], area: areaArr[1] },
      locale: "ta-IN",
    });
    zh.push({
      params: { state: areaArr[0], area: areaArr[1] },
      locale: "zh-CN",
    });
  });

  return { paths: [...en, ...ms, ...zh, ...ta], fallback: false };
};

interface IParams extends ParsedUrlQuery {
  state: string;
  area: string;
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { state, area } = params as IParams;

  const translationReq = serverSideTranslations(locale!, ["common"]);
  const geoReq = getGeojson(area);
  // TODO: use get doughnut data only since no pyramid chart is shown on this page
  const snapshotReq = getSnapshot({ area });
  const jitterplotsReq = getJitterplots({ area: area });
  const stateTypeReq = getAreaType(state);
  const areaTypeReq = getAreaType(area);

  const res = await Promise.all([
    translationReq,
    geoReq,
    snapshotReq,
    jitterplotsReq,
    stateTypeReq,
    areaTypeReq,
  ]);

  // CHECK IF STATE AND AREA PARAMS ARE VALID
  const isState = res[4].area_type === AREA_TYPES.State;
  const isArea =
    res[5].area_type === AREA_TYPES.District ||
    res[5].area_type === AREA_TYPES.Parliament ||
    res[5].area_type === AREA_TYPES.Dun;

  if (!isState || !isArea)
    return {
      notFound: true,
    };

  // TRANSLATION
  const translation = res[0];
  const translationStore =
    translation._nextI18Next.initialI18nStore[locale!]["common"];

  // GEOJSON
  const geojson = res[1];

  const areaType = res[5].area_type;
  const areaName = res[5].area_name;

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

  return {
    props: {
      stateKey: state,
      geojson,
      areaKey: area,
      areaType,
      areaName,
      // DOUGHNUT CHARTS DATA
      doughnutChartData: {
        sex: translatedSex,
        ethnicity: translatedEthnicity,
        nationality: translatedNationality,
        religion: translatedReligion,
        marital: translatedMaritalStatus,
        agegroup: translatedAgeGroup,
        housing: translatedHousing,
        labour: translatedLabour,
      },
      // PYRAMID CHART DATA
      barChartData: pyramidCharts,
      // JITTERPLOT DATA
      jitterplotData,
      ...translation,
    },
  };
};

export default Area;
