import { Event } from "../event";
import type { Item } from "../../items";
import { Wife } from "../../items/list/partners/wife.ts";

export class UnexpectedChild extends Event {
  canActivate() {
    return this.state.items.some(
      (item: Item) => item instanceof Wife && !item.isPregnant,
    );
  }
  applyEffects() {
    const wife = this.state.items.find((i: Item) => i instanceof Wife) as Wife;
    wife.GetPregnant();
    this.state.character.happiness.add(10);
  }
  getTitle() {
    return "Your wife is pregnant!";
  }
  getDescription() {
    return `Your wife has just told you the wonderful news that she is pregnant!
        This unexpected blessing has filled your heart with joy and excitement as you both prepare to welcome a new member into your family.
        Happiness: +10
    `;
  }
  getWeight() {
    return 1;
  }
}
