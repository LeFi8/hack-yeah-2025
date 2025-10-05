import SavingsHappinessChart from "../components/summary/SavingsHappinessChart.tsx";
import FocusChart from "../components/summary/FocusChart.tsx";
import InfoTile from "../components/summary/InfoTile.tsx";
import LifeSummary from "../components/summary/LifeSummary.tsx";
import { Game } from "../game/game.ts";

interface SummaryProps {
  game: Game;
}

function Summary({ game }: SummaryProps) {
  return (
    <>
      <div className="h-dvh">
        <div className="flex flex-col gap-5 p-4 h-full">
          <div className="flex flex-row gap-5 flex-1">
            <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-4">
              <SavingsHappinessChart />
            </div>
            <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-1">
              <FocusChart focus={game.getState().focus} />
            </div>
          </div>
          <div className="flex flex-row gap-5 flex-2">
            <div className="flex flex-col gap-5 flex-1">
              <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-1">
                <InfoTile
                  title="Pension"
                  value={game.getState().zus.getEstimatedPension().toFixed(2)}
                />
              </div>
              <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-6">
                TODO: Items
              </div>
            </div>
            <div className="flex flex-col flex-4 gap-5">
              <div className="flex flex-row gap-5">
                <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-1">
                  <InfoTile
                    title="ZUS Account"
                    value={game.getState().zus.alreadyAccummulated.toFixed(2)}
                  />
                </div>
                <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-1">
                  <InfoTile
                    title="Replacement Rate"
                    value={game.getState().zus.getReplacementRatePercentage()}
                  />
                </div>
              </div>
              <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-1">
                TODO: Choices
              </div>
            </div>
            <div className="border-2 rounded-2xl bg-white shadow-md flex-3 p-5">
              <LifeSummary />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Summary;
