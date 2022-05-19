import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Card from "../components/Card";
import GeoFilters from "../components/GeoFilters";

// Pie charts
import SexPieChart from "../components/Charts/PieCharts/Sex";
import EthnicityPieChart from "../components/Charts/PieCharts/Ethnicity";
import ReligionPieChart from "../components/Charts/PieCharts/Religion";
import DevelopmentPieChart from "../components/Charts/PieCharts/Development";
import MaritalPieChart from "../components/Charts/PieCharts/Marital";
import AgePieChart from "../components/Charts/PieCharts/Age";

const Home: NextPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      {/* TITLE */}
      <h2 className="text-xl font-medium">{t("title")}</h2>
      {/* DESCRIPTION */}
      <p className="mb-4 text-lg font-light">{t("description")}</p>
      {/* GEO FILTERS */}
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="w-full md:w-2/5">
          <GeoFilters />
        </div>
        <div className="w-full md:w-3/5">
          <Card>Map</Card>
        </div>
      </div>
      {/* AREA SNAPSHOT */}
      <h3 className="section-title">{t("section1_title")}</h3>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="w-full md:w-2/5">
          <Card>Pyramid bar chart</Card>
        </div>
        <div className="grid w-full grid-cols-2 grid-rows-3 gap-4 rounded-lg md:w-3/5 md:grid-cols-3 md:grid-rows-2">
          <SexPieChart />
          <EthnicityPieChart />
          <ReligionPieChart />
          <DevelopmentPieChart />
          <MaritalPieChart />
          <AgePieChart />
        </div>
      </div>
      <h3 className="section-title">{t("section2_title")}</h3>
      <div className="h-[750px] w-full">
        <Card>Jitterplot</Card>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ["common"]))),
    },
  };
};

export default Home;
