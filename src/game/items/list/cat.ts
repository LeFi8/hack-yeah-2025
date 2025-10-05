import { State } from "../../state";
import type { Item } from "../item";
import { Depression } from "./depression";

export class Cat implements Item {
  monthlyCost = 20;
  private monthsLeft: number;
  constructor() {
    this.monthsLeft = (1 + Math.random()) * 60;
  }

  applyMonthlyEffects(state: State) {
    state.character.happiness.add(1);
    this.monthsLeft--;
    if (this.monthsLeft <= 0) {
      state.removeItem(this);
      state.addItem(new Depression());
    }
  }
}
