import type { Event } from "../event";
import type { State } from "../../state";
import type { Item } from "../../items";
import { Car } from "../../items/list/car";

export class TravelingDueToCar implements Event {
  canActivate = (state: State) => {
    return state.items.some((item: Item) => item instanceof Car);
  };
  applyEffects = (state: State) => {
    state.character.happiness.add(5);
    state.character.mentalHealth.add(3);
    state.character.balance -= 200;
  };
  getTitle = () => {
    return "Trip around the country";
  };
  getDescription = () => {
    return `You decided to take a trip around the country using your car. 
        This adventure allowed you to explore new places and enjoy the freedom of the open road.
        Happiness: +5
        Mental Health: +3
    `;
  };
  getWeight = (_: State) => {
    return 1;
  };
}
