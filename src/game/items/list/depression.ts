import {State} from "../../state";
import type {Item} from "../item";

export class Depression implements Item {
  private monthsLeft: number
  constructor() {
    this.monthsLeft = Math.random() * 10
  }

  applyMonthlyEffects(state: State) {
    // state.character.happiness--
    this.monthsLeft--
    if (this.monthsLeft <= 0) {
      // remove depression from items
    }
  }
}
