import { Event } from "../event";
import type { Item } from "../../items";
import { Car } from "../../items/list/car";

export class TravelingDueToCar extends Event {
  canActivate() {
    return this.state.items.some((item: Item) => item instanceof Car);
  }
  applyEffects() {
    this.state.character.happiness.add(7);
    this.state.character.balance -= 200;
  }
  getTitle() {
    return "Trip around the country";
  }
  getDescription() {
    return `You decided to take a trip around the country using your car. 
        This adventure allowed you to explore new places and enjoy the freedom of the open road.
        Happiness: +5
        Mental Health: +3
    `;
  }
  getWeight() {
    return 1;
  }
}
