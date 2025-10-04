import { JobContract } from "../job-contract";
import type { State } from "../../state";

export class Waiter extends JobContract {
  constructor(contractType: "UOP" | "UZ" | "B2B" | "UNREGISTERED" = "UOP") {
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
}
