import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Card from "../components/Card";

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      {/* TITLE */}
      <h2 className="text-xl font-medium">{t("title")}</h2>
      {/* DESCRIPTION */}
      <p className="mb-4 text-lg font-light">{t("description")}</p>
      {/* GEO FILTERS */}
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="h-80 w-full md:w-1/3">
          <Card>Geo filters</Card>
        </div>
        <div className="h-80 w-full md:w-2/3">
          <Card>Map</Card>
        </div>
      </div>
      {/* AREA SNAPSHOT */}
      <h3 className="section-title">{t("section1_title")}</h3>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="h-80 w-full md:w-1/3">
          <Card>Pyramid bar chart</Card>
        </div>
        <div className="grid h-[640px] w-full grid-cols-2 grid-rows-3 gap-4 rounded-lg md:h-80 md:w-2/3 md:grid-cols-3 md:grid-rows-2">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Card key={index}>Metric {index + 1}</Card>
            ))}
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
