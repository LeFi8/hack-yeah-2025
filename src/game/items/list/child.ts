import type { Item } from "../item.ts";

export class Child implements Item {
  name = "Child";
  iconUrl = "child.png";
  monthlyCost = 600;
  private monthsToAdult: number;
  constructor(adult: boolean = false) {
    if (adult) {
      this.monthsToAdult = 0;
    } else {
      this.monthsToAdult = 216; // 18 years
    }
  }

  applyMonthlyEffects(state: any) {
    state.character.happiness.add(2);
    this.monthsToAdult--;
    if (this.monthsToAdult <= 0) {
      state.removeItem(this);
      state.addItem(new Child(true));
    }
  }
}
