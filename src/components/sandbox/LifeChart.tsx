import Title from "../common/Title.tsx";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";

const mockedData = [
  {
    id: "Events",
    data: [
      { x: 22, y: 1, label: "Graduated" },
      { x: 25, y: 2, label: "World War III" },
      { x: 28, y: 1, label: "Got Married" },
      { x: 33, y: 2, label: "Bought First House" },
    ],
  },
];

function LifeChart() {
  console.log(mockedData);
  return (
    <>
      <Title text={"Life progress"} />
      <div style={{ height: "120px" }}>
        <ResponsiveScatterPlot
          data={mockedData}
          margin={{ top: 20, right: 40, bottom: 50, left: 60 }}
          xScale={{ type: "linear", min: 18, max: 45 }}
          yScale={{
            type: "linear",
            min: 0,
            max: 3,
          }}
          axisBottom={{
            legend: "Age",
            legendOffset: 36,
            tickValues: [18, 25, 30, 35, 40, 45],
          }}
          axisLeft={{
            legend: "Important Events",
            legendOffset: -40,
            tickValues: [],
          }}
          enableGridX={true}
          enableGridY={false}
          nodeSize={8}
          useMesh={false}
          nodeComponent={({ node }) => (
            <g>
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size / 2}
                strokeWidth={2}
              />
              <text
                x={node.x + 15}
                y={node.y + 4}
                fontSize="12"
                textAnchor="start"
              >
                {node.data.label}
              </text>
            </g>
          )}
        />
      </div>
    </>
  );
}

export default LifeChart;
