import State from "../components/sandbox/State.tsx";
import Character from "../components/sandbox/Character.tsx";
import Decisions from "../components/sandbox/Decisions.tsx";
import LifeChart from "../components/sandbox/LifeChart.tsx";

function SandboxMode() {
  return (
    <>
      <div className="h-dvh">
        <div className="flex gap-5 p-4 h-full">
          <div className="flex-4 flex flex-col gap-5">
            <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-1">
              <LifeChart />
            </div>
            <div className="flex flex-4 gap-5">
              <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-3">
                <Character />
              </div>
              <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-7">
                <Decisions />
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-1">
            <State />
          </div>
        </div>
      </div>
    </>
  );
}

export default SandboxMode;
