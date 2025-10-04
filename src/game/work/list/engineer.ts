import { JobContract } from "../job-contract";
import type { State } from "../../state";

export class Engineer extends JobContract {
  constructor(
    contractType: "UOP" | "UZ" | "B2B" | "UNREGISTERED",
    private lvl: number,
  ) {
    super(contractType);
  }

  getBruttoIncome(): number {
    return 5000 * this.lvl;
  }

  getPosition(): string {
    return [this.getLvlName(this.lvl), "Engineer"].join(" ");
  }

  applyMonthlyEffects(state: State) {
    super.applyMonthlyEffects(state);
  }

  canUpgrade() {
    return this.lvl < 3;
  }

  upgrade(): void {
    if (this.canUpgrade()) {
      this.lvl += 1;
    }
  }

  getLvl(): number {
    return this.lvl;
  }

  getNextLvlContract() {
    return new Engineer(this.contractType, this.lvl + 1);
  }
}
