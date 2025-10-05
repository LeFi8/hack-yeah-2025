import { Event } from "../../event";

export class HelpedNeighbor extends Event {
  canActivate() {
    return this.state.focus.relation;
  }
  applyEffects() {
    this.state.character.happiness.add(4);
  }
  getTitle() {
    return "You helped a neighbor";
  }
  getDescription() {
    return `Your neighbor needed help carrying groceries. You offered your assistance, which made you feel good and strengthened your sense of community.`;
  }
  getWeight() {
    if (this.state.focus.relation) {
      return 2;
    }
    return 1;
  }
}
