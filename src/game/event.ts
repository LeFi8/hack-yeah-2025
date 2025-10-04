import {State} from "./state.ts";

export class EventManager {
  getRandom(state: State): Event[] {
    const filteredEvents = allEvents.filter((event) => event.canActivate());

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

export interface Event {
  title: string,
  getWeight: (state: State) => number
  applyEffects: (state: State ) => void
  canActivate: () => boolean
}


const allEvents: Event[] = [
  {
    title: 'illness',
    canActivate: () => {
      return true;
    },
    applyEffects: (state: State) => {
      // get ran dom duration - 3 months
      // get random damage - 1 - 5 points
      // state.character.balance -=  state.character.monthlyIncome * duratin;
      // state.character.physicalHealth -= damage
    },
    getWeight: (state: State) => {
      if (state.focus.health > 1) {
        return 1;
      }
      return 2
    }
  }
]
