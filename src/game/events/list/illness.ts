import type { Event } from "../event";
import type { State } from "../../state";

export class Illness implements Event {
  happinessChange: number;
  mentalHealthChange: number;
  physicalHealthChange: number;
  balanceChange: number;

  constructor() {
    this.happinessChange = -15 * (Math.random() + 1);
    this.mentalHealthChange = -15 * (Math.random() + 1);
    this.physicalHealthChange = -15 * (Math.random() + 1);
    this.balanceChange = -1000 * (Math.random() + 1);
  }
  canActivate = (_: State) => {
    return true;
  };
  applyEffects = (state: State) => {
    state.character.happiness.add(this.happinessChange);
    state.character.mentalHealth.add(this.mentalHealthChange);
    state.character.physicalHealth.add(this.physicalHealthChange);
    state.character.balance -= this.balanceChange;
  };
  getTitle = () => {
    return "You got seriously ill";
  };
  getDescription = () => {
    return `
      You have been diagnosed with a serious illness that requires immediate treatment. 
      The treatment will be expensive and will take a toll on your mental and physical health.
      Happiness: ${this.happinessChange.toFixed(0)}.
      Mental Health: ${this.mentalHealthChange.toFixed(0)}.
      Physical Health: ${this.physicalHealthChange.toFixed(0)}
      Balance: ${this.balanceChange.toFixed(0)}
    `;
  };
  getWeight = (state: State) => {
    if (state.focus.health.get()) {
      return 0;
    }
    return 1;
  };
}
