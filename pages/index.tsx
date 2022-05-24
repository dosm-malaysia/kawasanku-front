import React, { useState } from "react";
import dynamic from "next/dynamic";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// TODO: remove after getting actual mapping from backend
import mappingJson from "../data/json/mapping.json";

import Card from "../components/Card";
import Container from "../components/Container";
import Introduction from "../components/Introduction";
import Indicators from "../components/Charts/JitterPlots/Indicators";
import PercentileOverlay from "../components/Charts/JitterPlots/PercentileOverlay";
import Spotlight from "../components/Spotlight";
import { Option } from "../components/Dropdowns/interface";

const BarChart = dynamic(() => import("../components/Charts/BarChart"), {
  ssr: false,
});
const DoughnutChart = dynamic(
  () => import("../components/Charts/DoughnutCharts"),
  { ssr: false }
);
const JitterPlot = dynamic(() => import("../components/Charts/JitterPlots"), {
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
          <div className="w-full md:w-2/5">
            <Card>
              <BarChart data={barChartData} />
            </Card>
          </div>
          {/* DOUGHNUT CHARTS */}
          <div className="grid w-full grid-cols-1 gap-4 rounded-lg sm:grid-cols-2 sm:grid-rows-3 md:w-3/5">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <DoughnutChart key={index} data={doughnutChartData} />
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
        <Card className="relative">
          {/* SPOTLIGHT */}
          <Spotlight
            // TODO: set current location based on location returned from backend
            currentLocation={{ label: "Ipoh", value: "Ipoh" }}
            jitterComparisons={jitterComparisons}
            setJitterComparisons={setJitterComparisons}
          />
          {/* MEDIAN INDICATORS */}
          <Indicators />
          <div className="relative h-full w-full">
            {/* JITTERPLOT CHARTS */}
            <div className="relative flex h-full w-full flex-col gap-2">
              {/* PERCENTILE OVERLAY */}
              <PercentileOverlay />
              {Array(20)
                .fill(0)
                .map((_, index) => (
                  <React.Fragment key={index}>
                    {index % 5 === 0 && (
                      <p
                        className={`z-10 w-fit bg-white font-semibold text-accent ${
                          index > 0 ? "pt-2" : ""
                        }`}
                      >
                        Metric Section {index + 1}
                      </p>
                    )}
                    {/* JITTERPLOT CHART */}
                    <JitterPlot
                      key={index}
                      label={t(`jitterplot.metric_${index + 1}`)}
                      data={jitterplotData}
                    />
                  </React.Fragment>
                ))}
            </div>
          </div>
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

  const jitterplotData = Array(100)
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

  const _jitterplotData = [
    {
      id: "group A",
      data: [
        {
          x: 86,
          y: 15,
        },
        {
          x: 96,
          y: 104,
        },
        {
          x: 59,
          y: 41,
        },
        {
          x: 49,
          y: 90,
        },
        {
          x: 69,
          y: 107,
        },
        {
          x: 48,
          y: 10,
        },
        {
          x: 0,
          y: 115,
        },
        {
          x: 49,
          y: 68,
        },
        {
          x: 0,
          y: 28,
        },
        {
          x: 35,
          y: 30,
        },
        {
          x: 82,
          y: 51,
        },
        {
          x: 50,
          y: 95,
        },
        {
          x: 35,
          y: 36,
        },
        {
          x: 94,
          y: 71,
        },
        {
          x: 0,
          y: 43,
        },
        {
          x: 75,
          y: 99,
        },
        {
          x: 3,
          y: 75,
        },
        {
          x: 26,
          y: 14,
        },
        {
          x: 28,
          y: 50,
        },
        {
          x: 14,
          y: 114,
        },
        {
          x: 45,
          y: 17,
        },
        {
          x: 2,
          y: 54,
        },
        {
          x: 17,
          y: 17,
        },
        {
          x: 88,
          y: 103,
        },
        {
          x: 6,
          y: 106,
        },
        {
          x: 82,
          y: 45,
        },
        {
          x: 81,
          y: 44,
        },
        {
          x: 94,
          y: 15,
        },
        {
          x: 62,
          y: 41,
        },
        {
          x: 33,
          y: 22,
        },
        {
          x: 71,
          y: 50,
        },
        {
          x: 92,
          y: 84,
        },
        {
          x: 18,
          y: 67,
        },
        {
          x: 46,
          y: 52,
        },
        {
          x: 85,
          y: 2,
        },
        {
          x: 11,
          y: 58,
        },
        {
          x: 66,
          y: 25,
        },
        {
          x: 7,
          y: 47,
        },
        {
          x: 50,
          y: 73,
        },
        {
          x: 34,
          y: 50,
        },
        {
          x: 51,
          y: 75,
        },
        {
          x: 60,
          y: 18,
        },
        {
          x: 8,
          y: 70,
        },
        {
          x: 42,
          y: 86,
        },
        {
          x: 23,
          y: 50,
        },
        {
          x: 18,
          y: 116,
        },
        {
          x: 72,
          y: 115,
        },
        {
          x: 47,
          y: 26,
        },
        {
          x: 89,
          y: 4,
        },
        {
          x: 0,
          y: 17,
        },
      ],
    },
    {
      id: "group B",
      data: [
        {
          x: 36,
          y: 29,
        },
        {
          x: 31,
          y: 30,
        },
        {
          x: 11,
          y: 76,
        },
        {
          x: 64,
          y: 118,
        },
        {
          x: 61,
          y: 42,
        },
        {
          x: 43,
          y: 95,
        },
        {
          x: 91,
          y: 83,
        },
        {
          x: 30,
          y: 22,
        },
        {
          x: 47,
          y: 30,
        },
        {
          x: 87,
          y: 19,
        },
        {
          x: 4,
          y: 32,
        },
        {
          x: 74,
          y: 58,
        },
        {
          x: 20,
          y: 47,
        },
        {
          x: 13,
          y: 78,
        },
        {
          x: 86,
          y: 28,
        },
        {
          x: 19,
          y: 54,
        },
        {
          x: 98,
          y: 37,
        },
        {
          x: 19,
          y: 21,
        },
        {
          x: 87,
          y: 95,
        },
        {
          x: 58,
          y: 11,
        },
        {
          x: 0,
          y: 6,
        },
        {
          x: 13,
          y: 64,
        },
        {
          x: 36,
          y: 52,
        },
        {
          x: 98,
          y: 21,
        },
        {
          x: 24,
          y: 6,
        },
        {
          x: 52,
          y: 80,
        },
        {
          x: 81,
          y: 81,
        },
        {
          x: 21,
          y: 78,
        },
        {
          x: 32,
          y: 20,
        },
        {
          x: 39,
          y: 95,
        },
        {
          x: 96,
          y: 19,
        },
        {
          x: 35,
          y: 120,
        },
        {
          x: 71,
          y: 23,
        },
        {
          x: 93,
          y: 29,
        },
        {
          x: 76,
          y: 23,
        },
        {
          x: 21,
          y: 2,
        },
        {
          x: 12,
          y: 4,
        },
        {
          x: 18,
          y: 95,
        },
        {
          x: 32,
          y: 36,
        },
        {
          x: 79,
          y: 7,
        },
        {
          x: 73,
          y: 17,
        },
        {
          x: 51,
          y: 59,
        },
        {
          x: 22,
          y: 14,
        },
        {
          x: 34,
          y: 93,
        },
        {
          x: 43,
          y: 8,
        },
        {
          x: 97,
          y: 33,
        },
        {
          x: 7,
          y: 31,
        },
        {
          x: 64,
          y: 23,
        },
        {
          x: 82,
          y: 71,
        },
        {
          x: 63,
          y: 61,
        },
      ],
    },
    {
      id: "group C",
      data: [
        {
          x: 94,
          y: 47,
        },
        {
          x: 89,
          y: 49,
        },
        {
          x: 83,
          y: 44,
        },
        {
          x: 82,
          y: 103,
        },
        {
          x: 41,
          y: 75,
        },
        {
          x: 38,
          y: 41,
        },
        {
          x: 91,
          y: 46,
        },
        {
          x: 53,
          y: 67,
        },
        {
          x: 25,
          y: 7,
        },
        {
          x: 89,
          y: 119,
        },
        {
          x: 39,
          y: 79,
        },
        {
          x: 19,
          y: 12,
        },
        {
          x: 85,
          y: 12,
        },
        {
          x: 86,
          y: 108,
        },
        {
          x: 4,
          y: 11,
        },
        {
          x: 8,
          y: 20,
        },
        {
          x: 27,
          y: 102,
        },
        {
          x: 10,
          y: 69,
        },
        {
          x: 80,
          y: 119,
        },
        {
          x: 91,
          y: 50,
        },
        {
          x: 0,
          y: 42,
        },
        {
          x: 100,
          y: 59,
        },
        {
          x: 53,
          y: 116,
        },
        {
          x: 38,
          y: 117,
        },
        {
          x: 22,
          y: 87,
        },
        {
          x: 6,
          y: 53,
        },
        {
          x: 12,
          y: 76,
        },
        {
          x: 27,
          y: 57,
        },
        {
          x: 4,
          y: 119,
        },
        {
          x: 43,
          y: 65,
        },
        {
          x: 9,
          y: 15,
        },
        {
          x: 75,
          y: 69,
        },
        {
          x: 40,
          y: 106,
        },
        {
          x: 78,
          y: 30,
        },
        {
          x: 48,
          y: 66,
        },
        {
          x: 45,
          y: 37,
        },
        {
          x: 46,
          y: 40,
        },
        {
          x: 13,
          y: 120,
        },
        {
          x: 59,
          y: 17,
        },
        {
          x: 92,
          y: 107,
        },
        {
          x: 69,
          y: 38,
        },
        {
          x: 62,
          y: 44,
        },
        {
          x: 70,
          y: 19,
        },
        {
          x: 62,
          y: 89,
        },
        {
          x: 78,
          y: 53,
        },
        {
          x: 73,
          y: 17,
        },
        {
          x: 51,
          y: 52,
        },
        {
          x: 47,
          y: 87,
        },
        {
          x: 89,
          y: 15,
        },
        {
          x: 36,
          y: 37,
        },
      ],
    },
    {
      id: "group D",
      data: [
        {
          x: 100,
          y: 10,
        },
        {
          x: 71,
          y: 75,
        },
        {
          x: 31,
          y: 97,
        },
        {
          x: 4,
          y: 114,
        },
        {
          x: 70,
          y: 102,
        },
        {
          x: 33,
          y: 17,
        },
        {
          x: 42,
          y: 70,
        },
        {
          x: 67,
          y: 20,
        },
        {
          x: 59,
          y: 59,
        },
        {
          x: 0,
          y: 115,
        },
        {
          x: 50,
          y: 74,
        },
        {
          x: 5,
          y: 85,
        },
        {
          x: 90,
          y: 52,
        },
        {
          x: 98,
          y: 67,
        },
        {
          x: 34,
          y: 43,
        },
        {
          x: 55,
          y: 69,
        },
        {
          x: 72,
          y: 85,
        },
        {
          x: 71,
          y: 9,
        },
        {
          x: 55,
          y: 81,
        },
        {
          x: 54,
          y: 15,
        },
        {
          x: 48,
          y: 119,
        },
        {
          x: 65,
          y: 111,
        },
        {
          x: 36,
          y: 17,
        },
        {
          x: 97,
          y: 21,
        },
        {
          x: 18,
          y: 6,
        },
        {
          x: 88,
          y: 53,
        },
        {
          x: 38,
          y: 3,
        },
        {
          x: 13,
          y: 34,
        },
        {
          x: 80,
          y: 114,
        },
        {
          x: 60,
          y: 117,
        },
        {
          x: 23,
          y: 96,
        },
        {
          x: 61,
          y: 96,
        },
        {
          x: 25,
          y: 18,
        },
        {
          x: 80,
          y: 39,
        },
        {
          x: 28,
          y: 44,
        },
        {
          x: 41,
          y: 16,
        },
        {
          x: 24,
          y: 44,
        },
        {
          x: 7,
          y: 51,
        },
        {
          x: 71,
          y: 2,
        },
        {
          x: 78,
          y: 45,
        },
        {
          x: 70,
          y: 103,
        },
        {
          x: 2,
          y: 82,
        },
        {
          x: 97,
          y: 115,
        },
        {
          x: 65,
          y: 0,
        },
        {
          x: 38,
          y: 71,
        },
        {
          x: 42,
          y: 96,
        },
        {
          x: 79,
          y: 24,
        },
        {
          x: 50,
          y: 109,
        },
        {
          x: 51,
          y: 111,
        },
        {
          x: 4,
          y: 100,
        },
      ],
    },
    {
      id: "group E",
      data: [
        {
          x: 20,
          y: 52,
        },
        {
          x: 47,
          y: 57,
        },
        {
          x: 4,
          y: 116,
        },
        {
          x: 71,
          y: 33,
        },
        {
          x: 84,
          y: 25,
        },
        {
          x: 84,
          y: 6,
        },
        {
          x: 61,
          y: 53,
        },
        {
          x: 32,
          y: 28,
        },
        {
          x: 83,
          y: 108,
        },
        {
          x: 62,
          y: 94,
        },
        {
          x: 38,
          y: 119,
        },
        {
          x: 86,
          y: 21,
        },
        {
          x: 36,
          y: 73,
        },
        {
          x: 18,
          y: 11,
        },
        {
          x: 38,
          y: 60,
        },
        {
          x: 99,
          y: 99,
        },
        {
          x: 7,
          y: 117,
        },
        {
          x: 42,
          y: 100,
        },
        {
          x: 48,
          y: 68,
        },
        {
          x: 20,
          y: 43,
        },
        {
          x: 6,
          y: 19,
        },
        {
          x: 0,
          y: 91,
        },
        {
          x: 39,
          y: 116,
        },
        {
          x: 26,
          y: 23,
        },
        {
          x: 61,
          y: 35,
        },
        {
          x: 15,
          y: 13,
        },
        {
          x: 87,
          y: 101,
        },
        {
          x: 35,
          y: 48,
        },
        {
          x: 61,
          y: 73,
        },
        {
          x: 10,
          y: 108,
        },
        {
          x: 71,
          y: 40,
        },
        {
          x: 43,
          y: 95,
        },
        {
          x: 69,
          y: 10,
        },
        {
          x: 12,
          y: 35,
        },
        {
          x: 60,
          y: 30,
        },
        {
          x: 75,
          y: 77,
        },
        {
          x: 66,
          y: 60,
        },
        {
          x: 8,
          y: 67,
        },
        {
          x: 50,
          y: 85,
        },
        {
          x: 43,
          y: 63,
        },
        {
          x: 81,
          y: 87,
        },
        {
          x: 14,
          y: 35,
        },
        {
          x: 44,
          y: 95,
        },
        {
          x: 27,
          y: 96,
        },
        {
          x: 0,
          y: 12,
        },
        {
          x: 44,
          y: 99,
        },
        {
          x: 43,
          y: 74,
        },
        {
          x: 74,
          y: 24,
        },
        {
          x: 47,
          y: 118,
        },
        {
          x: 98,
          y: 13,
        },
      ],
    },
  ];

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
