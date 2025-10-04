import type { Event } from "../event";
import type { State } from "../../state";
import { Car } from "../../items/list/car.ts";
import type { Item } from "../../items";

export class CarIsBroken implements Event {
  private readonly repairCost: number;
  constructor() {
    this.repairCost = 500;
  }
  canActivate = (state: State) => {
    return state.items.some((item: Item) => item instanceof Car);
  };
  applyEffects = (state: State) => {
    state.character.balance -= this.repairCost;
    state.character.physicalHealth.add(-2);
  };
  getTitle = () => {
    return "Your car broke down";
  };
  getDescription = () => {
    return `When driving a car it started to make unusual noises. You've found out it's an engine problem. You had to pay $${this.repairCost.toFixed(2)} for repairs and the stress affected your health.`;
  };
  getWeight = (_: State) => {
    return 1;
  };
}
