import { FunctionComponent } from "react";
import { useTranslation } from "next-i18next";

import DoughnutChart from ".";

import { IDoughnutCharts } from "../../../lib/interfaces";

interface DoughnutChartsProps extends IDoughnutCharts {}

const DoughnutCharts: FunctionComponent<DoughnutChartsProps> = ({
  sex,
  ethnicity,
  nationality,
  religion,
  marital,
  housing,
  labour,
  agegroup,
}) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-lg border md:grid-cols-3 md:grid-rows-2">
      <DoughnutChart title={t("doughnut.metric_1")} data={sex} />
      <DoughnutChart title={t("doughnut.metric_2")} data={ethnicity} />
      <DoughnutChart title={t("doughnut.metric_3")} data={nationality} />
      {religion && (
        <DoughnutChart title={t("doughnut.metric_4")} data={religion} />
      )}
      {marital && (
        <DoughnutChart title={t("doughnut.metric_5")} data={marital} />
      )}
      {housing && (
        <DoughnutChart title={t("doughnut.metric_7")} data={housing} />
      )}
      {labour && <DoughnutChart title={t("doughnut.metric_8")} data={labour} />}
      <DoughnutChart title={t("doughnut.metric_6")} data={agegroup} />
    </div>
  );
};

export default DoughnutCharts;
