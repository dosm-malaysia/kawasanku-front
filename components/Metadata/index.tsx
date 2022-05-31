import NextHead from "next/head";
import { FunctionComponent } from "react";
import { useTranslation } from "next-i18next";

interface MetadataProps {
  title: string;
  keywords?: string;
}

const Metadata: FunctionComponent<MetadataProps> = ({ title, keywords }) => {
  const { t } = useTranslation();

  const META = {
    title: title,
    icon: "favicon.ico",
    description: t("header"),
    author: "Department of Statistics Malaysia",
    themeColor: "#13293D",
    keywords:
      keywords ??
      "kawasanku kawasan dosm dataset population statistics malaysia",
    domain: "kawasanku.dosm.gov.my",
    url: "https://kawasanku.dosm.gov.my",
    image: "https://kawasanku.dosm.gov.my/static/jata_512.png",
  };

  return (
    <NextHead>
      <title>{META.title}</title>
      <link rel="shortcut icon" href={META.icon} type="image/x-icon" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={META.description} />
      <meta name="author" content={META.author} />
      <meta name="theme-color" content={META.themeColor} />

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content={META.url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={META.title} />
      <meta property="og:description" content={META.description} />
      <meta property="og:image" content={META.image} />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={META.domain} />
      <meta property="twitter:url" content={META.url} />
      <meta name="twitter:title" content={META.title} />
      <meta name="twitter:description" content={META.description} />
      <meta name="twitter:image" content={META.image} />
    </NextHead>
  );
};

export default Metadata;
