import type { State } from "../state";

export class ZUS {
  isAlreadyRetired: boolean = false;
  alreadyAccummulated: number = 0; // suma składek z pracy
  monthlyRetirementIncome: number = 0; // miesięczne świadczenie emerytalne
  retirementAge: number = 65; // tylko mężczyźni
  yearlyIndexation: number = 0.025; // np. 2.5% rocznie
  replacementRate: number = 0; // wskaźnik zastąpienia - obliczany co miesiąc

  // dodawanie składki co miesiąc (wywoływane z JobContract)
  contribute(amount: number) {
    this.alreadyAccummulated += amount;
  }

  // waloryzacja raz w roku
  applyYearlyIndexation() {
    this.alreadyAccummulated *= 1 + this.yearlyIndexation;
  }

  // obliczenie emerytury - zawsze przelicza
  calculateMonthlyRetirementIncome(state: State) {
    // Stały wskaźnik zastąpienia dla obliczenia bazowej emerytury
    const TARGET_REPLACEMENT_RATE = 0.4; // 40% ostatniego wynagrodzenia

    if (!state.job) {
      // Jeśli nie ma pracy, emerytura tylko z składek
      const expectedLifeYears = 20;
      const months = expectedLifeYears * 12;
      this.monthlyRetirementIncome = this.alreadyAccummulated / months;
      return;
    }

    const lastSalary = state.job.getBruttoIncome();

    // Metoda 1: Na podstawie TARGET_REPLACEMENT_RATE od ostatniego wynagrodzenia
    const pensionFromTargetRate = lastSalary * TARGET_REPLACEMENT_RATE;

    // Metoda 2: Na podstawie zgromadzonych składek
    const expectedLifeYears = 20;
    const months = expectedLifeYears * 12;
    const pensionFromAccumulated = this.alreadyAccummulated / months;

    // Bierzemy wyższą wartość (bardziej korzystną dla gracza)
    this.monthlyRetirementIncome = Math.max(
      pensionFromTargetRate,
      pensionFromAccumulated,
    );
  }

  // obliczenie aktualnego wskaźnika zastąpienia
  calculateReplacementRate(state: State) {
    if (!state.job || state.job.getBruttoIncome() === 0) {
      this.replacementRate = 0;
      return;
    }

    const currentSalary = state.job.getBruttoIncome();
    this.replacementRate = this.monthlyRetirementIncome / currentSalary;
  }

  applyMonthlyEffects(state: State) {
    // co 12 miesięcy waloryzacja
    if (state.getMonthsElapsed() % 12 === 0 && state.getMonthsElapsed() > 0) {
      this.applyYearlyIndexation();
    }

    // zawsze przeliczaj miesięczną emeryturę
    this.calculateMonthlyRetirementIncome(state);

    // zawsze przeliczaj wskaźnik zastąpienia
    this.calculateReplacementRate(state);

    // sprawdzanie czy emerytura się zaczyna
    if (!this.isAlreadyRetired && state.age >= this.retirementAge) {
      this.isAlreadyRetired = true;
    }

    // jeżeli już na emeryturze → dodajemy co miesiąc świadczenie do salda
    if (this.isAlreadyRetired) {
      state.character.balance += this.monthlyRetirementIncome;

      // Opcjonalnie: coroczna waloryzacja już wypłacanej emerytury
      if (state.getMonthsElapsed() % 12 === 0 && state.getMonthsElapsed() > 0) {
        this.monthlyRetirementIncome *= 1 + this.yearlyIndexation * 0.8; // 80% waloryzacji
      }
    }
  }

  // Pomocnicza metoda do sprawdzenia przewidywanej emerytury (dla UI)
  getEstimatedPension(): number {
    return this.monthlyRetirementIncome;
  }

  // Pomocnicza metoda do sprawdzenia wskaźnika zastąpienia (dla UI)
  getReplacementRate(): number {
    return this.replacementRate;
  }

  // Pomocnicza metoda do sprawdzenia wskaźnika zastąpienia w procentach (dla UI)
  getReplacementRatePercentage(): string {
    return `${(this.replacementRate * 100).toFixed(1)}%`;
  }
}
