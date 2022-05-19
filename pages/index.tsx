import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Card from "../components/Card";
import Container from "../components/Container";
import Introduction from "../components/Introduction";

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
    <>
      <Introduction />
      <Container backgroundColor="bg-gray-100" className="px-3 py-14 lg:px-0">
        <div className="flex flex-col">
          {/* AREA SNAPSHOT */}
          <h3 className="section-title">{t("section1_title")}</h3>
          <div className="mb-16 flex w-full flex-col gap-4 md:flex-row">
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
          {/* JITTERPLOT */}
          <h3 className="section-title">{t("section2_title")}</h3>
          <div className="h-[750px] w-full">
            <Card>Jitterplot</Card>
          </div>
        </div>
      </Container>
    </>
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
