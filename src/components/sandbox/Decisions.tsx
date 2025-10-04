import Title from "../common/Title.tsx";
import Events from "./decisions/Events.tsx";
import { useState } from "react";
import Possibilities from "./decisions/Possibilities.tsx";

const events = [
  {
    title: "Śmierć kota",
    description: "Twój kot niestety umarł :( Nie martw się, to tylko gra.",
  },
  {
    title: "Znalazłeś pieniądze",
    description: "Na chodniku znalazłeś 100zł. Gratulacje!",
  },
];

const possibilities = [
  {
    title: "Zostań wegetarianinem",
    choices: null,
  },
  {
    title: "Zacznij ćwiczyć",
    choices: null,
  },
  {
    title: "Naucz się programować",
    choices: [
      { text: "JavaScript", effect: { intelligence: +5, happiness: -2 } },
      { text: "Python", effect: { intelligence: +3, happiness: +1 } },
      { text: "C++", effect: { intelligence: +7, happiness: -5 } },
    ],
  },
];

function Decisions() {
  const [presentEvents, setPresentEvents] = useState(false);
  const [presentPossibilities, setPresentPossibilities] = useState(true);

  const onEventsAccepted = () => {
    setPresentEvents(false);
    setPresentPossibilities(true);
  };

  const onPossibilityChosen = (
    possibilityIndex: number,
    choiceIndex: number | null,
  ) => {
    // TODO: send decision to backend, activate next tick
    console.log(`Chosen possibility ${possibilities[possibilityIndex].title}.`);
    if (choiceIndex !== null) {
      console.log(
        `Selectd choice: ${possibilities[possibilityIndex].choices?.[choiceIndex]?.text}`,
      );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Title text={"Decisions"} />
      {presentEvents && (
        <Events allEvents={events} onEventAccepted={onEventsAccepted} />
      )}
      {presentPossibilities && (
        <Possibilities
          possibilities={possibilities}
          onPossibilityChosen={onPossibilityChosen}
        />
      )}
    </div>
  );
}

export default Decisions;
