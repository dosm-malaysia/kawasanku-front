import dynamic from "next/dynamic";
import Portal from "../../../../components/Portal";

const DoughnutChart = dynamic(
  () => import("../../../../components/Charts/DoughnutCharts"),
  { ssr: false }
);

const EmbedSnapshotState = () => {
  return (
    <Portal>
      <div>
        <DoughnutChart
          data={Array(4)
            .fill(0)
            .map((_, i) => ({
              id: "Item" + i + 1,
              value: i * 10,
            }))}
        />
      </div>
    </Portal>
  );
};

export default EmbedSnapshotState;
