import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import Layout from "../components/Layout";
import LocationContextProvider from "../contexts/GeoFiltersContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <LocationContextProvider>
        <Component {...pageProps} />
      </LocationContextProvider>
    </Layout>
  );
}

export default appWithTranslation(App);
