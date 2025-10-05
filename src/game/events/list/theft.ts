import { Event } from "../event";
import { getRandomInt } from "../../utils";
import type { State } from "../../state";

export class Theft extends Event {
  private amountStolen: number;

  constructor(state: State) {
    super(state);
    this.amountStolen = getRandomInt(20, 500);
  }

  canActivate() {
    return true;
  }
  applyEffects() {
    this.state.character.balance -= this.amountStolen;
  }
  getTitle() {
    return "You have been a victim of theft";
  }
  getDescription() {
    return `After you returned home, you discovered that your wallet was missing.
        Someone must have stolen it while you were out.
        You lost $${this.amountStolen.toFixed(2)}.
    `;
  }
  getWeight() {
    return 1;
  }
}
