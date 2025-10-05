import { Event } from "../event";

export class HelpedNeighbor extends Event {
  canActivate() {
    return this.state.focus.relation.get();
  }
  applyEffects() {
    this.state.character.happiness.add(3);
    this.state.character.mentalHealth.add(2);
  }
  getTitle() {
    return "You helped a neighbor";
  }
  getDescription() {
    return `Your neighbor needed help carrying groceries. You offered your assistance, which made you feel good and strengthened your sense of community.`;
  }
  getWeight() {
    if (this.state.focus.relation.get()) {
      return 2;
    }
    return 1;
  }
}
