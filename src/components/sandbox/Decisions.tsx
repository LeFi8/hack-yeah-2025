import Title from "../common/Title.tsx";
import Events from "./decisions/Events.tsx";
import Possibilities from "./decisions/Possibilities.tsx";
import type { GameTickResult } from "../../game/game.ts";

interface DecisionsProps {
  tickResult: GameTickResult;
  shouldHandleEvents: boolean;
  shouldHandlePossibilities: boolean;
  onEventHandled: () => void;
  onPossibilityHandled: (possibilityIndex: number, choiceIndex: number) => void;
}

function Decisions({
  shouldHandleEvents,
  shouldHandlePossibilities,
  tickResult,
  onEventHandled,
  onPossibilityHandled,
}: DecisionsProps) {
  const onPossibilityChosen = (
    possibilityIndex: number,
    choiceIndex: number,
  ) => {
    onPossibilityHandled(possibilityIndex, choiceIndex);
  };

  let title = "Life is going on...";
  if (shouldHandleEvents) {
    title = "Events";
  } else if (shouldHandlePossibilities) {
    title = "Decisions";
  }

  if (!shouldHandleEvents && !shouldHandlePossibilities) {
    return (
      <div className="flex items-center justify-center transform translate-y-[-4rem] h-full">
        <Title text={"Life is going on..."}></Title>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Title text={title} />
      {shouldHandleEvents && (
        <Events
          allEvents={[tickResult.event!]}
          onEventAccepted={onEventHandled}
        />
      )}
      {!shouldHandleEvents && shouldHandlePossibilities && (
        <Possibilities
          possibilities={tickResult.possibilities}
          onPossibilityChosen={onPossibilityChosen}
        />
      )}
    </div>
  );
}

export default Decisions;
