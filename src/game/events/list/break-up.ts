import { Event } from "../event";
import type { Item } from "../../items";
import { Girlfriend } from "../../items/list/partners/girlfriend.ts";

export class BreakUp extends Event {
  canActivate = () => {
    return this.state.items.some(
      (item: Item) => item instanceof Girlfriend && item.resignedFromProposing,
    );
  };
  applyEffects = () => {
    const girlfriend = this.state.items.find(
      (item: Item) => item instanceof Girlfriend,
    ) as Girlfriend;
    if (girlfriend) {
      this.state.character.mentalHealth.add(-20);
      this.state.character.happiness.add(-20);
      this.state.removeItem(girlfriend);
    }
  };
  getTitle = () => {
    return "Your girlfriend broke up with you";
  };
  getDescription = () => {
    return `Your girlfriend decided to end the relationship. This breakup has been tough on you, leading to a significant drop in your mental health and happiness. It's a challenging time, but with time and self-care, you can heal and move forward.`;
  };
  getWeight = () => {
    return 1;
  };
}
