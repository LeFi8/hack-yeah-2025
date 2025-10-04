import {JobContract} from "../job-contract";
import type {State} from "../../state.ts";

export class Engineer extends JobContract {
  constructor(
    contractType: "UOP" | "UZ" | "B2B" | "UNREGISTERED"  = "UOP",
    private readonly lvl: number
  ) {
    super(contractType);
  }

  getBruttoIncome(): number {
    return 5000 * this.lvl
  }

  getPosition(): string {
      return 'Engineer'
  }

  applyMonthlyEffects(state: State) {
    super.applyMonthlyEffects(state);
  }

}