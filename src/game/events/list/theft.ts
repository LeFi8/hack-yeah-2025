import { Event } from "../event";

export class Theft extends Event {
  private amountStolen = 2000;
  private randomizeAmountStolen() {
    this.amountStolen = 2000 * (Math.random() + 1);
  }

  canActivate() {
    this.randomizeAmountStolen();
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
