import type { Item } from "../item.ts";
import type { State } from "../../state.ts";

export class Credit implements Item {
  iconUrl = "src/assets/zus_icon.png";
  monthlyCost: number = 0;
  monthsLeft: number = 0;
  constructor(monthlyPayment: number, months: number) {
    this.monthlyCost = monthlyPayment;
    this.monthsLeft = months;
  }
  applyMonthlyEffects(state: State) {
    this.monthsLeft--;
    if (this.monthsLeft < 0) {
      const credit = state.items.find((item: Item) => item === this);
      if (credit) {
        state.removeItem(credit);
      }
    }
  }
}
