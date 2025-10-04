import type { Item } from "../item.ts";

export class Car implements Item {
  monthlyCost: number;
  inLeasing: boolean;
  constructor(monthlyCost: number, inLeasing: boolean) {
    this.monthlyCost = monthlyCost;
    this.inLeasing = inLeasing;
  }
  applyMonthlyEffects(_state: any): void {
    // No monthly effects for the car
  }
}
