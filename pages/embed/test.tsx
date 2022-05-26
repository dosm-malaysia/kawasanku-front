import Frame from "react-frame-component";
import DoughnutChart from "../../components/Charts/DoughnutCharts";

const TestIframe = () => {
  return (
    <Frame>
      <DoughnutChart
        title="Test Embed Chart"
        data={Array(4)
          .fill(0)
          .map((_, i) => ({
            id: "Item" + i + 1,
            value: i * 10,
          }))}
      />
    </Frame>
  );
};

export default TestIframe;
