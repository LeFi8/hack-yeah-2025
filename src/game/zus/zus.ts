import type { State } from "../state";

export class ZUS {
  isAlreadyRetired: boolean = false;
  alreadyAccummulated: number = 0; // suma składek z pracy
  predictedPension: number = 0;

  retirementAge: number = 65; // tylko mężczyźni
  yearlyIndexation: number = 0.025; // np. 2.5% rocznie

  // dodawanie składki co miesiąc (wywoływane z JobContract)
  contribute(amount: number) {
    this.alreadyAccummulated += amount;
  }

  // waloryzacja raz w roku
  applyYearlyIndexation() {
    this.alreadyAccummulated *= 1 + this.yearlyIndexation;
  }

  // obliczenie emerytury po osiągnięciu wieku
  calculatePension(age: number) {
    if (age >= this.retirementAge && !this.isAlreadyRetired) {
      this.isAlreadyRetired = true;

      // uproszczenie: zakładamy, że przeciętny mężczyzna
      // po przejściu na emeryturę żyje jeszcze 20 lat
      const expectedLifeYears = 20;
      const months = expectedLifeYears * 12;

      this.predictedPension = this.alreadyAccummulated / months;
    }
    return this.predictedPension;
  }

  applyMonthlyEffects(state: State) {
    // co 12 miesięcy waloryzacja
    if (state.getMonthsElapsed() % 12 === 0 && state.getMonthsElapsed() > 0) {
      this.applyYearlyIndexation();
    }

    // sprawdzanie czy emerytura się zaczyna
    if (!this.isAlreadyRetired && state.age >= this.retirementAge) {
      this.calculatePension(state.age);
    }

    // jeżeli już emerytura → dodajemy co miesiąc świadczenie
    if (this.isAlreadyRetired) {
      state.character.balance += this.predictedPension;
    }
  }
}
