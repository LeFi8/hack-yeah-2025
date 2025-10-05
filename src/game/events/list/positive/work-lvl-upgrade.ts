import { Event } from "../../event";

export class WorkLvlUpgrade extends Event {
  private description: string = "";

  canActivate() {
    this.description = `You are ${this.state.job?.getNextLvlContract().getPosition()} now!`;
    return !!this.state.job?.canUpgrade();
  }

  applyEffects() {
    this.state.job?.upgrade();
  }
  getTitle() {
    return "You got a promotion at work";
  }
  getDescription() {
    return this.description;
  }
  getWeight() {
    let weight = 5;
    if (this.state.focus.work) {
      weight = weight * 10;
    }

    return weight;
  }
}
