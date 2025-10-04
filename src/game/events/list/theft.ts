import type { Event } from "../event";
import type { State } from "../../state";

export class Theft implements Event {
  private amountStolen: number;
  private randomizeAmountStolen = () => {
    this.amountStolen = 2000 * (Math.random() + 1);
  }
  constructor() {
    this.amountStolen = 2000;
  }
  canActivate = (_: State) => {
    this.randomizeAmountStolen()
    return true;
  };
  applyEffects = (state: State) => {
    state.character.balance -= this.amountStolen;
  };
  getTitle = () => {
    return "You have been a victim of theft";
  };
  getDescription = () => {
    return `After you returned home, you discovered that your wallet was missing.
        Someone must have stolen it while you were out.
        You lost $${this.amountStolen.toFixed(2)}.
    `;
  };
  getWeight = (_: State) => {
    return 1;
  };
}
