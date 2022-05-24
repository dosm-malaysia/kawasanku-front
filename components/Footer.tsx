import { useTranslation } from "next-i18next";
import Image from "next/image";
import Container from "./Container";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Container
      backgroundColor="bg-accent"
      className="flex items-center justify-between py-6 px-3 text-white lg:py-10 lg:px-0"
    >
      <div className="flex items-start justify-start gap-4">
        <div className="flex w-12 items-center justify-center">
          <Image src="/static/jata_logo.png" width={128} height={96} />
        </div>
        <div>
          <div className="text-xl font-semibold uppercase">
            <p>{t("dosm")}</p>
            <p>{t("pmo")}</p>
          </div>
          <br />
          <p>{t("copyrights")}</p>
          <p>
            {t("open_data")}:{" "}
            <a
              href="https://github.com/dosm-malaysia/kawasanku"
              target="_blank"
            >
              <span className="underline">kawasanku</span>
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
