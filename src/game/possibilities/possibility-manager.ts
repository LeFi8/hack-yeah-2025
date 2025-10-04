import {State} from "../state";
import type {Possibility} from "./possibility";
import {purchaseHouse} from "./list/purchase-house";
import {purchaseCar} from "./list/purchase-car";
import {goForHolidays} from "./list/holidays";

export class PossibilityManager {
  private possibilities: Possibility[]

  constructor() {
    this.possibilities = [
      purchaseHouse,
      purchaseCar,
      goForHolidays,
    ]
  }

  getRandom(state: State): Possibility[] {
    const filteredPossibilities = this.possibilities.filter((possibility) => possibility.canActivate());

    if (filteredPossibilities.length === 0) {
      return [];
    }

    const weightedPossibilities = filteredPossibilities.map(possibility => ({
      possibility,
      weight: possibility.getWeight(state)
    })).filter(item => item.weight > 0);

    if (weightedPossibilities.length === 0) {
      return [];
    }

    const selectedPossibilities: Possibility[] = [];
    const availablePossibilities = [...weightedPossibilities];

    for (let i = 0; i < 3 && availablePossibilities.length > 0; i++) {
      const totalWeight = availablePossibilities.reduce((sum, item) => sum + item.weight, 0);

      if (totalWeight === 0) break;

      const randomValue = Math.random() * totalWeight;

      let currentWeight = 0;
      let selectedIndex = 0;

      for (let j = 0; j < availablePossibilities.length; j++) {
        currentWeight += availablePossibilities[j].weight;
        if (randomValue <= currentWeight) {
          selectedIndex = j;
          break;
        }
      }

      const selected = availablePossibilities.splice(selectedIndex, 1)[0];
      selectedPossibilities.push(selected.possibility);
    }

    return selectedPossibilities;
  }

}