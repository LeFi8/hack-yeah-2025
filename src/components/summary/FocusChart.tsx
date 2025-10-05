import type { FocusStats } from "../../game/utils/focus-tracker.ts";
import Title from "../common/Title.tsx";
import { ResponsiveRadar } from "@nivo/radar";

interface FocusChartProps {
  focus: FocusStats;
}

function FocusChart({ focus }: FocusChartProps) {
  const focusData = [
    { area: "Health", focus: Math.floor(focus.health * 100) },
    { area: "Hobby", focus: Math.floor(focus.hobby * 100) },
    { area: "Work", focus: Math.floor(focus.work * 100) },
    { area: "Relationships", focus: Math.floor(focus.relation * 100) },
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
