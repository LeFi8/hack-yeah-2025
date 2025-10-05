import { RomanticPartner } from "./romantic-partner.ts";
import type { State } from "../../../state.ts";

export class Wife extends RomanticPartner {
  applyMonthlyEffects(state: State) {
    state.character.happiness.add(1);
  }
}
