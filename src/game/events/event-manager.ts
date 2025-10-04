import type {Event} from "./event";
import type {State} from "../state.ts";
import {Illness} from "./list/illness.ts";
import {Theft} from "./list/theft.ts";
import {FoundMoney} from "./list/found-money.ts";

export class EventManager {
  private events: Event[]

  constructor() {
    this.events = [
      new Illness(),
      new Theft(),
      new FoundMoney(),
    ]
  }

  getRandom(state: State): Event[] {
    const filteredEvents = this.events.filter((event) => event.canActivate(state));

    if (filteredEvents.length === 0) {
      return [];
    }

    const weightedEvents = filteredEvents.map(event => ({
      event,
      weight: event.getWeight(state)
    })).filter(item => item.weight > 0);

    if (weightedEvents.length === 0) {
      return [];
    }

    const selectedEvents: Event[] = [];
    const availableEvents = [...weightedEvents];

    for (let i = 0; i < 3 && availableEvents.length > 0; i++) {
      const totalWeight = availableEvents.reduce((sum, item) => sum + item.weight, 0);

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

    return selectedEvents;
  }

}
