import { Event } from "../event";
import type { Item } from "../../items";
import { ArrestWarrant } from "../../items/list/arrest-warrant.ts";

export class PoliceCaughtYou extends Event {
  canActivate() {
    return this.state.items.some((i: Item) => i instanceof ArrestWarrant);
  }
  applyEffects() {
    const warrant = this.state.items.find(
      (i: Item) => i instanceof ArrestWarrant,
    );
    if (warrant) {
      this.state.removeItem(warrant);
    }
    this.state.character.balance -= 3000;
    this.state.character.happiness.add(-20);
  }
  getTitle() {
    return "Police stopped you";
  }
  getDescription() {
    return `
      Police finally caught you and punished your reckless driving. You had to pay 3000 PLN in mandates.
    `;
  }
  getWeight() {
    return 2;
  }
}
