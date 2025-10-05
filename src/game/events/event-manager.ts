import type { Event } from "./event";
import type { State } from "../state";
import { Illness } from "./list/illness";
import { Theft } from "./list/theft";
import { FoundMoney } from "./list/found-money";
import { VegateblesGetMoreExpensive } from "./list/vegatebles-get-more-expensive";
import { FriendsByReading } from "./list/friends-by-reading";
import { TravelingDueToCar } from "./list/traveling-due-to-car";
import { EducationLvlUpgrade } from "./list/education-lvl-upgrade";
import { WorkLvlUpgrade } from "./list/work-lvl-upgrade";
import {HelpedNeighbor} from "./list/helped-neighbour.ts";
import {CarIsBroken} from "./list/car-is-broken.ts";
import {BreakUp} from "./list/break-up.ts";

export class EventManager {
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
    ];
  }

  getRandom(state: State): Event | null {
    const filteredEvents = this.getAllEvents(state).filter((event) =>
      event.canActivate(),
    );

    if (filteredEvents.length === 0) {
      return null;
    }

    const weightedEvents = filteredEvents
      .map((event) => ({
        event,
        weight: event.getWeight(),
      }))
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
