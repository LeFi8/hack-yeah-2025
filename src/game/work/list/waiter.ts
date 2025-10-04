import { JobContract } from "../job-contract";
import type { State } from "../../state";

export class Waiter extends JobContract {
  constructor(contractType: "UOP" | "UZ" | "B2B" | "UNREGISTERED") {
    super(contractType);
  }

  getBruttoIncome(): number {
    return 5000;
  }

  getPosition(): string {
    return "Waiter";
  }

  applyMonthlyEffects(state: State) {
    super.applyMonthlyEffects(state);
    state.character.happiness.add(-0.2);
  }

  canUpgrade() {
    return false;
  }

  upgrade(): void {}

  getLvl(): number {
    return 1;
  }

  getNextLvlContract() {
    return new Waiter(this.contractType);
  }
}
