import type { Event } from "../event";
import type { State } from "../../state";
import type { Item } from "../../items";
import { VegetarianDiet } from "../../items/list/diets/vegetarian-diet";

export class VegateblesGetMoreExpensive implements Event {
  private readonly priceRising: number;
  private vegetaraianDiet!: Item;
  constructor() {
    this.priceRising = 50;
  }
  canActivate = (state: State) => {
    const diet = state.items.find(
      (item: Item) => item instanceof VegetarianDiet,
    );
    if (diet) {
      this.vegetaraianDiet = diet;
      return true;
    }
    return false;
  };
  applyEffects = (state: State) => {
    // We have to add new instance to trigger monthly expenses recalculation
    state.removeItem(this.vegetaraianDiet);
    const moreExpensiveDiet = new VegetarianDiet();
    moreExpensiveDiet.monthlyCost += this.priceRising;
    state.addItem(moreExpensiveDiet);
  };
  getTitle = () => {
    return "Prices of vegetables have risen";
  };
  getDescription = () => {
    return `Due to global warming and poor harvests, the prices of vegetables have risen significantly.
        As a result, your vegetarian diet has become more expensive, increasing your monthly expenses by $${this.priceRising}.
    `;
  };
  getWeight = (_: State) => {
    return 1;
  };
}
