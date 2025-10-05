import { Event } from "../../event";

export class FoundMoney extends Event {
  private readonly amountFound = 100;

  canActivate() {
    return true;
  }
  applyEffects() {
    this.state.character.balance += this.amountFound;
  }
  getTitle() {
    return "You found some money on the street";
  }
  getDescription() {
    return `While walking down the street, you noticed something shiny on the ground.
        It was a $${this.amountFound.toFixed(2)} bill that someone must have dropped.
        Nobody is around, so you decided to keep it.
    `;
  }
  getWeight() {
    return 1;
  }
}
