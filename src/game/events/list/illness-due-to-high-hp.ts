import { Event } from "../event";
import type { State } from "../../state";

export class IllnessDueToHighHp extends Event {
  happinessChange: number;
  physicalHealthChange: number;
  balanceChange: number;

  constructor(protected readonly state: State) {
    super(state);
    this.happinessChange = -20 * (Math.random() + 1);
    this.physicalHealthChange = -30 * (Math.random() + 1);
    this.balanceChange = -200 * (Math.random() + 1);
  }
  canActivate() {
    return this.state.character.physicalHealth.get() > 90;
  }
  applyEffects() {
    this.state.character.happiness.add(this.happinessChange);
    this.state.character.physicalHealth.add(this.physicalHealthChange);
    this.state.character.balance -= this.balanceChange;
  }
  getTitle() {
    return "Sickness from recklessness";
  }
  getDescription() {
    return `
      Due to your perfect health you stopped caring about yourself and caught a flu.
      Happiness: ${this.happinessChange.toFixed(0)}.
      Physical Health: ${this.physicalHealthChange.toFixed(0)}
      Balance: ${this.balanceChange.toFixed(0)}
    `;
  }
  getWeight() {
    if (this.state.focus.health) {
      return 0;
    }
    return 1;
  }
}
