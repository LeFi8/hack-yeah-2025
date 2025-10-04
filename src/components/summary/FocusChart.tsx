import Title from "../common/Title.tsx";
import { ResponsiveRadar } from "@nivo/radar";

// Focus areas data: each area is a separate data point
const data = [
  { area: "Health", focus: 61 },
  { area: "Hobby", focus: 90 },
  { area: "Work", focus: 80 },
  { area: "Relationships", focus: 70 },
];

function FocusChart() {
  return (
    <>
      <Title text="Focus Chart" />
      <ResponsiveRadar
        data={data}
        keys={["focus"]}
        indexBy="area"
        curve={"linearClosed"}
        margin={{ top: 0, right: 75, bottom: 40, left: 75 }}
        gridLabelOffset={10}
        blendMode="multiply"
        legends={[
          {
            anchor: 'top-left',
            direction: 'column',
            translateX: -20,
            translateY: -40,
            itemWidth: 0,
            itemHeight: 0,
            symbolShape: 'circle'
          }
        ]}
      />
    </>
  );
}

export default FocusChart;
