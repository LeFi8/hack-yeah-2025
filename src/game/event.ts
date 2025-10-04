import {State} from "./state.ts";

export class EventManager {
  getRandom(state: State): Event[] {
    const filtered = allEvents.filter((el) => el.canActivate());

    // get 3 random possibilities
    // Example:
    // get random number from 1 to 100: 68
    // collect all weights [2, 1]
    // 2+1 = 3
    // 68 % 3 = 2
    // 1st is chosen
    return []
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
