import State from "../components/sandbox/State.tsx";
import Character from "../components/sandbox/Character.tsx";
import Decisions from "../components/sandbox/Decisions.tsx";
import LifeChart from "../components/sandbox/LifeChart.tsx";
import CharacterFocus from "../components/sandbox/CharacterFocus.tsx";
import { Game, type GameTickResult } from "../game/game.ts";
import { useEffect, useState } from "react";
import Spinner from "../components/common/Spinner.tsx";
import Summary from "./Summary.tsx";

function SandboxMode() {
  const [game, setGame] = useState<Game | null>(null);
  const [isGameFinished, setIsGameFinished] = useState(false);
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

    if (shouldHandleEvents || shouldHandlePossibilities || isGameFinished) {
      return;
    }

    const intervalId = setInterval(() => {
      const newTickResult = game!.tick();
      if (newTickResult.state.isGameEnded) {
        setIsGameFinished(true);
        return;
      }

      if (newTickResult.event) {
        setShouldHandleEvents(true);
      }
      if (newTickResult.possibilities.length) {
        setShouldHandlePossibilities(true);
      }
      setTickResult(newTickResult);
    }, 200);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    game,
    isGameFinished,
    setShouldHandleEvents,
    shouldHandleEvents,
    setShouldHandlePossibilities,
    shouldHandlePossibilities,
    setTickResult,
  ]);

  const onEventHandled = () => {
    setShouldHandleEvents(false);
  };

  const onPossibilityHandled = (
    possibilityIndex: number,
    choiceIndex: number,
  ) => {
    const selectedPossibility = tickResult!.possibilities[possibilityIndex];
    game!.selectPossibility(selectedPossibility, choiceIndex);
    setShouldHandlePossibilities(false);
  };

  if (game === null || tickResult === null) {
    return "";
  }

  if (isGameFinished) {
    // FIXME: should there be a popup with information that the game has ended?
    return <Summary />;
  }

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
                <Character tickResult={tickResult} />
                <CharacterFocus
                  key={tickResult.state.getMonthsElapsed()}
                  stateFocus={tickResult.state.focus}
                />
              </div>
              <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-7 relative">
                <Decisions
                  key={tickResult.state.getMonthsElapsed()}
                  tickResult={tickResult}
                  shouldHandleEvents={shouldHandleEvents}
                  shouldHandlePossibilities={shouldHandlePossibilities}
                  onEventHandled={onEventHandled}
                  onPossibilityHandled={onPossibilityHandled}
                />
                {!shouldHandleEvents && !shouldHandlePossibilities && (
                  <Spinner className={"absolute left-0 right-0 bottom-[30%]"} />
                )}
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex-1">
            <State tickResult={tickResult} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SandboxMode;
