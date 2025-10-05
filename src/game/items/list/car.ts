import type { Item } from "../item";

export class Car implements Item {
  name = "Car";
  iconUrl = "car.png";
  monthlyCost: number;
  inLeasing: boolean;
  constructor(monthlyCost: number, inLeasing: boolean) {
    this.monthlyCost = monthlyCost;
    this.inLeasing = inLeasing;
  }
  applyMonthlyEffects(_state: any): void {}
}
