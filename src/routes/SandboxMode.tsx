import State from "../components/sandbox/State.tsx";
import Character from "../components/sandbox/Character.tsx";
import Decisions from "../components/sandbox/Decisions.tsx";
import LifeChart from "../components/sandbox/LifeChart.tsx";
import CharacterFocus from "../components/sandbox/CharacterFocus.tsx";
import { Game, type GameTickResult } from "../game/game.ts";
import { useEffect, useState } from "react";

function SandboxMode() {
  const [game, setGame] = useState<Game | null>(null);
  const [tickResult, setTickResult] = useState<GameTickResult | null>(null);
  const [shouldHandleEvents, setShouldHandleEvents] = useState(false);
  const [shouldHandlePossibilities, setShouldHandlePossibilities] =
    useState(false);

  useEffect(() => {
    const newGame = new Game();
    setGame(newGame);
    newGame.start();
  }, []);

  useEffect(() => {
    if (game === null) {
      return;
    }

    if (shouldHandleEvents || shouldHandlePossibilities) {
      return;
    }

    const intervalId = setInterval(() => {
      const newTickResult = game!.tick();
      // TODO: handle finished game newTickResult.state.isGameEnded
      if (newTickResult.event) {
        setShouldHandleEvents(true);
      }
      if (newTickResult.possibilities.length) {
        setShouldHandlePossibilities(true);
      }
      setTickResult(newTickResult);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    game,
    setShouldHandleEvents,
    shouldHandleEvents,
    setShouldHandlePossibilities,
    shouldHandlePossibilities,
    setTickResult,
  ]);

  if (game === null || tickResult === null) {
    return "";
  }

  const onEventHandled = () => {
    setShouldHandleEvents(false);
  };

  const onPossibilityHandled = (
    possibilityIndex: number,
    choiceIndex: number,
  ) => {
    const selectedPossibility = tickResult.possibilities[possibilityIndex];
    game!.selectPossibility(selectedPossibility, choiceIndex);
    setShouldHandlePossibilities(false);
  };

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
                <Character
                  key={tickResult.state.getMonthsElapsed()}
                  tickResult={tickResult}
                />
                <CharacterFocus />
              </div>
              <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-7">
                <Decisions
                  key={tickResult.state.getMonthsElapsed()}
                  tickResult={tickResult}
                  shouldHandleEvents={shouldHandleEvents}
                  shouldHandlePossibilities={shouldHandlePossibilities}
                  onEventHandled={onEventHandled}
                  onPossibilityHandled={onPossibilityHandled}
                />
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-1">
            <State
              key={tickResult.state.getMonthsElapsed()}
              tickResult={tickResult}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SandboxMode;
