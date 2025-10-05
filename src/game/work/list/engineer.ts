import { JobContract } from "../job-contract";
import type { State } from "../../state";

export class Engineer extends JobContract {
  constructor(
    state: State,
    contractType: "UOP" | "UZ" | "B2B" | "UNREGISTERED",
    private lvl: number,
  ) {
    super(state, contractType);
  }

  getBruttoIncome(): number {
    const multiplier = 1 + this.state.education.level.get() / 5;
    return 5000 * this.lvl * multiplier;
  }

  getPosition(): string {
    return [this.getLvlName(this.lvl), "Engineer"].join(" ");
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
    return new Engineer(this.state, this.contractType, this.lvl + 1);
  }
}
