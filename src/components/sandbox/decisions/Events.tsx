import { useState } from "react";
import Card from "../../common/Card.tsx";
import Button from "../../common/Button.tsx";
import { type Event } from "../../../game/events";

interface EventsProps {
  allEvents: Event[];
  onEventAccepted: () => void;
}

function Events({ allEvents, onEventAccepted }: EventsProps) {
  const [events, setEvents] = useState(allEvents);

  const currentEvent = events[0];

  const acceptCurrentEvent = () => {
    if (events.length === 1) {
      onEventAccepted();
      return;
    }
    setEvents((prevEvents) => prevEvents.slice(1));
  };

  return (
    <div className="flex flex-col h-full gap-3">
      <Card key={events.length} className={"grow"}>
        <>
          <h2 className="text-xl pb-2 font-bold">{currentEvent.getTitle()}</h2>
          <p>{currentEvent.getDescription()}</p>
        </>
      </Card>
      <Button text={"OK"} onClick={acceptCurrentEvent} />
    </div>
  );
}

export default Events;
