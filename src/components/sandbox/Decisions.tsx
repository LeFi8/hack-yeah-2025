import Title from "../common/Title.tsx";
import Events from "./decisions/Events.tsx";
import { useEffect, useState } from "react";
import Possibilities from "./decisions/Possibilities.tsx";
import type { GameTickResult } from "../../game/game.ts";

interface DecisionsProps {
  tickResult: GameTickResult;
  onEventHandled: () => void;
  onPossibilityHandled: (possibilityIndex: number, choiceIndex: number) => void;
}

function Decisions({
  tickResult,
  onEventHandled,
  onPossibilityHandled,
}: DecisionsProps) {
  const [presentEvents, setPresentEvents] = useState(false);
  const [presentPossibilities, setPresentPossibilities] = useState(false);

  useEffect(() => {
    if (tickResult.event !== null) {
      setPresentEvents(true);
    }
    if (tickResult.possibilities.length) {
      setPresentPossibilities(true);
    }
  }, [tickResult]);

  const onEventsAccepted = () => {
    setPresentEvents(false);
    onEventHandled();
  };

  const onPossibilityChosen = (
    possibilityIndex: number,
    choiceIndex: number,
  ) => {
    onPossibilityHandled(possibilityIndex, choiceIndex);
    const selectedOne = tickResult.possibilities[possibilityIndex];
    console.log(
      `${selectedOne.title}: ${selectedOne.options[choiceIndex].title}`,
    );
  };

  return (
    <div className="flex flex-col h-full">
      <Title text={"Decisions"} />
      {presentEvents && (
        <Events
          allEvents={[tickResult.event!]}
          onEventAccepted={onEventsAccepted}
        />
      )}
      {!presentEvents && presentPossibilities && (
        <Possibilities
          possibilities={tickResult.possibilities}
          onPossibilityChosen={onPossibilityChosen}
        />
      )}
    </div>
  );
}

export default Decisions;
