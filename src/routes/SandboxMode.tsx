import State from "../components/sandbox/State.tsx";
import Character from "../components/sandbox/Character.tsx";
import Decisions from "../components/sandbox/Decisions.tsx";
import LifeChart from "../components/sandbox/LifeChart.tsx";
import CharacterFocus from "../components/sandbox/CharacterFocus.tsx";
import { Game, type GameTickResult } from "../game/game.ts";
import { useEffect, useState } from "react";

let game = new Game();

function SandboxMode() {
  const [tickResult, setTickResult] = useState<GameTickResult | null>(null);
  const [eventHandled, setEventHandled] = useState(true);
  const [possibilityHandled, setPossibilityHandled] = useState(true);

  useEffect(() => {
    game = new Game();
    game.start();
  }, []);

  useEffect(() => {
    if (!eventHandled || !possibilityHandled) {
      return;
    }

    const intervalId = setInterval(() => {
      const newTickResult = game.tick();
      if (newTickResult.event) {
        setEventHandled(false);
      }
      if (newTickResult.possibilities.length) {
        setPossibilityHandled(false);
      }
      setTickResult(newTickResult);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    game,
    setEventHandled,
    eventHandled,
    setPossibilityHandled,
    possibilityHandled,
    setTickResult,
  ]);

  if (tickResult === null) {
    return "";
  }

  const onEventHandled = () => {
    setEventHandled(true);
  };

  const onPossibilityHandled = (
    possibilityIndex: number,
    choiceIndex: number,
  ) => {
    const selectedPossibility = tickResult.possibilities[possibilityIndex];
    game.selectPossibility(selectedPossibility, choiceIndex);
    setPossibilityHandled(true);
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
