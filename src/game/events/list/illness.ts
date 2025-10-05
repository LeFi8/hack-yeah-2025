import { Event } from "../event";
import type {State} from "../../state";

export class Illness extends Event {
  happinessChange: number;
  mentalHealthChange: number;
  physicalHealthChange: number;
  balanceChange: number;

  constructor(protected readonly state: State) {
    super(state)
    this.happinessChange = -15 * (Math.random() + 1);
    this.mentalHealthChange = -15 * (Math.random() + 1);
    this.physicalHealthChange = -15 * (Math.random() + 1);
    this.balanceChange = -1000 * (Math.random() + 1);
  }
  canActivate = () => {
    return true;
  };
  applyEffects = () => {
    this.state.character.happiness.add(this.happinessChange);
    this.state.character.mentalHealth.add(this.mentalHealthChange);
    this.state.character.physicalHealth.add(this.physicalHealthChange);
    this.state.character.balance -= this.balanceChange;
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
  getWeight = () => {
    if (this.state.focus.health.get()) {
      return 0;
    }
    return 1;
  };
}
