import {State} from "../../state";
import type {Possibility} from "../possibility";
import {VegetarianDiet} from "../../items/list/diets/vegetarian-diet";
import {FastFoodDiet} from "../../items/list/diets/fast-food-diet";
import {Diet} from "../../items/list/diets/diet";

export class ChooseDiet implements Possibility {
    title = "Decide what will you eat every day";
    getOptions(_state: State) {
      return [
        {
          title: 'Vegetarian diet',
          applyEffects: (state: State) => {
            state.addItem(new VegetarianDiet())
          }
        },
        {
          title: 'Fast food diet',
          applyEffects: (state: State) => {
            state.addItem(new FastFoodDiet())
          }
        },
        {
          title: 'Normal diet',
          applyEffects: (_: State) => {
          }
        }
      ]
    }
    canActivate = (state: State) => {
        return !state.items.some(i => i instanceof Diet)
    };
    getWeight = (state: State) => {
        if (state.focus.health) {
            return 2
        }
        return 1
    }
}