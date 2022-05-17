import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full items-center justify-center">
      <div className="max-w-screen-lg pt-10">
        <h2 className="mb-4 text-xl font-medium">{t("title")}</h2>
        <p className="text-lg font-light">{t("description")}</p>
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
