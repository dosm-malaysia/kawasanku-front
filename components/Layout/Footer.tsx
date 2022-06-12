import Image from "next/image";
import { useTranslation } from "next-i18next";

import Container from "../Container";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Container
      backgroundColor="bg-accent"
      className="flex items-center justify-between py-6 text-white lg:py-10"
    >
      <div className="flex items-start justify-start gap-4">
        <div className="flex w-12 items-center justify-center">
          <Image src="/static/jata_logo.png" width={128} height={96} />
        </div>
        <div>
          <div className="text-sm font-semibold uppercase md:text-lg">
            <p>{t("dosm")}</p>
            <p>{t("pmo")}</p>
          </div>
          <br />
          <p className="text-xs md:text-base">{t("copyrights")}</p>
          <p className="text-xs md:text-base">
            {t("open_source")}:{" "}
            <a
              href="https://github.com/dosm-malaysia/kawasanku"
              target="_blank"
            >
              <span className="underline">KAWASANKU</span>
            </a>
          </p>
          <p className="text-xs md:text-base">
            {t("open_data")}:{" "}
            <a
              href="https://github.com/dosm-malaysia/data-open"
              target="_blank"
            >
              <span className="underline">DOSM GitHub</span>
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
