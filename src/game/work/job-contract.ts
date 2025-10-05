import { State } from "../state";

export abstract class JobContract {
  abstract getBruttoIncome(): number;
  abstract getPosition(): string;
  abstract canUpgrade(): boolean;
  abstract getLvl(): number;
  abstract upgrade(): void;
  abstract getNextLvlContract(): JobContract;

  private zusPercent = {
    UOP: 12,
    UZ: 8,
    B2B: 6,
    UNREGISTERED: 0,
  };
  private taxPercent = {
    UOP: 25,
    UZ: 20,
    B2B: 12,
    UNREGISTERED: 0,
  };

  constructor(
    protected readonly contractType: "UOP" | "UZ" | "B2B" | "UNREGISTERED",
  ) {}

  applyMonthlyEffects(state: State) {
    state.zus.alreadyAccummulated += this.getZusContribution();
    state.character.balance += this.getNettoIncome();
  }

  getZusContribution(): number {
    return this.getBruttoIncome() * (this.zusPercent[this.contractType] / 100);
  }

  getNettoIncome(): number {
    const totalTaxAndZusPercent =
      this.taxPercent[this.contractType] + this.zusPercent[this.contractType];
    return (
      this.getBruttoIncome() -
      this.getBruttoIncome() * (totalTaxAndZusPercent / 100)
    );
  }

  getContractType(): string {
    return this.contractType;
  }

  getLvlName(lvl: number): string {
    return ["Junior", "Middle", "Senior"][lvl] ?? "";
  }
}

// software engineer, requirements: 2 years education, 5k, 10k, 15k, 20k, 25k, effect: random happy every month
// taxi driver, requirements: car 9k
// waiter, requirements: nothing 4k, effect: -0.1 happiness
// doctor, requirements: 5 years education, 5k, 10k, 15k, 20k, 25k
// teacher, requirements: 2 years education, 5k, 6k, 7k

// contract with full contributions - 25% tax + 12% zus
// civil law contract - 20% tax + 12% zus
// B2B - 12% tax + 6% zus
// unregistered work
