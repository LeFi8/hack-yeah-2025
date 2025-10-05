import type { Event } from "./event";
import type { State } from "../state";
import { Illness } from "./list/illness";
import { Theft } from "./list/theft";
import { FoundMoney } from "./list/positive/found-money";
import { VegateblesGetMoreExpensive } from "./list/vegatebles-get-more-expensive";
import { FriendsByReading } from "./list/positive/friends-by-reading.ts";
import { TravelingDueToCar } from "./list/positive/traveling-due-to-car";
import { EducationLvlUpgrade } from "./list/positive/education-lvl-upgrade.ts";
import { WorkLvlUpgrade } from "./list/positive/work-lvl-upgrade";
import { HelpedNeighbor } from "./list/positive/helped-neighbour.ts";
import { CarIsBroken } from "./list/car-is-broken.ts";
import { BreakUp } from "./list/break-up.ts";
import { BigCommunityEvent } from "./list/positive/big-community-event.ts";
import { DiscoveredHobbyPassion } from "./list/positive/discover-hobby.ts";
import { IllnessDueToHighHp } from "./list/illness-due-to-high-hp.ts";
import { PoliceCaughtYou } from "./list/police-caught-you.ts";

export type EventHistory = {
  event: Event;
  month: number;
  age: number;
};
export class EventManager {
  private history: EventHistory[] = [];
  private DEACREASED_CHANCE_IF_HAPPENED = 5;

  addEventToHistory(event: Event, month: number, age: number) {
    this.history.push({ event, month, age });
  }

  getHistory() {
    return this.history;
  }

  getAllEvents(state: State) {
    return [
      new Illness(state),
      new Theft(state),
      new FoundMoney(state),
      new VegateblesGetMoreExpensive(state),
      new FriendsByReading(state),
      new EducationLvlUpgrade(state),
      new WorkLvlUpgrade(state),
      new HelpedNeighbor(state),
      new CarIsBroken(state),
      new TravelingDueToCar(state),
      new BreakUp(state),
      new BigCommunityEvent(state),
      new DiscoveredHobbyPassion(state),
      new IllnessDueToHighHp(state),
      new PoliceCaughtYou(state),
    ];
  }

  // If event already happen we reduce chance of it happening again
  getRandom(state: State): Event | null {
    const filteredEvents = this.getAllEvents(state).filter((event) =>
      event.canActivate(),
    );

    if (filteredEvents.length === 0) {
      return null;
    }

    const weightedEvents = filteredEvents
      .map((event) => {
        let weight = event.getWeight();

        // Check if this type of event has already happened
        const hasHappened = this.history.some(
          (historyEntry) =>
            historyEntry.event.constructor === event.constructor,
        );

        if (hasHappened) {
          weight = weight / this.DEACREASED_CHANCE_IF_HAPPENED;
        }

        return {
          event,
          weight: weight,
        };
      })
      .filter((item) => item.weight > 0);

    if (weightedEvents.length === 0) {
      return null;
    }

    const selectedEvents: Event[] = [];
    const availableEvents = [...weightedEvents];

    for (let i = 0; i < 1 && availableEvents.length > 0; i++) {
      const totalWeight = availableEvents.reduce(
        (sum, item) => sum + item.weight,
        0,
      );

      if (totalWeight === 0) break;

      const randomValue = Math.random() * totalWeight;

      let currentWeight = 0;
      let selectedIndex = 0;

      for (let j = 0; j < availableEvents.length; j++) {
        currentWeight += availableEvents[j].weight;
        if (randomValue <= currentWeight) {
          selectedIndex = j;
          break;
        }
      }

      const selected = availableEvents.splice(selectedIndex, 1)[0];
      selectedEvents.push(selected.event);
    }

    return selectedEvents[0];
  }
}
