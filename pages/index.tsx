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
  state_key,
  state,
  areaType,
  area,
  mapping,
  barChartData,
  doughnutChartData,
  jitterplotData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  const [jitterComparisons, setJitterComparisons] = useState<Option[]>([]);

  return (
    <>
      <Introduction
        state_key={state_key}
        state={state}
        areaType={areaType}
        area={area}
        mapping={mapping}
      />
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
            <Card className="border">
              <BarChart data={barChartData} />
            </Card>
          </div>
          {/* DOUGHNUT CHARTS */}
          <div className="grid w-full grid-cols-1 overflow-hidden rounded-lg border md:w-2/3 md:grid-cols-3 md:grid-rows-2">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <DoughnutChart
                  key={index}
                  title={`Metric ${index + 1}`}
                  data={doughnutChartData}
                />
              ))}
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
        <Card className="relative md:border">
          {/* SPOTLIGHT */}
          <Spotlight
            // TODO: set current location based on location returned from backend
            currentLocation={{ label: "Ipoh", value: "Ipoh" }}
            jitterComparisons={jitterComparisons}
            setJitterComparisons={setJitterComparisons}
          />
          {/* JITTERPLOTS */}
          {/* <JitterPlots data={jitterplotData} comparisons={jitterComparisons} /> */}
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

  const doughnutChartData = [
    {
      id: "go",
      label: "go",
      value: 574,
    },
    {
      id: "c",
      label: "c",
      value: 15,
    },
    {
      id: "erlang",
      label: "erlang",
      value: 407,
    },
    {
      id: "css",
      label: "css",
      value: 245,
    },
    {
      id: "hack",
      label: "hack",
      value: 129,
    },
  ];

  const jitterplotArr = Array(10)
    .fill(0)
    .map((_, index) => {
      return {
        id: `Area ${index}`,
        data: [
          {
            x: Math.random() * (Math.random() > 0.5 ? 1 : -1),
            y: Math.random(),
          },
        ],
      };
    });

  let jitterplotData: { [key: string]: any } = {};
  Array(27)
    .fill(0)
    .forEach((_, index) => {
      jitterplotData[`metric_${index + 1}`] = jitterplotArr;
    });

  const translation = await serverSideTranslations(locale!);
  const translationStore =
    translation._nextI18Next.initialI18nStore[locale!]["common"];

  let translatedDoughtnutChartData = doughnutChartData.map((d) => {
    return {
      ...d,
      label: translationStore["title"],
    };
  });

  return {
    props: {
      state_key: geoFilterSelection.state_key,
      state: geoFilterSelection.state,
      areaType: geoFilterSelection.areaType,
      area: geoFilterSelection.area,
      mapping: mappingData,
      barChartData,
      doughnutChartData: translatedDoughtnutChartData,
      jitterplotData,
      ...(locale && (await serverSideTranslations(locale, ["common"]))),
    },
  };
};

export default Home;
