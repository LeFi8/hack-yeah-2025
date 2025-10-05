import Title from "../common/Title.tsx";
import { ResponsiveLine } from "@nivo/line";

// FIXME: mocked data
const data = [
  {
    id: "savings",
    data: [
      { x: "18", y: 3000 },
      { x: "19", y: 3800 },
      { x: "20", y: 3200 },
      { x: "21", y: 5000 },
    ],
  },
  {
    id: "happiness",
    data: [
      { x: "18", y: 5000 },
      { x: "19", y: 2500 },
      { x: "20", y: 4000 },
      { x: "21", y: 1000 },
    ],
  },
];

function SavingsHappinessChart() {
  return (
    <>
      <Title text={"Savings & Happiness"} />
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 10, bottom: 60, left: 10 }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        curve="natural"
        colors={{ scheme: "set2" }}
        enableArea={true}
        axisLeft={null}
        axisBottom={{
          legend: "Age",
          legendOffset: 20,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "seriesColor" }}
        enableGridX={false}
        enableGridY={false}
        useMesh={true}
      />
    </>
  );
}

export default SavingsHappinessChart;
