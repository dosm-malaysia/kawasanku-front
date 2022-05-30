import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { appWithTranslation } from "next-i18next";
import Script from "next/script";
import Layout from "../components/Layout";
import EmbedLayout from "../components/EmbedLayout";
import { pageview } from "../lib/helpers";

function App({ Component, pageProps, router }: AppProps) {
  const { pathname } = router;
  const isEmbed = pathname.includes("embed");

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // Triggers pageview analytics for SPA-level navigation
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
      {isEmbed ? (
        <EmbedLayout>
          <Component {...pageProps} />
        </EmbedLayout>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}

export default appWithTranslation(App);
