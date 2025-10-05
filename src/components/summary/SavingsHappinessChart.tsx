import Title from "../common/Title.tsx";
import { ResponsiveLine } from "@nivo/line";
import type { History } from "../../game/utils/history.ts";

interface SavingsHappinessChartProps {
  lifeHistory: History[];
}

function SavingsHappinessChart({ lifeHistory }: SavingsHappinessChartProps) {
  const transformedData = () => {
    const ageGroups = lifeHistory.reduce(
      (acc, history) => {
        const age = history.age;
        if (!acc[age] || history.month > acc[age].month) {
          acc[age] = history;
        }
        return acc;
      },
      {} as Record<number, History>,
    );

    const ages = Object.keys(ageGroups).sort((a, b) => Number(a) - Number(b));

    const savingsData = ages.map((age) => ({
      x: age,
      y: ageGroups[Number(age)].characterCondition.balance,
    }));

    // FIXME: happiness data should be normalized with balance data
    const happinessData = ages.map((age) => ({
      x: age,
      y: ageGroups[Number(age)].characterCondition.happiness.get(),
    }));

    return [
      {
        id: "savings",
        data: savingsData,
      },
      {
        id: "happiness",
        data: happinessData,
      },
    ];
  };

  const data = transformedData();

  // FIXME: add legend properties
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
