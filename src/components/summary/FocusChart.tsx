import Title from "../common/Title.tsx";
import { ResponsiveRadar } from "@nivo/radar";
import type { Focus } from "../../game/state.ts";

interface FocusChartProps {
  focus: Focus;
}

function FocusChart({ focus }: FocusChartProps) {
  const focusData = [
    { area: "Health", focus: focus.health },
    { area: "Hobby", focus: focus.hobby },
    { area: "Work", focus: focus.work },
    { area: "Relationships", focus: focus.relation },
  ];
  return (
    <>
      <Title text="Focus Chart" />
      <ResponsiveRadar
        data={focusData}
        keys={["focus"]}
        indexBy="area"
        curve={"linearClosed"}
        margin={{ top: 0, right: 75, bottom: 40, left: 75 }}
        gridLabelOffset={10}
        blendMode="multiply"
        legends={[
          {
            anchor: "top-left",
            direction: "column",
            translateX: -20,
            translateY: -40,
            itemWidth: 0,
            itemHeight: 0,
            symbolShape: "circle",
          },
        ]}
      />
    </>
  );
}

export default FocusChart;
