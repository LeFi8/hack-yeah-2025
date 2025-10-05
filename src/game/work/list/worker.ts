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
    return 5000 * 1.2 ** this.lvl;
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
