import SavingsHappinessChart from "../components/summary/SavingsHappinessChart.tsx";
import FocusChart from "../components/summary/FocusChart.tsx";
import Title from "../components/common/Title.tsx";
import InfoTile from "../components/summary/InfoTile.tsx";

function Summary() {
  return (
    <>
      <div className="flex flex-col gap-5 p-4 h-dvh">
        <div className="flex flex-row gap-5 flex-1">
          <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-4">
            <SavingsHappinessChart />
          </div>
          <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-1">
            <FocusChart />
          </div>
        </div>
        <div className="flex flex-row gap-5 flex-2">
          <div className="flex flex-col gap-5 flex-2">
            <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-1">
              <InfoTile title="Pension" value="5,000 PLN" />
            </div>
            <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-6">
              TODO: Items
            </div>
          </div>
          <div className="flex flex-col flex-4 gap-5">
            <div className="flex flex-row gap-5">
              <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-1">
                <InfoTile title="ZUS Account" value="100,000 PLN" />
              </div>
              <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-1">
                <InfoTile title="Replacement Rate" value="75%" />
              </div>
            </div>
            <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-1">
              TODO: Choices
            </div>
          </div>
          <div className="border-2 rounded-2xl bg-white shadow-md flex-3 p-5">
            <Title text="Your Life" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Summary;
