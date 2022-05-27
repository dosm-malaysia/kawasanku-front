import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import Layout from "../components/Layout";
import EmbedLayout from "../components/EmbedLayout";
import AreaOptionsContextProvider from "../contexts/AreaOptionsContext";

function App({ Component, pageProps, router }: AppProps) {
  const { pathname } = router;
  const isEmbed = pathname.includes("embed");

  return (
    <>
      {isEmbed ? (
        <EmbedLayout>
          <Component {...pageProps} />
        </EmbedLayout>
      ) : (
        <Layout>
          <AreaOptionsContextProvider>
            <Component {...pageProps} />
          </AreaOptionsContextProvider>
        </Layout>
      )}
    </>
  );
}

export default appWithTranslation(App);
