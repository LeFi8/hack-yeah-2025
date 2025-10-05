import SavingsHappinessChart from "../components/summary/SavingsHappinessChart.tsx";
import FocusChart from "../components/summary/FocusChart.tsx";
import InfoTile from "../components/summary/InfoTile.tsx";
import LifeSummary from "../components/summary/LifeSummary.tsx";
import { Game } from "../game/game.ts";
import SummaryItems from "../components/summary/SummaryItems.tsx";
import Title from "../components/common/Title.tsx";
import ChoicesSummaryChart from "../components/summary/ChoicesSummaryChart.tsx";

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
              <SavingsHappinessChart lifeHistory={game.getHistory()} />
            </div>
            <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-1">
              <FocusChart focus={game.getFocusStatistics()} />
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
                <Title text="Items"></Title>
                <SummaryItems items={game.getState().items} />
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
                <ChoicesSummaryChart />
              </div>
            </div>
            <div className="border-2 rounded-2xl bg-white shadow-md flex-3 p-5">
              <LifeSummary game={game} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Summary;
