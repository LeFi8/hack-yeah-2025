import { RomanticPartner } from "./romantic-partner.ts";
import type { State } from "../../../state.ts";

export class Girlfriend extends RomanticPartner {
  iconUrl = "src/assets/zus_icon.png";
  resignedFromProposing: boolean;
  monthsToMarriageDecision: number;
  isEngaged: boolean;
  constructor() {
    super();
    this.monthsToMarriageDecision = Math.random() * 8 * 12; // 0 to 8 years
    this.resignedFromProposing = false;
    this.isEngaged = false;
  }
  monthlyCost = 200;
  applyMonthlyEffects(state: State) {
    state.character.happiness.add(1);
    this.monthsToMarriageDecision--;
  }
}
