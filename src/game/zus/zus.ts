import type { State } from "../state";

export class ZUS {
  isAlreadyRetired: boolean = false;
  alreadyAccummulated: number = 0;
  monthlyRetirementIncome: number = 0;
  retirementAge: number = 65;
  yearlyIndexation: number = 0.025;
  replacementRate: number = 0;

  totalContributionYears: number = 0;
  REQUIRED_YEARS_FOR_MIN_PENSION: number = 20; // men
  TARGET_REPLACEMENT_RATE: number = 0.4; // 40%
  MIN_PENSION: number = 1600; // example minimal pension

  contribute(amount: number) {
    this.alreadyAccummulated += amount;
    this.totalContributionYears += 1 / 12; // monthly contribution
  }

  calculateMonthlyRetirementIncome(state: State) {
    const pensionFromAccumulated = this.alreadyAccummulated / (20 * 12); // 20 years expected retirement

    let pensionFromTargetRate = 0;
    if (state.job) {
      const lastSalary = state.job.getBruttoIncome();
      // Scale the replacement rate by contribution years
      const contributionRatio = Math.min(
        this.totalContributionYears / this.REQUIRED_YEARS_FOR_MIN_PENSION,
        1,
      );
      pensionFromTargetRate =
        lastSalary * this.TARGET_REPLACEMENT_RATE * contributionRatio;
    }

    // Take higher of the two
    let calculatedPension = Math.max(
      pensionFromAccumulated,
      pensionFromTargetRate,
    );

    // Apply minimal pension only if enough contribution years
    if (this.totalContributionYears >= this.REQUIRED_YEARS_FOR_MIN_PENSION) {
      calculatedPension = Math.max(calculatedPension, this.MIN_PENSION);
    }

    this.monthlyRetirementIncome = calculatedPension;
  }

  calculateReplacementRate(state: State) {
    if (!state.job || state.job.getBruttoIncome() === 0) {
      this.replacementRate = 0;
      return;
    }
    this.replacementRate =
      this.monthlyRetirementIncome / state.job.getBruttoIncome();
  }

  applyMonthlyEffects(state: State) {
    if (state.getMonthsElapsed() % 12 === 0 && state.getMonthsElapsed() > 0) {
      this.alreadyAccummulated *= 1 + this.yearlyIndexation;
    }

    this.calculateMonthlyRetirementIncome(state);
    this.calculateReplacementRate(state);

    if (this.isRetired()) {
      state.character.balance += this.monthlyRetirementIncome;

      if (state.getMonthsElapsed() % 12 === 0 && state.getMonthsElapsed() > 0) {
        this.monthlyRetirementIncome *= 1 + this.yearlyIndexation * 0.8;
      }
    }
  }

  delayRetirement(years: number) {
    this.retirementAge += years;
  }

  retire(age: number) {
    this.isAlreadyRetired = true;
    this.retirementAge = age;
  }

  isRetired(): boolean {
    return this.isAlreadyRetired;
  }

  getEstimatedPension(): number {
    return this.monthlyRetirementIncome;
  }

  getReplacementRate(): number {
    return this.replacementRate;
  }

  getReplacementRatePercentage(): string {
    return `${(this.replacementRate * 100).toFixed(1)}%`;
  }
}
