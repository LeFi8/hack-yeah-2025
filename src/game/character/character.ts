import { RangeCounter } from "../utils";

export class CharacterCondition {
  balance = 0;
  monthlyExpenses = new RangeCounter(0, 0, null);

  physicalHealth = new RangeCounter(0, 0, 100);
  happiness = new RangeCounter(0, 0, 100);

  applyInflation() {
    const currentExpenses = this.monthlyExpenses.get();
    const inflationIncrease = Math.floor(currentExpenses * 0.03);
    this.monthlyExpenses.add(inflationIncrease);
  }

  clone(): CharacterCondition {
    const clone = new CharacterCondition();
    clone.balance = this.balance;
    clone.monthlyExpenses = new RangeCounter(
      this.monthlyExpenses.get(),
      0,
      null,
    );
    clone.physicalHealth = new RangeCounter(this.physicalHealth.get(), 0, 100);
    clone.happiness = new RangeCounter(this.happiness.get(), 0, 100);
    return clone;
  }
}
