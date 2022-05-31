import "../styles/globals.css";

import Script from "next/script";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import { pageview } from "../lib/helpers";

import Layout from "../components/Layout";

function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // trigger pageview analytics for SPA-level navigation
  const handleRouteChange = (url: string) => {
    pageview(url);
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-DQMEKPCKD5"
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TAG}', {
                  page_path: window.location.pathname
              });
          `,
        }}
      />
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </>
  );
}

export default appWithTranslation(App);
