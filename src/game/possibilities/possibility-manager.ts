import {State} from "../state";
import type {Possibility} from "./possibility";
import {CatInNeed} from "./list/cat-in-need";
import {GymMembershipEvent} from "./list/gym-membership-event";
import {NewHobby} from "./list/new-hobby";
import {ChooseDiet} from "./list/choose-diet";
import {WorkWaiter} from "./list/work-waiter";
import {WorkEngineer} from "./list/work-engineer";
import {University} from "./list/university";
import {GetNewCar} from "./list/get-new-car.ts";

export class PossibilityManager {
  private possibilities: Possibility[]

  constructor() {
    this.possibilities = [
      new CatInNeed(),
      new GymMembershipEvent(),
      new NewHobby(),
      new ChooseDiet(),
      new WorkWaiter(),
      new WorkEngineer(),
      new University(),
        new GetNewCar(),
    ]
  }

  getRandom(state: State): Possibility[] {
    const filteredPossibilities = this.possibilities.filter((possibility) => possibility.canActivate(state));

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