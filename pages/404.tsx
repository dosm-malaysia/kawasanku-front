import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Container from "../components/Container";

const FourOhFour = () => {
  return (
    <Container className="flex h-full min-h-screen flex-col items-center justify-center text-center text-accent">
      <h1 className="text-7xl font-bold">404</h1>
      <p className="text-lg font-semibold uppercase">Page not found</p>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale!, ["common"]))),
    },
  };
};

export default FourOhFour;
