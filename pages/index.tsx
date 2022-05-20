import dynamic from "next/dynamic";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// TODO: remove after getting actual mapping from backend
import mappingJson from "../data/json/mapping.json";

import Card from "../components/Card";
import Container from "../components/Container";
import Introduction from "../components/Introduction";

const Home: NextPage = ({
  state_key,
  state,
  areaType,
  area,
  mapping,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  return (
    <>
      <Introduction
        state_key={state_key}
        state={state}
        areaType={areaType}
        area={area}
        mapping={mapping}
      />
      {/* AREA SNAPSHOT */}
      <Container
        backgroundColor="bg-gray-100"
        className="flex flex-col px-3 py-14 lg:px-0"
      >
        <h3 className="section-title">{t("section1_title")}</h3>
        <div className="mb-16 flex w-full flex-col gap-4 md:flex-row">
          <div className="w-full md:w-2/5"></div>
          <div className="grid w-full grid-cols-2 grid-rows-3 gap-4 rounded-lg md:w-3/5 md:grid-cols-2 md:grid-rows-3"></div>
        </div>
        {/* JITTERPLOT */}
        <h3 className="section-title">{t("section2_title")}</h3>
        <Card>
          <div className="flex h-full w-full flex-col gap-2"></div>
        </Card>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const geoFilterSelection = {
    state_key: "",
    state: "",
    areaType: "",
    area: "",
  };

  const mappingData = mappingJson;

  return {
    props: {
      state_key: geoFilterSelection.state_key,
      state: geoFilterSelection.state,
      areaType: geoFilterSelection.areaType,
      area: geoFilterSelection.area,
      mapping: mappingData,
      ...(locale && (await serverSideTranslations(locale, ["common"]))),
    },
  };
};

export default Home;
