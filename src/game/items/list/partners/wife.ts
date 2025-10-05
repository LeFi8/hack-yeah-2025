import { RomanticPartner } from "./romantic-partner.ts";
import type { State } from "../../../state.ts";
import { Child } from "../child.ts";

export class Wife extends RomanticPartner {
  name = "Wife";

  isPregnant: boolean = false;
  timeToBirth: number = 0; // in months
  iconUrl = "wife.png";
  applyMonthlyEffects(state: State) {
    state.character.happiness.add(1);
    if (this.isPregnant) {
      this.timeToBirth--;
      if (this.timeToBirth <= 0) {
        this.isPregnant = false;
        state.addItem(new Child());
      }
    }
  }

  GetPregnant() {
    this.isPregnant = true;
    this.timeToBirth = 9;
  }
}
