import { State } from "../../state";
import type { Item } from "../item";

export class GymMembership implements Item {
  monthlyCost = 100;
  private monthsLeft: number;

  constructor(months: number) {
    this.monthsLeft = months;
  }

  applyMonthlyEffects(state: State) {
    state.character.happiness.add(1);
    state.character.physicalHealth.add(1);
    this.monthsLeft--;
    if (this.monthsLeft <= 0) {
      state.removeItem(this);
    }
  }
}
