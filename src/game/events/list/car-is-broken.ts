import { Event } from "../event";
import { Car } from "../../items/list/car";
import type { Item } from "../../items";

export class CarIsBroken extends Event {
  private readonly repairCost = 500;

  canActivate(){
    return this.state.items.some((item: Item) => item instanceof Car);
  };
  applyEffects(){
    this.state.character.balance -= this.repairCost;
    this.state.character.physicalHealth.add(-2);
  };
  getTitle(){
    return "Your car broke down";
  };
  getDescription(){
    return `When driving a car it started to make unusual noises. You've found out it's an engine problem. You had to pay $${this.repairCost.toFixed(2)} for repairs and the stress affected your health.`;
  };
  getWeight(){
    return 1;
  };
}
