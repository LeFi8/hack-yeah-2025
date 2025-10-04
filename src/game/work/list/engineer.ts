import { JobContract } from "../job-contract";
import type { State } from "../../state";

export class Engineer extends JobContract {
  constructor(
    contractType: "UOP" | "UZ" | "B2B" | "UNREGISTERED",
    private readonly lvl: number,
  ) {
    super(contractType);
  }

  getBruttoIncome(): number {
    return 5000 * this.lvl;
  }

  getPosition(): string {
    return "Engineer";
  }

  applyMonthlyEffects(state: State) {
    super.applyMonthlyEffects(state);
  }
}
