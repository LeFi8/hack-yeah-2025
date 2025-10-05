import { Possibility } from "../possibility";
import { VegetarianDiet } from "../../items/list/diets/vegetarian-diet";
import { FastFoodDiet } from "../../items/list/diets/fast-food-diet";
import { Diet } from "../../items/list/diets/diet";

export class ChooseDiet extends Possibility {
  title = "Decide what will you eat every day";
  getOptions() {
    return [
      {
        title: "Vegetarian diet",
        applyEffects: () => {
          this.state.addItem(new VegetarianDiet());
        },
      },
      {
        title: "Fast food diet",
        applyEffects: () => {
          this.state.addItem(new FastFoodDiet());
        },
      },
      {
        title: "Normal diet",
        applyEffects: () => {},
      },
    ];
  }
  canActivate(){
    return !this.state.items.some((i) => i instanceof Diet);
  };
  getWeight(){
    if (this.state.focus.health) {
      return 2;
    }
    return 1;
  };
}
