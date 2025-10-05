import { Event } from "../event";
import type { Item } from "../../items";
import { VegetarianDiet } from "../../items/list/diets/vegetarian-diet";

export class VegateblesGetMoreExpensive extends Event {
  private readonly priceRising = 50;
  private vegetaraianDiet!: Item;

  canActivate() {
    const diet = this.state.items.find(
      (item: Item) => item instanceof VegetarianDiet,
    );
    if (diet) {
      this.vegetaraianDiet = diet;
      return true;
    }
    return false;
  }
  applyEffects() {
    // We have to add new instance to trigger monthly expenses recalculation
    this.state.removeItem(this.vegetaraianDiet);
    const moreExpensiveDiet = new VegetarianDiet();
    moreExpensiveDiet.monthlyCost += this.priceRising;
    this.state.addItem(moreExpensiveDiet);
  }
  getTitle() {
    return "Prices of vegetables have risen";
  }
  getDescription() {
    return `Due to global warming and poor harvests, the prices of vegetables have risen significantly.
        As a result, your vegetarian diet has become more expensive, increasing your monthly expenses by $${this.priceRising}.
    `;
  }
  getWeight() {
    return 1;
  }
}
