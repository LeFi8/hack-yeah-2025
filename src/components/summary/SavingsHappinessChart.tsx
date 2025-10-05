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

    const savingsData = ages.map((age) => {
      const originalBalance = ageGroups[Number(age)].characterCondition.balance;
      return {
        x: age,
        y: Math.max(originalBalance, 0),
        originalValue: originalBalance,
      };
    });

    // Normalize happiness to the same scale as balance for better comparison
    const maxBalance = Math.max(
      ...ages.map((age) => ageGroups[Number(age)].characterCondition.balance),
      1,
    );
    const happinessData = ages.map((age) => {
      const originalHappiness =
        ageGroups[Number(age)].characterCondition.happiness.get();
      return {
        x: age,
        y: (originalHappiness / 100) * maxBalance,
        originalValue: originalHappiness,
      };
    });

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

  const customTooltip = ({ point }: { point: any }) => {
    const isHappiness = point.seriesId === "happiness";
    const value = point.data.originalValue;
    const formattedValue = isHappiness
      ? `${Math.round(value)}%`
      : `${Math.round(value)}PLN`;

    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-lg">
        <div className="text-sm font-medium">
          {isHappiness ? "Happiness" : "Savings"}
        </div>
        <div className="text-sm">Age: {point.data.x}</div>
        <div className="text-sm font-bold" style={{ color: point.seriesColor }}>
          {formattedValue}
        </div>
      </div>
    );
  };

  const data = transformedData();

  return (
    <>
      <Title text={"Savings & Happiness"} />
      <ResponsiveLine
        data={data}
        margin={{ top: 25, right: 10, bottom: 60, left: 10 }}
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
          legendOffset: 10,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "seriesColor" }}
        enableGridX={false}
        enableGridY={false}
        useMesh={true}
        tooltip={customTooltip}
        legends={[
          {
            anchor: "top-right",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: -25,
            itemWidth: 100,
            itemHeight: 20,
            itemsSpacing: 10,
            symbolSize: 12,
            symbolShape: "circle",
            itemDirection: "left-to-right",
          },
        ]}
      />
    </>
  );
}

export default SavingsHappinessChart;
