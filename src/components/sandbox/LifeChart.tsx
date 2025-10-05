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
      <div style={{ height: "90px" }}>
        <ResponsiveScatterPlot
          data={mockedData}
          margin={{ top: 20, right: 40, bottom: 20, left: 60 }}
          xScale={{ type: "linear", min: 18, max: 40 }}
          yScale={{
            type: "linear",
            min: 0,
            max: 3,
          }}
          layers={[
            ({ xScale, innerHeight }) => (
              <g>
                <rect
                  x={xScale(18)}
                  y={0}
                  width={xScale(35) - xScale(18)}
                  height={innerHeight}
                  fill="#e8f5e8"
                  opacity={1}
                />
                <rect
                  x={xScale(35)}
                  y={0}
                  width={xScale(55) - xScale(35)}
                  height={innerHeight}
                  fill="#fff0e6"
                  opacity={1}
                />
              </g>
            ),
            "grid",
            "axes",
            "nodes",
            "mesh",
          ]}
          axisBottom={{
            legend: "Age",
            legendOffset: 36,
            tickValues: [18, 25, 30, 35, 40, 45],
          }}
          axisLeft={{
            legend: "Events",
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
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          gap: "20px",
          marginTop: "10px",
          fontSize: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: "#e8f5e8",
              border: "1px solid #ccc",
            }}
          ></div>
          <span>Young Adulthood (18-35)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: "#fff0e6",
              border: "1px solid #ccc",
            }}
          ></div>
          <span>Late Adulthood (35+)</span>
        </div>
      </div>
    </>
  );
}

export default LifeChart;
