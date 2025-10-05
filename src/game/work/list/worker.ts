import { JobContract } from "../job-contract";
import type { State } from "../../state";

export class Worker extends JobContract {
  constructor(
    state: State,
    contractType: "UZ" | "UNREGISTERED" | "UOP" | "B2B",
    private lvl: number,
  ) {
    super(state, contractType);
  }

  getBruttoIncome(): number {
    const multiplier = 1 + this.state.education.level.get() / 5;
    return 5000 * this.lvl * multiplier;
  }

  getPosition(): string {
    return [this.getLvlName(this.lvl), "Production Worker"].join(" ");
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
    return new Worker(this.state, this.contractType, this.lvl + 1);
  }
}
