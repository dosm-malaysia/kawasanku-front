import { useTranslation } from "next-i18next";
import { FunctionComponent } from "react";

interface DateSignatureProps {
  date?: string;
  option?: Intl.DateTimeFormatOptions;
}

const DateSignature: FunctionComponent<DateSignatureProps> = ({
  date = "2022/12/1",
  option = {
    year: "numeric",
    month: "long",
    day: undefined,
  },
}) => {
  const { t, i18n } = useTranslation();
  const _date = new Intl.DateTimeFormat(i18n.language, option).format(
    new Date(Date.parse(date))
  );

  return <p className="census-text">{t("census_2020", { date: _date })}</p>;
};

export default DateSignature;
